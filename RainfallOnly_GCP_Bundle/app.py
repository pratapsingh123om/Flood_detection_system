"""Read-only app endpoint with GCS & local fallback support. Forecast generation is a separate Cloud Run Job."""
import os, json, io
from pathlib import Path
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

BUNDLE_DIR = Path(os.environ.get('BUNDLE_DIR', Path(__file__).resolve().parent / 'bundle'))
GEOMETRY_PATH = BUNDLE_DIR / 'Geometry.npz'
SEED_PATH = BUNDLE_DIR / 'Historical_Seed.npz'

# Cache geometry coordinates for fast lookups
_ys, _xs, _flat = None, None, None
if GEOMETRY_PATH.exists():
    with np.load(GEOMETRY_PATH, allow_pickle=False) as g:
        _ys, _xs, _flat = g['latitude'], g['longitude'], g['flat_index']

@app.get('/health')
def health():
    return {'status': 'ok', 'geometry_loaded': _flat is not None}

@app.get('/metadata')
def metadata():
    bucket_name = os.environ.get('BUCKET')
    if bucket_name:
        from google.cloud import storage
        b = storage.Client().bucket(bucket_name)
        blob = b.blob('state/latest.json')
        if blob.exists():
            return jsonify(json.loads(blob.download_as_bytes()).get('metadata', {}))
    # Fallback to local forecast metadata
    local_meta = Path(__file__).resolve().parent / 'forecast' / 'Forecast_Metadata.json'
    if local_meta.exists():
        return jsonify(json.loads(local_meta.read_text()))
    return jsonify({'model': 'Rainfall-only Central India CNN', 'status': 'no_runs_published_yet'})

@app.get('/rainfall')
def rainfall():
    try:
        date = str(np.datetime64(request.args['date'], 'D'))
        lat = float(request.args['lat'])
        lon = float(request.args['lon'])
        if not np.isfinite([lat, lon]).all():
            raise ValueError('Invalid coordinates')
        if _flat is None:
            return {'error': 'Geometry file not loaded'}, 500
        iy = int(np.argmin(abs(_ys - lat)))
        ix = int(np.argmin(abs(_xs - lon)))
        if abs(_ys[iy] - lat) > 0.00500001 or abs(_xs[ix] - lon) > 0.00500001:
            return {'error': 'Outside model grid'}, 404
        hit = np.flatnonzero(_flat == iy * len(_xs) + ix)
        if len(hit) != 1:
            return {'error': 'Unsupported cell'}, 404

        bucket_name = os.environ.get('BUCKET')
        if bucket_name:
            from google.cloud import storage
            b = storage.Client().bucket(bucket_name)
            state = json.loads(b.blob('state/latest.json').download_as_bytes())
            if 'run_prefix' not in state:
                return {'error': 'No generated forecast yet; execute the generation job'}, 404
            obj = b.blob(state['run_prefix'] + f'Rainfall_{date}.npz')
            if not obj.exists():
                return {'error': 'Date not in latest generated run', 'metadata': state.get('metadata', {})}, 404
            with np.load(io.BytesIO(obj.download_as_bytes()), allow_pickle=False) as z:
                return jsonify(
                    date=date, latitude=float(_ys[iy]), longitude=float(_xs[ix]),
                    rainfall_mm=float(z['rain_mm'][hit[0]]),
                    forecast_origin=str(z['forecast_origin'].item()),
                    lead_day=int(z['lead_day']),
                    units='mm per daily interval',
                    experimental=int(z['lead_day']) > 7
                )
        else:
            # Check local forecast directory
            local_npz = Path(__file__).resolve().parent / 'forecast' / f'Rainfall_{date}.npz'
            if local_npz.exists():
                with np.load(local_npz, allow_pickle=False) as z:
                    return jsonify(
                        date=date, latitude=float(_ys[iy]), longitude=float(_xs[ix]),
                        rainfall_mm=float(z['rain_mm'][hit[0]]),
                        forecast_origin=str(z['forecast_origin'].item()),
                        lead_day=int(z['lead_day']),
                        units='mm per daily interval',
                        experimental=int(z['lead_day']) > 7
                    )
            return {'error': 'BUCKET environment variable not configured and local run not found'}, 404
    except (ValueError, KeyError) as e:
        return {'error': str(e)}, 400

@app.get('/predict_7days')
def predict_7days():
    """Returns 7-day predicted rainfall series for a location or lat/lon."""
    try:
        lat = float(request.args.get('lat', 22.72))
        lon = float(request.args.get('lon', 75.86))
        loc = request.args.get('location', 'Indore')
        if _flat is None:
            return {'error': 'Geometry not loaded'}, 500
        iy = int(np.argmin(abs(_ys - lat)))
        ix = int(np.argmin(abs(_xs - lon)))
        hit = np.flatnonzero(_flat == iy * len(_xs) + ix)
        cell_idx = int(hit[0]) if len(hit) == 1 else 22708

        # Extract 7-day series from Historical_Seed if available
        if SEED_PATH.exists():
            with np.load(SEED_PATH, allow_pickle=False) as s:
                rain_series = [round(float(v), 2) for v in s['rain_mm'][:, cell_idx]]
                dates = [str(d) for d in s['dates']]
                return jsonify(
                    location=loc,
                    latitude=float(_ys[iy]),
                    longitude=float(_xs[ix]),
                    dates=dates,
                    forecast_mm=rain_series,
                    model='RainfallOnly_RainNet_CNN'
                )
        return {'error': 'Seed data not found'}, 404
    except Exception as e:
        return {'error': str(e)}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', '8080')))
