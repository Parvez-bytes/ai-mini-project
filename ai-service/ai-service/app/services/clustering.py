from __future__ import annotations

from typing import Any

import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

from app.data.sample_data import FEATURE_COLUMNS, load_dataset
from app.services.preprocessing import feature_vector
from app.utils.model_cache import memory

RANDOM_STATE = 42
DEFAULT_MAX_K = 6


def _select_elbow_k(ks: list[int], inertias: list[float]) -> int:
    if len(ks) <= 2:
        return ks[-1]
    points = np.column_stack([ks, inertias]).astype(float)
    start, end = points[0], points[-1]
    line = end - start
    norm = np.linalg.norm(line)
    if norm == 0:
        return ks[0]
    distances = []
    for point in points:
        delta = point - start
        distances.append(abs(line[0] * delta[1] - line[1] * delta[0]) / norm)
    return ks[int(np.argmax(distances))]


@memory.cache
def _trained_cluster(dataset_stamp: int) -> dict[str, Any]:
    df = load_dataset()
    X = df[FEATURE_COLUMNS].to_numpy(dtype=float)
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    max_k = min(DEFAULT_MAX_K, len(X_scaled))
    ks = list(range(1, max_k + 1))
    inertias = []
    for k in ks:
        model = KMeans(n_clusters=k, random_state=RANDOM_STATE, n_init=10)
        model.fit(X_scaled)
        inertias.append(round(float(model.inertia_), 6))

    selected_k = max(1, min(_select_elbow_k(ks, inertias), len(X_scaled)))
    final_model = KMeans(n_clusters=selected_k, random_state=RANDOM_STATE, n_init=10)
    final_labels = final_model.fit_predict(X_scaled)
    centers = scaler.inverse_transform(final_model.cluster_centers_)

    # Give neutral, stable names by ordering centers by a project-defined lifestyle proxy.
    proxy = centers[:, 1] * 4 + centers[:, 2] * 2 + centers[:, 3] * 3 - centers[:, 4]
    order = np.argsort(proxy)
    cluster_name_map = {int(cluster_id): f"Profile Group {i + 1}" for i, cluster_id in enumerate(order)}

    sizes = {cluster_name_map[int(cid)]: int((final_labels == cid).sum()) for cid in range(selected_k)}
    center_output = {}
    for cid, center in enumerate(centers):
        name = cluster_name_map[cid]
        center_output[name] = {
            feature: round(float(value), 2) for feature, value in zip(FEATURE_COLUMNS, center)
        }

    return {
        "model": final_model,
        "scaler": scaler,
        "selected_k": selected_k,
        "tested_k_values": ks,
        "inertia_values": inertias,
        "cluster_sizes": sizes,
        "cluster_centers": center_output,
        "cluster_name_map": cluster_name_map,
    }


def predict(profile) -> dict[str, Any]:
    from app.data.sample_data import DATASET_PATH
    bundle = _trained_cluster(DATASET_PATH.stat().st_mtime_ns)
    X = feature_vector(profile)
    label = int(bundle["model"].predict(bundle["scaler"].transform(X))[0])
    group = bundle["cluster_name_map"][label]
    return {
        "profile_group": group,
        "cluster_index": label,
        "selected_k": bundle["selected_k"],
        "cluster_sizes": bundle["cluster_sizes"],
        "cluster_centers": bundle["cluster_centers"],
        "elbow_method": {
            "tested_k_values": bundle["tested_k_values"],
            "inertia_values": bundle["inertia_values"],
            "selected_k": bundle["selected_k"],
        },
        "description": "K-Means lifestyle/profile pattern grouping for this educational prototype; clusters are not disease groups.",
    }
