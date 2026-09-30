from __future__ import annotations

from typing import Any

import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

from app.data.sample_data import FEATURE_COLUMNS, TARGET_CLASS_COLUMN, load_dataset
from app.services.preprocessing import feature_vector
from app.utils.metrics import classification_metrics
from app.utils.model_cache import memory

TEST_SIZE = 0.25
RANDOM_STATE = 42


@memory.cache
def _trained_models(dataset_stamp: int) -> dict[str, Any]:
    df = load_dataset()
    X = df[FEATURE_COLUMNS].to_numpy(dtype=float)
    y = df[TARGET_CLASS_COLUMN].to_numpy()

    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE,
        stratify=y,
    )

    tree = DecisionTreeClassifier(max_depth=4, random_state=RANDOM_STATE)
    knn = KNeighborsClassifier(n_neighbors=7)
    tree.fit(X_train, y_train)
    knn.fit(X_train, y_train)

    return {
        "tree": tree,
        "knn": knn,
        "tree_metrics": classification_metrics(y_test, tree.predict(X_test)),
        "knn_metrics": classification_metrics(y_test, knn.predict(X_test)),
        "classes": sorted(df[TARGET_CLASS_COLUMN].unique().tolist()),
    }


def predict(profile) -> dict[str, Any]:
    from app.data.sample_data import DATASET_PATH
    models = _trained_models(DATASET_PATH.stat().st_mtime_ns)
    X = feature_vector(profile)
    tree_prediction = str(models["tree"].predict(X)[0])
    knn_prediction = str(models["knn"].predict(X)[0])
    return {
        "decision_tree": {
            "prediction": tree_prediction,
            "metrics": models["tree_metrics"],
        },
        "k_nearest_neighbors": {
            "prediction": knn_prediction,
            "metrics": models["knn_metrics"],
        },
        "prototype_category": tree_prediction,
        "available_categories": models["classes"],
    }


def evaluate_models() -> dict[str, Any]:
    from app.data.sample_data import DATASET_PATH
    models = _trained_models(DATASET_PATH.stat().st_mtime_ns)
    return {
        "decision_tree": models["tree_metrics"],
        "k_nearest_neighbors": models["knn_metrics"],
        "evaluation": {
            "test_size": TEST_SIZE,
            "random_state": RANDOM_STATE,
            "target": "prototype lifestyle-profile category",
        },
    }
