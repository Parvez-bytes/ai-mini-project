from fastapi import APIRouter

from app.models.schemas import SimulatorRequest
from app.services.simulator import simulate

router = APIRouter(prefix="/simulator", tags=["Simulator"])


@router.post("")
def create_simulation(request: SimulatorRequest):
    return {"success": True, "data": simulate(request.current_profile, request.simulated_profile)}
