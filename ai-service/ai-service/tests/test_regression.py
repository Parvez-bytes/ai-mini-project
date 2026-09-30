from app.models.schemas import HealthProfileInput
from app.services.regression import predict


def test_regression_output():
    profile = HealthProfileInput(age=22, height=170, weight=65, sleep_hours=6, physical_activity=3, water_intake=2, screen_time=7, smoking=False, alcohol=False)
    result = predict(profile)
    assert 0 <= result['predicted_wellness_score'] <= 100
    assert set(result['metrics']) == {'mae','rmse','r2'}
