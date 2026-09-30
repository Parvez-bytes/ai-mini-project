from __future__ import annotations

from typing import Any

RULES = [
    {"name": "HighBMI", "requires": ["HighBMI"], "conclusion": "WeightRisk"},
    {"name": "ExerciseRule", "requires": ["HighBMI", "LowPhysicalActivity"], "conclusion": "ExerciseRecommended"},
    {"name": "PreventiveActionRule", "requires": ["WeightRisk", "ExerciseRecommended"], "conclusion": "PreventiveActionRequired"},
]


def forward_chaining(initial_facts: list[str]) -> dict[str, Any]:
    facts = set(initial_facts)
    fired_rules: list[str] = []
    changed = True
    while changed:
        changed = False
        for rule in RULES:
            if rule["name"] in fired_rules:
                continue
            if all(fact in facts for fact in rule["requires"]):
                facts.add(rule["conclusion"])
                fired_rules.append(rule["name"])
                changed = True
    final_recommendation = (
        "Consider a preventive lifestyle action plan."
        if "PreventiveActionRequired" in facts
        else "Continue reviewing the entered lifestyle profile."
    )
    return {
        "initial_facts": initial_facts,
        "rules_fired": fired_rules,
        "derived_facts": sorted(facts.difference(initial_facts)),
        "final_recommendation": final_recommendation,
    }


def backward_chaining(goal: str, initial_facts: list[str]) -> dict[str, Any]:
    facts = set(initial_facts)
    required_facts: set[str] = set()
    chain: list[dict[str, Any]] = []
    proven: set[str] = set()
    visiting: set[str] = set()

    def prove(target: str) -> bool:
        if target in facts:
            proven.add(target)
            chain.append({"goal": target, "source": "initial_fact", "proven": True})
            return True
        if target in visiting:
            return False
        visiting.add(target)
        matching = [r for r in RULES if r["conclusion"] == target]
        for rule in matching:
            required_facts.update(rule["requires"])
            if all(prove(req) for req in rule["requires"]):
                proven.add(target)
                chain.append({"goal": target, "source": rule["name"], "requires": rule["requires"], "proven": True})
                visiting.remove(target)
                return True
        visiting.discard(target)
        chain.append({"goal": target, "proven": False})
        return False

    was_proven = prove(goal)
    return {
        "goal": goal,
        "reasoning_chain": chain,
        "required_facts": sorted(required_facts),
        "goal_proven": was_proven,
    }


def reasoning_from_profile(profile) -> dict[str, Any]:
    data = profile.model_dump() if hasattr(profile, "model_dump") else dict(profile)
    facts = []
    bmi = float(data.get("bmi") or 0)
    if not bmi:
        height_m = float(data["height"]) / 100
        bmi = float(data["weight"]) / (height_m**2)
    if bmi >= 25:
        facts.append("HighBMI")
    if float(data["physical_activity"]) < 3:
        facts.append("LowPhysicalActivity")
    return forward_chaining(facts)
