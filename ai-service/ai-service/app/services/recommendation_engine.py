from __future__ import annotations

from typing import Any

from app.services.classification import predict as classify
from app.services.clustering import predict as cluster
from app.services.explainability import explain_profile
from app.services.preprocessing import clean_profile, project_wellness_score
from app.services.reasoning import backward_chaining, forward_chaining, reasoning_from_profile
from app.services.regression import predict as regress
from app.services.search_algorithms import compare_search_algorithms

GOALS = {
    "improve sleep": "sleep",
    "increase physical activity": "physical_activity",
    "improve hydration": "hydration",
    "improve daily routine": "routine",
    "general preventive wellness": "general",
}


def _priority(level: str) -> str:
    return level if level in {"low", "medium", "high"} else "medium"


def generate_recommendations(profile, goal: str | None = None) -> list[dict[str, str]]:
    data = profile.model_dump() if hasattr(profile, "model_dump") else dict(profile)
    goal_key = GOALS.get((goal or "General Preventive Wellness").strip().lower(), "general")
    recommendations: list[dict[str, str]] = []

    def add(category: str, title: str, reason: str, action: str, priority: str = "medium"):
        recommendations.append({
            "category": category,
            "title": title,
            "reason": reason,
            "action": action,
            "priority": _priority(priority),
            "source": "rule",
        })

    if float(data["sleep_hours"]) < 7:
        add("sleep", "Strengthen Sleep Consistency", "Sleep duration is below the project's preferred range.", "Try to maintain a consistent sleep and wake schedule that fits your routine.", "high")
    if float(data["physical_activity"]) < 3:
        add("physical_activity", "Build Regular Activity", "Physical activity is below the prototype's configured baseline.", "Gradually add manageable movement sessions according to your comfort and routine.", "high")
    if float(data["water_intake"]) < 2:
        add("hydration", "Maintain Regular Hydration", "Water intake is below the configured project threshold.", "Consider spreading regular water intake across the day.", "medium")
    if float(data["screen_time"]) > 6:
        add("screen_time", "Add Screen Breaks", "Screen time is above the project's configured threshold.", "Add short breaks during longer device-use periods.", "medium")
    if goal_key == "sleep":
        add("routine", "Create a Wind-Down Routine", "The selected goal is Improve Sleep.", "Reserve a consistent pre-sleep wind-down period and reduce stimulating activities near bedtime.", "medium")
    elif goal_key == "physical_activity":
        add("physical_activity", "Schedule Activity Blocks", "The selected goal is Increase Physical Activity.", "Place short activity blocks into the week and increase gradually.", "medium")
    elif goal_key == "hydration":
        add("hydration", "Set Hydration Reminders", "The selected goal is Improve Hydration.", "Use routine cues such as meals or study breaks to remember regular water intake.", "medium")
    elif goal_key == "routine":
        add("routine", "Stabilize Daily Routine", "The selected goal is Improve Daily Routine.", "Choose consistent daily anchors for sleep, activity, meals, and screen breaks.", "medium")

    if not recommendations:
        add("routine", "Maintain Your Current Routine", "The prototype did not identify a configured lifestyle flag requiring a focused suggestion.", "Continue observing your routine and reassess periodically using the educational prototype.", "low")

    return recommendations[:6]


def analyze_profile(profile, goal: str | None = None) -> dict[str, Any]:
    cleaned = clean_profile(profile)
    classification = classify(profile)
    clustering = cluster(profile)
    regression = regress(profile)
    recommendations = generate_recommendations(profile, goal)
    rule_reasoning = reasoning_from_profile(profile)
    forward_demo = rule_reasoning
    backward_demo = backward_chaining("PreventiveActionRequired", rule_reasoning["initial_facts"])
    reasoning = explain_profile(profile, classification["prototype_category"], regression["predicted_wellness_score"])
    search = compare_search_algorithms("Health Assessment", "Tracking")

    return {
        "bmi": cleaned["bmi"],
        "profile_category": classification["prototype_category"],
        "profile_group": clustering["profile_group"],
        "predicted_wellness_score": regression["predicted_wellness_score"],
        "recommendations": recommendations,
        "reasoning": reasoning,
        "classification": classification,
        "clustering": clustering,
        "regression": regression,
        "search_workflow": search,
        "rule_reasoning": {
            "forward_chaining": forward_demo,
            "backward_chaining": backward_demo,
        },
        "project_score_reference": project_wellness_score(profile),
    }
