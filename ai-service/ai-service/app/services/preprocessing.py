from __future__ import annotations

from typing import Iterable

import numpy as np

from app.models.schemas import HealthProfileInput

FEATURE_NAMES = [
    "bmi",
    "sleep_hours",
    "physical_activity",
    "water_intake",
    "screen_time",
]


def calculate_bmi(height_cm: float, weight_kg: float) -> float:
    """Calculate BMI as a basic screening metric, not a diagnosis."""
    height_m = height_cm / 100.0
    if height_m <= 0:
        raise ValueError("Height must be greater than zero")
    return round(weight_kg / (height_m**2), 2)


def bmi_component(bmi: float) -> float:
    """Map BMI to a project-defined 0-100 contribution for synthetic modeling."""
    if 18.5 <= bmi <= 24.9:
        return 100.0
    if bmi < 18.5:
        return max(0.0, 100.0 - (18.5 - bmi) * 12.0)
    return max(0.0, 100.0 - (bmi - 24.9) * 7.0)


def lifestyle_score_components(profile: HealthProfileInput | dict) -> dict[str, float]:
    """Create transparent project-defined component scores from 0 to 100."""
    data = profile.model_dump() if isinstance(profile, HealthProfileInput) else profile
    bmi = calculate_bmi(float(data["height"]), float(data["weight"]))

    sleep = max(0.0, min(100.0, 100.0 - abs(float(data["sleep_hours"]) - 8.0) * 20.0))
    activity = max(0.0, min(100.0, float(data["physical_activity"]) / 6.0 * 100.0))
    hydration = max(0.0, min(100.0, float(data["water_intake"]) / 3.0 * 100.0))
    screen = max(0.0, min(100.0, 100.0 - max(0.0, float(data["screen_time"]) - 2.0) * 12.5))
    bmi_score = bmi_component(bmi)

    smoking_penalty = 10.0 if bool(data.get("smoking", False)) else 0.0
    alcohol_penalty = 4.0 if bool(data.get("alcohol", False)) else 0.0

    return {
        "bmi": bmi,
        "bmi_component": bmi_score,
        "sleep_component": sleep,
        "activity_component": activity,
        "hydration_component": hydration,
        "screen_component": screen,
        "habit_penalty": smoking_penalty + alcohol_penalty,
    }


def project_wellness_score(profile: HealthProfileInput | dict) -> float:
    """Calculate the project's synthetic wellness indicator used to create demo labels."""
    c = lifestyle_score_components(profile)
    score = (
        0.10 * c["bmi_component"]
        + 0.32 * c["sleep_component"]
        + 0.25 * c["activity_component"]
        + 0.20 * c["hydration_component"]
        + 0.13 * c["screen_component"]
        - c["habit_penalty"]
    )
    return round(max(0.0, min(100.0, score)), 2)


def feature_vector(profile: HealthProfileInput | dict) -> np.ndarray:
    data = profile.model_dump() if isinstance(profile, HealthProfileInput) else profile
    bmi = calculate_bmi(float(data["height"]), float(data["weight"]))
    return np.array(
        [[
            bmi,
            float(data["sleep_hours"]),
            float(data["physical_activity"]),
            float(data["water_intake"]),
            float(data["screen_time"]),
        ]],
        dtype=float,
    )


def clean_profile(profile: HealthProfileInput | dict) -> dict:
    """Return normalized JSON-friendly values for downstream services."""
    data = profile.model_dump() if isinstance(profile, HealthProfileInput) else dict(profile)
    data["height"] = round(float(data["height"]), 2)
    data["weight"] = round(float(data["weight"]), 2)
    data["sleep_hours"] = round(float(data["sleep_hours"]), 2)
    data["physical_activity"] = round(float(data["physical_activity"]), 2)
    data["water_intake"] = round(float(data["water_intake"]), 2)
    data["screen_time"] = round(float(data["screen_time"]), 2)
    data["bmi"] = calculate_bmi(data["height"], data["weight"])
    return data
