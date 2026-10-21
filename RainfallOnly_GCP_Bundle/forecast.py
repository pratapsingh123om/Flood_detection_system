"""Local and Cloud Run Job inference. Only local trusted state_dict files are loaded."""
import os,json,argparse,hashlib,gzip,csv,tempfile
from pathlib import Path
import numpy as np
import torch
from model import RainCNN,geometry_hash,dense_history,forecast_step

def digest(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()

def run(bundle,seed,out,days=3,allow_long=False):
    bundle,out=Path(bundle),Path(out);out.mkdir(parents=True,exist_ok=True)
    cfg=json.loads((bundle/'Model_Config.json').read_text())
    with np.load(bundle/'Geometry.npz',allow_pickle=False) as z:
        lat,lon,flat=z['latitude'],z['longitude'],z['flat_index']
    gh=geometry_hash(lat,lon,flat)
    with np.load(seed,allow_pickle=False) as z:
        dates=z['dates'].astype('datetime64[D]');a=np.asarray(z['rain_mm'],np.float32)
        observed=z['is_observed'].astype(bool);origin=np.datetime64(str(z['forecast_origin'].item()),'D')
        lastobs=np.datetime64(str(z['last_observed_date'].item()),'D')
        if str(z['geometry_hash'].item())!=gh:raise ValueError('Seed/model geometry mismatch')
    if len(dates)!=7 or a.shape!=(7,len(flat)) or observed.shape!=(7,) or not np.all(np.diff(dates)==np.timedelta64(1,'D')):raise ValueError('Seed must contain seven consecutive sparse rainfall maps')
    if not np.isfinite(a).all() or (a<0).any():raise ValueError('Seed has missing/negative supported rainfall')
    if lastobs!=origin or origin>dates[-1] or np.any(dates[observed]>lastobs) or np.any((dates<=lastobs)&~observed) or np.any((dates>lastobs)&observed):raise ValueError('Seed observation/forecast timeline inconsistent')
    lead0=int((dates[-1]-origin)/np.timedelta64(1,'D'))
    if days<1 or days>31:raise ValueError('days must be 1..31')
    if lead0+days>7 and not allow_long:raise ValueError('Beyond day 7 is experimental. Supply new observations or explicitly allow long scenario rollout.')
    model=RainCNN(**cfg['architecture']);model.load_state_dict(torch.load(bundle/'Weights.pt',map_location='cpu',weights_only=True));model.eval()
    torch.set_num_threads(int(os.environ.get('CPU_THREADS','1')))
    rain,valid=dense_history(a,flat,(len(lat),len(lon)))
    rain=torch.from_numpy(rain[None]);valid=torch.from_numpy(valid[None])
    support=torch.zeros((1,1,len(lat),len(lon)));support.view(-1)[flat]=1
    metadata=dict(forecast_origin=str(origin),last_observed_date=str(lastobs),last_input_date=str(dates[-1]),
                  units='mm per daily interval',geometry_hash=gh,model_sha256=digest(bundle/'Weights.pt'),
                  target='station-derived CNN/QM 0.01-degree product',experimental_rollout=lead0+days>7,
                  issue='Historical replay or rainfall-only extrapolation; no weather forecast assimilation',files=[])
    for k in range(days):
        p=forecast_step(model,rain,valid,support)
        sparse=p.numpy().reshape(-1)[flat];date=dates[-1]+np.timedelta64(1,'D');lead=int((date-origin)/np.timedelta64(1,'D'))
        filename=f'Rainfall_{date}.csv.gz'
        with gzip.open(out/filename,'wt',newline='') as f:
            w=csv.writer(f);w.writerow(['forecast_origin','target_date','lead_day','cell_id','latitude','longitude','rainfall_mm'])
            for j,v in enumerate(sparse):w.writerow([str(origin),str(date),lead,int(flat[j]),round(float(lat[flat[j]//len(lon)]),6),round(float(lon[flat[j]%len(lon)]),6),round(float(v),4)])
        np.savez_compressed(out/f'Rainfall_{date}.npz',rain_mm=sparse,date=str(date),forecast_origin=str(origin),lead_day=lead,geometry_hash=gh,units='mm')
        metadata['files'].append(filename)
        a=np.concatenate([a[1:],sparse[None]],axis=0);dates=np.concatenate([dates[1:],np.asarray([date])]);observed=np.r_[observed[1:],False]
        rain=torch.cat([rain[:,1:],p],1);valid=torch.cat([valid[:,1:],support],1)
    np.savez_compressed(out/'Next_Seed.npz',dates=dates,rain_mm=a,is_observed=observed,forecast_origin=str(origin),last_observed_date=str(lastobs),geometry_hash=gh)
    (out/'Forecast_Metadata.json').write_text(json.dumps(metadata,indent=2))
    return metadata

def cloud_job():
    from google.cloud import storage
    from google.api_core.exceptions import PreconditionFailed
    client=storage.Client();bucket=client.bucket(os.environ['BUCKET']);pointer=bucket.blob('state/latest.json')
    pointer.reload();generation=int(pointer.generation)
    state=json.loads(pointer.download_as_bytes(if_generation_match=generation))
    days=int(os.environ.get('DAYS','1'));long=os.environ.get('ALLOW_LONG_SCENARIO','false').lower()=='true'
    # This source generation pins a job invocation; concurrency cannot silently advance it twice.
    expected=os.environ.get('EXPECTED_SEED_OBJECT')
    if expected and expected!=state['seed_object']:raise ValueError('State changed since this invocation was prepared')
    runid=hashlib.sha256(json.dumps([state,days,long,digest('/app/bundle/Weights.pt')],sort_keys=True).encode()).hexdigest()[:20]
    with tempfile.TemporaryDirectory() as tmp:
        tmp=Path(tmp);bucket.blob(state['seed_object']).download_to_filename(tmp/'seed.npz',if_generation_match=state['seed_generation'])
        meta=run('/app/bundle',tmp/'seed.npz',tmp/'out',days,long)
        seedgen=None
        for p in sorted((tmp/'out').iterdir()):
            obj=bucket.blob(f'runs/{runid}/{p.name}')
            try:obj.upload_from_filename(p,if_generation_match=0)
            except PreconditionFailed:obj.reload() # deterministic run path, existing completed object
            if p.name=='Next_Seed.npz':seedgen=int(obj.generation)
        new=dict(seed_object=f'runs/{runid}/Next_Seed.npz',seed_generation=seedgen,run_prefix=f'runs/{runid}/',metadata=meta)
        # Files are durable before atomic state-pointer publication; stale jobs lose the CAS.
        pointer.upload_from_string(json.dumps(new),content_type='application/json',if_generation_match=generation)
    print(json.dumps(dict(status='complete',run=runid,dates=meta['files'])))

if __name__=='__main__':
    if os.environ.get('BUCKET'):cloud_job()
    else:
        p=argparse.ArgumentParser();p.add_argument('--bundle',default='bundle');p.add_argument('--seed',default='bundle/Historical_Seed.npz');p.add_argument('--out',default='forecast');p.add_argument('--days',type=int,default=3);p.add_argument('--allow-experimental-long-rollout',action='store_true');a=p.parse_args()
        print(json.dumps(run(a.bundle,a.seed,a.out,a.days,a.allow_experimental_long_rollout),indent=2))
