from app.services.reasoning import forward_chaining, backward_chaining
from app.services.nlp import analyze_text
from app.models.schemas import HealthProfileInput
from app.services.recommendation_engine import generate_recommendations


def test_forward_and_backward_chaining():
    facts = ['HighBMI', 'LowPhysicalActivity']
    forward = forward_chaining(facts)
    assert 'PreventiveActionRequired' in forward['derived_facts']
    backward = backward_chaining('PreventiveActionRequired', facts)
    assert backward['goal_proven'] is True
    assert 'HighBMI' in backward['required_facts']


def test_nlp():
    result = analyze_text("I sleep five hours and do not exercise.")
    assert 'sleep' in result['detected_categories']
    assert 'exercise' in result['detected_categories']


def test_recommendations():
    profile = HealthProfileInput(age=22, height=170, weight=65, sleep_hours=5, physical_activity=1, water_intake=1.2, screen_time=8, smoking=False, alcohol=False)
    recs = generate_recommendations(profile, 'Improve Sleep')
    assert recs
    assert all(set(r) == {'category','title','reason','action','priority','source'} for r in recs)
    assert all(r['source'] == 'rule' for r in recs)
