from __future__ import annotations

from typing import Any

STATE_SCORES = {
    "Health Assessment": 50,
    "BMI Analysis": 55,
    "Sleep Analysis": 65,
    "Diet Recommendation": 72,
    "Exercise Recommendation": 80,
    "Healthy Lifestyle": 90,
}

NEIGHBORS = {
    "Health Assessment": ["BMI Analysis", "Sleep Analysis"],
    "BMI Analysis": ["Health Assessment", "Sleep Analysis", "Diet Recommendation"],
    "Sleep Analysis": ["Health Assessment", "Diet Recommendation"],
    "Diet Recommendation": ["BMI Analysis", "Exercise Recommendation"],
    "Exercise Recommendation": ["Diet Recommendation", "Healthy Lifestyle"],
    "Healthy Lifestyle": ["Exercise Recommendation"],
}


def hill_climbing(start_state: str = "Health Assessment") -> dict[str, Any]:
    if start_state not in STATE_SCORES:
        raise ValueError(f"Unknown state: {start_state}")
    path = [start_state]
    scores = [STATE_SCORES[start_state]]
    current = start_state
    while True:
        candidates = [s for s in NEIGHBORS[current] if STATE_SCORES[s] > STATE_SCORES[current]]
        if not candidates:
            break
        next_state = max(candidates, key=STATE_SCORES.get)
        current = next_state
        path.append(current)
        scores.append(STATE_SCORES[current])
    return {
        "algorithm": "Hill Climbing",
        "starting_state": start_state,
        "final_state": current,
        "path": path,
        "score_at_each_step": scores,
        "steps": len(path) - 1,
        "description": "A local-search demonstration that moves to a neighboring state with a higher project-defined educational score.",
    }
