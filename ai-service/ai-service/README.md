# AI-Powered Preventive Healthcare Recommendation Engine — Part 3 AI Service

## Overview

This project is the Python intelligence layer for an academic **AI in Healthcare** prototype. It exposes REST APIs through FastAPI so the Node.js backend can later send a validated lifestyle/health profile and receive educational, model-based preventive insights.

The service intentionally uses **local, deterministic algorithms and a synthetic dataset**. It has no Gemini/OpenAI dependency and requires no external API key.

> **Healthcare safety:** This service does not diagnose diseases, prescribe medication, claim medical certainty, predict emergencies, or replace professional healthcare advice. Its profile categories, wellness indicator and recommendations are project-defined educational outputs.

## Architecture

```text
React Frontend (Part 1)
        |
        v
Node + Express + MongoDB (Part 2)
        |
        v
Python FastAPI AI Service (Part 3)
        |
        +-- preprocessing
        +-- classification
        +-- regression
        +-- clustering
        +-- search algorithms
        +-- local search
        +-- rule reasoning
        +-- NLP
        +-- explainability
        +-- recommendation engine
```

The Python service primarily processes request data and returns JSON. It does not save personal health information to files. Persistence remains in the Node/MongoDB backend.

## Technology

- Python 3.10+
- FastAPI
- Uvicorn
- NumPy
- Pandas
- scikit-learn
- Pydantic
- joblib
- python-dotenv

## Installation

```bash
python -m venv venv
```

Git Bash:

```bash
source venv/Scripts/activate
```

Windows Command Prompt:

```cmd
venv\\Scripts\\activate
```

Install:

```bash
pip install -r requirements.txt
```

Create environment file:

```bash
cp .env.example .env
```

Run:

```bash
uvicorn app.main:app --reload --port 8000
```

Then open http://localhost:8000/docs.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Service health check |
| POST | `/api/analysis` | Complete model-based analysis pipeline |
| POST | `/api/analysis/algorithms` | Individual algorithm demonstrations and metrics |
| POST | `/api/recommendations/generate` | Goal-based preventive recommendations |
| POST | `/api/simulator` | Current vs simulated profile comparison |
| POST | `/api/nlp/analyze` | Basic keyword/category NLP |
| POST | `/api/assistant` | Deterministic context-aware assistant |
| GET | `/` | Service summary |

FastAPI automatically exposes Swagger at `/docs` and OpenAPI at `/openapi.json`.

## Input profile

Example:

```json
{
  "age": 22,
  "height": 170,
  "weight": 65,
  "sleep_hours": 6,
  "physical_activity": 3,
  "water_intake": 2,
  "screen_time": 7,
  "smoking": false,
  "alcohol": false
}
```

Validation rejects obviously impossible ranges and unknown fields.

## Synthetic dataset

`app/data/healthcare_dataset.csv` is explicitly:

> Synthetic educational dataset created for this academic project.

It is not a clinical dataset. It is used to demonstrate classification, regression and clustering workflows.

## AI Techniques Used

### 1. BFS
**Purpose:** breadth-first graph traversal.
**Project use:** finds a path through the recommendation workflow from `Health Assessment` to `Tracking`.
**Output:** path, visited nodes, expanded nodes and measured execution time.

### 2. DFS
**Purpose:** depth-first graph traversal.
**Project use:** explores the same recommendation workflow graph using depth-first traversal.
**Output:** path, visited nodes, expanded nodes and measured execution time.

### 3. Greedy Best-First Search
**Purpose:** choose the frontier node with the lowest heuristic estimate.
**Project use:** traverses the recommendation workflow using a configured distance-to-goal heuristic.
**Output:** path, expanded nodes, heuristic values and execution time.

### 4. A*
**Purpose:** combine accumulated cost `g(n)` and heuristic `h(n)` using `f(n) = g(n) + h(n)`.
**Project use:** searches the same workflow graph with weighted edges.
**Output:** path, path cost, expanded nodes and execution time.

### 5. Hill Climbing
**Purpose:** local search that moves to a better neighboring state.
**Project use:** demonstration path through lifestyle/recommendation workflow states.
**Output:** starting state, final state, path, step scores and number of steps.

### 6. Forward Chaining
**Purpose:** infer new facts from known facts and rules.
**Project use:** applies non-diagnostic preventive workflow rules such as low activity plus a configured BMI flag leading to a preventive action flag.
**Output:** initial facts, fired rules, derived facts and recommendation text.

### 7. Backward Chaining
**Purpose:** start from a goal and find facts/rules needed to prove it.
**Project use:** explains what facts are required to establish `PreventiveActionRequired` under the project's rules.
**Output:** goal, reasoning chain, required facts and whether the goal was proven.

### 8. K-Means
**Purpose:** unsupervised grouping.
**Project use:** groups lifestyle/profile patterns using BMI, sleep, physical activity, water intake and screen time.
**Output:** selected K, profile group, cluster centers, cluster sizes and elbow-method values.

The service dynamically limits tested K values so K never exceeds the number of samples. Cluster names are neutral `Profile Group 1`, `Profile Group 2`, etc.; they are not disease groups.

### 9. Decision Tree
**Purpose:** supervised classification using feature splits.
**Project use:** predicts a prototype lifestyle-profile category.
**Output:** predicted category plus accuracy, precision, recall and F1-score.

### 10. k-NN
**Purpose:** classify a point from nearby training examples.
**Project use:** second supervised model for comparison with the Decision Tree.
**Output:** predicted category plus accuracy, precision, recall and F1-score.

Prototype categories are `Needs Improvement`, `Balanced Lifestyle`, and `Healthy Routine`. They are project-defined lifestyle-profile categories, not medical labels.

### 11. Linear Regression
**Purpose:** estimate a continuous target from numeric features.
**Project use:** predicts the project's synthetic wellness indicator from the profile features.
**Output:** predicted prototype wellness score plus MAE, RMSE and R².

The result is explicitly an educational model output, not a medical prediction.

### 12. Basic NLP
**Purpose:** lightweight text preprocessing and keyword detection.
**Project use:** detects categories such as sleep, exercise, hydration, nutrition, screen time and stress/routine from user text.
**Output:** tokens, detected categories and matched keywords.

## Explainability

The recommendation engine records model/rule reasons such as:

- Sleep duration below the project's configured preferred range.
- Physical activity relatively low for the configured prototype range.
- Hydration below the configured project threshold.
- Screen time above the configured project threshold.

These explanations describe the project's configured rules/model output; they are not medical claims.

## Main analysis pipeline

`POST /api/analysis` runs:

1. preprocessing and BMI calculation
2. Decision Tree and k-NN classification
3. K-Means clustering
4. Linear Regression
5. rule-based reasoning
6. preventive recommendation generation
7. explainability
8. workflow search comparison

The response contains JSON-serializable results only; raw scikit-learn model objects are never exposed.

## Model training approach

Models are trained lazily and cached with `joblib.Memory`. The cache is stored under the runtime-only `models/` directory and uses the dataset file timestamp as part of its cache key, so normal API requests do not retrain models unnecessarily while dataset changes trigger a fresh training result.

## Tests

Run:

```bash
pytest -q
```

Tests cover service health, preprocessing/BMI, classification, K-Means, search, reasoning, regression, NLP and recommendation generation.

## Future Part 4 integration

The intended final request chain is:

```text
React
  -> Node + Express
      -> Python FastAPI
          -> algorithms/models
      <- JSON result
  <- persisted result / history
```

This Part 3 service does not create Node files, React files, MongoDB persistence code, a Python-to-database layer, or an external AI API client.
