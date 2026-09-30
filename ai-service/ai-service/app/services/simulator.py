from __future__ import annotations

from typing import Any

from app.services.recommendation_engine import analyze_profile


def simulate(current_profile, simulated_profile) -> dict[str, Any]:
    current = analyze_profile(current_profile)
    simulated = analyze_profile(simulated_profile)
    current_data = current_profile.model_dump() if hasattr(current_profile, "model_dump") else dict(current_profile)
    simulated_data = simulated_profile.model_dump() if hasattr(simulated_profile, "model_dump") else dict(simulated_profile)

    changed_fields = []
    for field in sorted(current_data):
        if current_data[field] != simulated_data[field]:
            changed_fields.append({"field": field, "current": current_data[field], "simulated": simulated_data[field]})

    current_titles = {item["title"] for item in current["recommendations"]}
    simulated_titles = {item["title"] for item in simulated["recommendations"]}
    return {
        "current": {
            "bmi": current["bmi"],
            "profile_category": current["profile_category"],
            "profile_group": current["profile_group"],
            "wellness_score": current["predicted_wellness_score"],
            "recommendations": current["recommendations"],
        },
        "simulated": {
            "bmi": simulated["bmi"],
            "profile_category": simulated["profile_category"],
            "profile_group": simulated["profile_group"],
            "wellness_score": simulated["predicted_wellness_score"],
            "recommendations": simulated["recommendations"],
        },
        "comparison": {
            "changed_fields": changed_fields,
            "changed_recommendations": {
                "added": sorted(simulated_titles - current_titles),
                "removed": sorted(current_titles - simulated_titles),
            },
            "score_difference": round(simulated["predicted_wellness_score"] - current["predicted_wellness_score"], 2),
            "statement": "Under this model-based scenario, the prototype result changes between the two inputs; this does not predict real medical outcomes.",
        },
    }
