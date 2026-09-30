from __future__ import annotations

from typing import Any

import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

from app.data.sample_data import FEATURE_COLUMNS, TARGET_SCORE_COLUMN, load_dataset
from app.services.preprocessing import feature_vector
from app.utils.metrics import regression_metrics
from app.utils.model_cache import memory

TEST_SIZE = 0.25
RANDOM_STATE = 42


@memory.cache
def _trained_model(dataset_stamp: int) -> dict[str, Any]:
    df = load_dataset()
    X = df[FEATURE_COLUMNS].to_numpy(dtype=float)
    y = df[TARGET_SCORE_COLUMN].to_numpy(dtype=float)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE
    )

    model = LinearRegression()
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    return {
        "model": model,
        "metrics": regression_metrics(y_test, predictions),
    }


def predict(profile) -> dict[str, Any]:
    from app.data.sample_data import DATASET_PATH
    bundle = _trained_model(DATASET_PATH.stat().st_mtime_ns)
    prediction = float(bundle["model"].predict(feature_vector(profile))[0])
    prediction = round(max(0.0, min(100.0, prediction)), 2)
    return {
        "predicted_wellness_score": prediction,
        "metrics": bundle["metrics"],
        "target_description": "project-defined prototype wellness indicator, not a medical prediction",
    }
