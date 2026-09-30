from app.data.sample_data import load_dataset
from app.models.schemas import HealthProfileInput
from app.services.classification import evaluate_models, predict


def sample():
    return HealthProfileInput(age=22, height=170, weight=65, sleep_hours=6, physical_activity=3, water_intake=2, screen_time=7, smoking=False, alcohol=False)


def test_classification_predictions():
    result = predict(sample())
    assert result['prototype_category'] in {'Needs Improvement', 'Balanced Lifestyle', 'Healthy Routine'}
    assert 'decision_tree' in result and 'k_nearest_neighbors' in result


def test_classification_metrics():
    metrics = evaluate_models()
    for model_name in ('decision_tree', 'k_nearest_neighbors'):
        assert set(metrics[model_name]) == {'accuracy','precision','recall','f1_score'}
        assert all(0 <= value <= 1 for value in metrics[model_name].values())


def test_dataset_has_all_classes():
    counts = load_dataset()['profile_group'].value_counts()
    assert all(counts.get(label, 0) >= 5 for label in ['Needs Improvement','Balanced Lifestyle','Healthy Routine'])
