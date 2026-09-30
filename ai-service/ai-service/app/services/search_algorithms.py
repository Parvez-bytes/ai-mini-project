from __future__ import annotations

import heapq
import time
from collections import deque
from typing import Any

GRAPH = {
    "Health Assessment": [("Lifestyle Analysis", 1)],
    "Lifestyle Analysis": [("Sleep Analysis", 2), ("Activity Analysis", 2)],
    "Sleep Analysis": [("Hydration", 1)],
    "Activity Analysis": [("Nutrition", 2)],
    "Hydration": [("Preventive Plan", 2)],
    "Nutrition": [("Preventive Plan", 1)],
    "Preventive Plan": [("Tracking", 2)],
    "Tracking": [],
}

HEURISTIC = {
    "Health Assessment": 7,
    "Lifestyle Analysis": 6,
    "Sleep Analysis": 4,
    "Activity Analysis": 4,
    "Hydration": 3,
    "Nutrition": 2,
    "Preventive Plan": 1,
    "Tracking": 0,
}


def _reconstruct(parent: dict[str, str | None], goal: str) -> list[str]:
    path = []
    current: str | None = goal
    while current is not None:
        path.append(current)
        current = parent.get(current)
    return list(reversed(path))


def bfs(start: str, goal: str) -> dict[str, Any]:
    started = time.perf_counter()
    queue = deque([start])
    parent: dict[str, str | None] = {start: None}
    visited: list[str] = []
    expanded = 0
    while queue:
        node = queue.popleft()
        visited.append(node)
        expanded += 1
        if node == goal:
            break
        for neighbor, _ in GRAPH.get(node, []):
            if neighbor not in parent:
                parent[neighbor] = node
                queue.append(neighbor)
    path = _reconstruct(parent, goal) if goal in parent else []
    return {
        "algorithm": "BFS",
        "path": path,
        "nodes_visited": visited,
        "nodes_expanded": expanded,
        "execution_time_ms": round((time.perf_counter() - started) * 1000, 4),
    }


def dfs(start: str, goal: str) -> dict[str, Any]:
    started = time.perf_counter()
    stack = [start]
    parent: dict[str, str | None] = {start: None}
    visited: list[str] = []
    expanded = 0
    while stack:
        node = stack.pop()
        visited.append(node)
        expanded += 1
        if node == goal:
            break
        for neighbor, _ in reversed(GRAPH.get(node, [])):
            if neighbor not in parent:
                parent[neighbor] = node
                stack.append(neighbor)
    path = _reconstruct(parent, goal) if goal in parent else []
    return {
        "algorithm": "DFS",
        "path": path,
        "nodes_visited": visited,
        "nodes_expanded": expanded,
        "execution_time_ms": round((time.perf_counter() - started) * 1000, 4),
    }


def greedy_best_first(start: str, goal: str) -> dict[str, Any]:
    started = time.perf_counter()
    frontier: list[tuple[int, int, str]] = [(HEURISTIC.get(start, 0), 0, start)]
    parent: dict[str, str | None] = {start: None}
    visited: list[str] = []
    heuristic_values: dict[str, int] = {}
    expanded = 0
    counter = 0
    while frontier:
        h, _, node = heapq.heappop(frontier)
        if node in visited:
            continue
        visited.append(node)
        heuristic_values[node] = h
        expanded += 1
        if node == goal:
            break
        for neighbor, _ in GRAPH.get(node, []):
            if neighbor not in parent:
                parent[neighbor] = node
                counter += 1
                heapq.heappush(frontier, (HEURISTIC.get(neighbor, 0), counter, neighbor))
    path = _reconstruct(parent, goal) if goal in parent else []
    return {
        "algorithm": "Greedy Best-First Search",
        "path": path,
        "nodes_expanded": expanded,
        "heuristic_values": heuristic_values,
        "execution_time_ms": round((time.perf_counter() - started) * 1000, 4),
    }


def a_star(start: str, goal: str) -> dict[str, Any]:
    started = time.perf_counter()
    frontier: list[tuple[int, int, str]] = [(HEURISTIC.get(start, 0), 0, start)]
    parent: dict[str, str | None] = {start: None}
    g_cost = {start: 0}
    expanded = 0
    counter = 0
    closed: set[str] = set()
    while frontier:
        f_score, _, node = heapq.heappop(frontier)
        if node in closed:
            continue
        closed.add(node)
        expanded += 1
        if node == goal:
            break
        for neighbor, edge_cost in GRAPH.get(node, []):
            tentative = g_cost[node] + edge_cost
            if tentative < g_cost.get(neighbor, float("inf")):
                g_cost[neighbor] = tentative
                parent[neighbor] = node
                counter += 1
                f = tentative + HEURISTIC.get(neighbor, 0)
                heapq.heappush(frontier, (f, counter, neighbor))
    path = _reconstruct(parent, goal) if goal in parent else []
    return {
        "algorithm": "A*",
        "path": path,
        "path_cost": g_cost.get(goal),
        "nodes_expanded": expanded,
        "execution_time_ms": round((time.perf_counter() - started) * 1000, 4),
    }


def compare_search_algorithms(start: str, goal: str) -> dict[str, Any]:
    supported = set(GRAPH)
    if start not in supported or goal not in supported:
        raise ValueError(f"start and goal must be workflow nodes: {sorted(supported)}")
    return {
        "start": start,
        "goal": goal,
        "graph": GRAPH,
        "bfs": bfs(start, goal),
        "dfs": dfs(start, goal),
        "greedy_best_first": greedy_best_first(start, goal),
        "a_star": a_star(start, goal),
    }
