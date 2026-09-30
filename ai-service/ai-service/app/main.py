from __future__ import annotations

import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_analysis import router as analysis_router
from app.api.routes_assistant import router as assistant_router
from app.api.routes_health import router as health_router
from app.api.routes_recommendations import router as recommendation_router
from app.api.routes_simulator import router as simulator_router

load_dotenv()

app = FastAPI(
    title="AI-Powered Preventive Healthcare Recommendation Engine - AI Service",
    description=(
        "Educational FastAPI intelligence layer for model-based preventive-health insights. "
        "It does not diagnose conditions, prescribe medication, or replace professional medical advice."
    ),
    version="1.0.0",
)

backend_url = os.getenv("BACKEND_URL", "http://localhost:5000")
allowed_origins = [origin.strip() for origin in os.getenv("CORS_ORIGINS", backend_url).split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
app.include_router(analysis_router, prefix="/api")
app.include_router(recommendation_router, prefix="/api")
app.include_router(simulator_router, prefix="/api")
app.include_router(assistant_router, prefix="/api")


@app.get("/")
def root():
    return {
        "success": True,
        "message": "AI Service is running. See /docs for the API.",
        "healthcare_notice": "Educational prototype only; not medical diagnosis or treatment.",
    }
