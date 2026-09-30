from fastapi import APIRouter

from app.models.schemas import AssistantRequest, NLPRequest
from app.services.nlp import analyze_text

router = APIRouter(tags=["Assistant"])


@router.post("/nlp/analyze")
def analyze_nlp(request: NLPRequest):
    return {"success": True, "data": analyze_text(request.text)}


@router.post("/assistant")
def assistant(request: AssistantRequest):
    q = request.question.strip().lower()
    profile = request.profile
    analysis = request.analysis or {}

    if "why" in q and "recommend" in q:
        sleep = profile.sleep_hours
        activity = profile.physical_activity
        water = profile.water_intake
        factors = []
        if sleep < 7:
            factors.append("sleep duration below the project's configured range")
        if activity < 3:
            factors.append("relatively low physical activity")
        if water < 2:
            factors.append("hydration below the configured threshold")
        factor_text = ", ".join(factors) if factors else "the other configured lifestyle rules"
        answer = f"Based on your entered profile, {factor_text} contributed to this recommendation in the prototype rules."
    elif "profile group" in q:
        group = analysis.get("profile_group", "the current profile group")
        answer = f"The current model-based grouping is {group}. It is a K-Means profile pattern for this educational prototype, not a disease group."
    elif "hydration" in q:
        answer = "Hydration is recommended when your entered water intake is below the prototype's configured threshold."
    elif "simulation" in q or "changed" in q:
        answer = "The simulator compares two sets of entered values and reports model-based changes in BMI, profile category, profile group, prototype wellness indicator, and recommendations."
    elif "score" in q or "wellness" in q:
        score = analysis.get("predicted_wellness_score", "the current value")
        answer = f"The prototype wellness indicator is produced by the educational regression model from BMI, sleep, physical activity, water intake, and screen time. The current model output is {score}."
    else:
        answer = "I can explain your profile group, recommendation reasons, hydration rule, simulation changes, or prototype wellness indicator using the provided profile and model results."

    return {"success": True, "data": {"answer": answer, "source": "context-aware-rule"}}
