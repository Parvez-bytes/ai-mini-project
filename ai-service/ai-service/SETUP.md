# AI Service Setup

This is **PART 3 (AI SERVICE)** of the AI-Powered Preventive Healthcare Recommendation Engine.

It is an independent Python FastAPI service. Part 1 (React frontend) and Part 2 (Node.js + Express + MongoDB backend) remain separate projects.

## 1. Requirements

- Python 3.10+
- pip

## 2. Windows setup

Open PowerShell or Git Bash in this folder.

```bash
python -m venv venv
```

Activate it in Git Bash:

```bash
source venv/Scripts/activate
```

Or in Command Prompt:

```cmd
venv\\Scripts\\activate
```

## 3. Install dependencies

```bash
pip install -r requirements.txt
```

## 4. Environment

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

The default values are:

```env
PORT=8000
BACKEND_URL=http://localhost:5000
CORS_ORIGINS=http://localhost:5000
```

No API key is required.

## 5. Run

```bash
uvicorn app.main:app --reload --port 8000
```

Open:

- Service: http://localhost:8000
- Health: http://localhost:8000/api/health
- Swagger: http://localhost:8000/docs

## 6. Test

```bash
pytest -q
```

## 7. Architecture

```text
React Frontend
      |
      v
Node + Express Backend
      |
      v
Python FastAPI AI Service
      |
      +--> preprocessing
      +--> Decision Tree
      +--> k-NN
      +--> Linear Regression
      +--> K-Means
      +--> BFS / DFS
      +--> Greedy Best-First / A*
      +--> Hill Climbing
      +--> Forward / Backward Chaining
      +--> Basic NLP
      +--> Explainability
      +--> Recommendation Engine
```

The service is stateless with respect to personal health data: it processes request data and returns model-based results. Persistence remains the responsibility of the Node/MongoDB backend.

## Healthcare safety

This is an educational college prototype. Outputs are lifestyle-oriented, model-based and project-defined. They are not medical diagnoses, medical predictions, medication instructions, emergency treatment, or a replacement for professional healthcare advice.
