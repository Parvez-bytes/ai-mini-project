from fastapi import APIRouter

from app.models.schemas import RecommendationRequest
from app.services.explainability import explain_profile
from app.services.recommendation_engine import generate_recommendations, analyze_profile
from app.services.regression import predict as regress
from app.services.classification import predict as classify

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])


@router.post("/generate")
def generate(request: RecommendationRequest):
    recommendations = generate_recommendations(request.profile, request.goal)
    classification = classify(request.profile)
    regression = regress(request.profile)
    reasoning = explain_profile(request.profile, classification["prototype_category"], regression["predicted_wellness_score"])
    return {
        "success": True,
        "data": {
            "goal": request.goal,
            "recommendations": recommendations,
            "reasoning": reasoning,
        },
    }
