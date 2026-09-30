from __future__ import annotations


def explain_profile(profile, category: str, predicted_score: float) -> list[str]:
    data = profile.model_dump() if hasattr(profile, "model_dump") else dict(profile)
    reasons = []
    sleep = float(data["sleep_hours"])
    activity = float(data["physical_activity"])
    water = float(data["water_intake"])
    screen = float(data["screen_time"])

    if sleep < 7:
        reasons.append("Sleep duration is below the project's preferred range.")
    elif sleep >= 7:
        reasons.append("Sleep duration is within the project's configured preferred range.")
    if activity < 3:
        reasons.append("Physical activity level is relatively low for this prototype's configured range.")
    else:
        reasons.append("Physical activity level meets the prototype's configured baseline.")
    if water < 2:
        reasons.append("Hydration level is below the configured project threshold.")
    else:
        reasons.append("Hydration level meets the configured project threshold.")
    if screen > 6:
        reasons.append("Screen time is above the configured project threshold.")
    reasons.append(
        f"The current model-based classification is {category}, with a predicted prototype wellness indicator of {predicted_score:.1f}."
    )
    return reasons
