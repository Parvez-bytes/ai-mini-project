from fastapi.testclient import TestClient

from app.main import app
from app.services.preprocessing import calculate_bmi

client = TestClient(app)


def test_health_endpoint():
    response = client.get('/api/health')
    assert response.status_code == 200
    assert response.json() == {'success': True, 'message': 'Health AI service is running'}


def test_bmi_example():
    assert calculate_bmi(170, 65) == 22.49
