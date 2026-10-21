"""Rainfall-only shared spatial CNN; output units are millimetres per daily interval."""
import hashlib
import numpy as np
import torch
from torch import nn

class RainCNN(nn.Module):
    radius = 3
    def __init__(self, width=24, history=7, scale_mm=20.0):
        super().__init__()
        self.history, self.scale_mm = history, scale_mm
        self.net = nn.Sequential(nn.Conv2d(history*2,width,3,padding=1),nn.SiLU(),
                                 nn.Conv2d(width,width,3,padding=1),nn.SiLU(),
                                 nn.Conv2d(width,1,3,padding=1))
        nn.init.normal_(self.net[-1].weight,std=.001)
        nn.init.constant_(self.net[-1].bias,.1)
    def forward(self, rain, valid):
        # Scaling only; raw-mm squared error is used in training.
        x=torch.cat((torch.where(valid>0,rain,0)/self.scale_mm,valid),1)
        return torch.relu(self.net(x))*self.scale_mm

def geometry_hash(lat,lon,flat):
    h=hashlib.sha256()
    for a,d in [(lat,'<f8'),(lon,'<f8'),(flat,'<i8')]:h.update(np.asarray(a,dtype=d).tobytes())
    return h.hexdigest()

def dense_history(sparse, flat, shape):
    a=np.asarray(sparse,dtype=np.float32)
    out=np.zeros((len(a),np.prod(shape)),np.float32)
    valid=np.zeros_like(out)
    ok=np.isfinite(a)&(a>=0)
    out[:,flat]=np.where(ok,a,0);valid[:,flat]=ok
    return out.reshape(len(a),*shape),valid.reshape(len(a),*shape)

@torch.inference_mode()
def forecast_step(model,rain,valid,support,tile=192):
    """Exact halo per one-step operator; tile size does not change the intended map."""
    _,_,h,w=rain.shape; out=torch.zeros((1,1,h,w),device=rain.device)
    r=model.radius
    for y in range(0,h,tile):
        for x in range(0,w,tile):
            if not torch.any(support[:,:,y:min(y+tile,h),x:min(x+tile,w)]):continue
            ya,xa=max(0,y-r),max(0,x-r);yb,xb=min(h,y+tile+r),min(w,x+tile+r)
            z=model(rain[:,:,ya:yb,xa:xb],valid[:,:,ya:yb,xa:xb])
            hh,ww=min(tile,h-y),min(tile,w-x)
            out[:,:,y:y+hh,x:x+ww]=z[:,:,y-ya:y-ya+hh,x-xa:x-xa+ww]
    if not torch.isfinite(out).all():raise ValueError('Nonfinite model prediction')
    out*=support
    return out
