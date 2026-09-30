from __future__ import annotations

from typing import Any

import numpy as np
from sklearn.metrics import accuracy_score, f1_score, mean_absolute_error, mean_squared_error, precision_score, r2_score, recall_score


def classification_metrics(y_true, y_pred) -> dict[str, float]:
    return {
        "accuracy": round(float(accuracy_score(y_true, y_pred)), 4),
        "precision": round(float(precision_score(y_true, y_pred, average="weighted", zero_division=0)), 4),
        "recall": round(float(recall_score(y_true, y_pred, average="weighted", zero_division=0)), 4),
        "f1_score": round(float(f1_score(y_true, y_pred, average="weighted", zero_division=0)), 4),
    }


def regression_metrics(y_true, y_pred) -> dict[str, float]:
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    return {
        "mae": round(float(mean_absolute_error(y_true, y_pred)), 4),
        "rmse": round(float(rmse), 4),
        "r2": round(float(r2_score(y_true, y_pred)), 4),
    }
