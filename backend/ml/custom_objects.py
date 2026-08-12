import numpy as np

def moderated_asymmetric_loss(y_true, y_pred):
    """
    Custom loss function from the tuned asymmetric hybrid pipeline.
    Penalizes underpredicting rainfall > 25mm.
    """
    residual = y_true - y_pred
    asym_weight = np.where((y_true > 25.0) & (residual > 0), 1.8, 1.0)
    return -asym_weight * residual, asym_weight

def asymmetric_heavy_rain_loss(y_true, y_pred):
    """
    Custom loss function from the asymmetric hybrid pipeline.
    Penalizes under-predicting rainfall > 20mm.
    """
    residual = y_true - y_pred
    grad = np.where((y_true > 20.0) & (residual > 0), -4.0 * residual, -1.0 * residual)
    hess = np.where((y_true > 20.0) & (residual > 0), 4.0, 1.0)
    return grad, hess
