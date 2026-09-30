from app.services.search_algorithms import compare_search_algorithms
from app.services.local_search import hill_climbing


def test_search_algorithms_reach_tracking():
    result = compare_search_algorithms('Health Assessment', 'Tracking')
    for name in ('bfs','dfs','greedy_best_first','a_star'):
        assert result[name]['path'][0] == 'Health Assessment'
        assert result[name]['path'][-1] == 'Tracking'
        assert result[name]['nodes_expanded'] >= 1
        assert result[name]['execution_time_ms'] >= 0
    assert result['a_star']['path_cost'] is not None


def test_hill_climbing_moves_uphill():
    result = hill_climbing()
    scores = result['score_at_each_step']
    assert result['starting_state'] == 'Health Assessment'
    assert result['final_state'] == 'Healthy Lifestyle'
    assert all(b > a for a, b in zip(scores, scores[1:]))
