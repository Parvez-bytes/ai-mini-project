from fastapi import APIRouter, HTTPException

from app.models.schemas import HealthProfileInput
from app.services.recommendation_engine import analyze_profile
from app.services.search_algorithms import compare_search_algorithms
from app.services.local_search import hill_climbing
from app.services.reasoning import backward_chaining, forward_chaining

router = APIRouter(prefix="/analysis", tags=["Analysis"])


@router.post("")
def create_analysis(profile: HealthProfileInput):
    return {"success": True, "data": analyze_profile(profile)}


@router.post("/algorithms")
def algorithms_demo(profile: HealthProfileInput):
    analysis = analyze_profile(profile)
    rule_facts = analysis["rule_reasoning"]["forward_chaining"]["initial_facts"]
    return {
        "success": True,
        "data": {
            "bfs": compare_search_algorithms("Health Assessment", "Tracking")["bfs"],
            "dfs": compare_search_algorithms("Health Assessment", "Tracking")["dfs"],
            "greedy_best_first": compare_search_algorithms("Health Assessment", "Tracking")["greedy_best_first"],
            "a_star": compare_search_algorithms("Health Assessment", "Tracking")["a_star"],
            "hill_climbing": hill_climbing(),
            "forward_chaining": forward_chaining(rule_facts),
            "backward_chaining": backward_chaining("PreventiveActionRequired", rule_facts),
            "classification": analysis["classification"],
            "clustering": analysis["clustering"],
            "regression": analysis["regression"],
        },
    }
