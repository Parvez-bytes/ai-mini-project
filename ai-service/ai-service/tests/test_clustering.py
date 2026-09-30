from app.models.schemas import HealthProfileInput
from app.services.clustering import predict


def test_kmeans_dynamic_k_and_group():
    profile = HealthProfileInput(age=22, height=170, weight=65, sleep_hours=6, physical_activity=3, water_intake=2, screen_time=7, smoking=False, alcohol=False)
    result = predict(profile)
    assert result['selected_k'] <= 6
    assert result['profile_group'].startswith('Profile Group ')
    assert len(result['elbow_method']['tested_k_values']) == len(result['elbow_method']['inertia_values'])
