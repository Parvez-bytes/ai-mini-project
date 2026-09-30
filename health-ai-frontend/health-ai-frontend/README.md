# AI-Powered Preventive Healthcare Recommendation Engine — Frontend Part 1

A complete React/Vite frontend prototype for a college AI-in-healthcare project. The application demonstrates a realistic preventive-wellness workflow entirely with mock/static data and browser `localStorage`.

> **Safety:** This is an educational preventive-health prototype. It does not diagnose medical conditions, replace professional medical advice, provide medication recommendations, or predict real medical outcomes.

## Features

- Professional responsive landing page
- Mock Login / Signup flow
- Protected React Router application layout
- Health & lifestyle profile with live BMI calculation
- Multi-section health assessment with progress indicator
- Mock AI analysis and explainable insight sections
- Goal-based preventive recommendations
- 7-day preventive action plan
- What-If Health Simulator with frontend calculations
- Health Journey timeline and recorded profile trend charts
- Assessment history with details modal
- Future health-assistant chat UI with mock replies
- Reusable UI components and centralized mock data
- localStorage-based mock authentication and profile persistence

## Tech Stack

- React
- Vite
- JavaScript / JSX
- React Router DOM
- Tailwind CSS 3
- Lucide React
- Recharts

Axios, Redux Toolkit, Node/Express, MongoDB, Python/FastAPI, ML models, external APIs, and API keys are intentionally not used in Part 1.

## Folder Structure

```text
health-ai-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── health/
│   │   ├── analysis/
│   │   ├── recommendations/
│   │   ├── simulator/
│   │   └── history/
│   ├── pages/
│   ├── data/
│   │   └── mockData.js
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── SETUP.md
```

The requested component subfolders are present so future feature-specific components can be added without restructuring the application.

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

The Vite development server will print the local URL in the terminal, normally `http://localhost:5173`.

## Available Routes

Public:

- `/`
- `/login`
- `/signup`
- `/about`

Protected mock-app routes:

- `/dashboard`
- `/profile`
- `/health-assessment`
- `/analysis`
- `/recommendations`
- `/simulator`
- `/health-journey`
- `/history`
- `/assistant`

## Mock Data Architecture

All shared demonstration data lives in `src/data/mockData.js`. Pages import the same source rather than keeping duplicate copies of the profile, recommendations, history, trends, and analysis.

The editable health/lifestyle profile is stored in browser `localStorage` under `healthAIProfile`. Mock authentication is stored under `healthAIAuth`. This is for demonstration only and is not real account security.

## Future Backend Architecture

Part 2 can replace the mock layer with real services while keeping the page structure:

```text
React Frontend
      ↓
Node + Express API
      ↓
MongoDB

Node + Express
      ↓
Python FastAPI AI Service
```

No fake API endpoints are included in Part 1. The frontend is intentionally designed so service calls can be introduced later around the same page/component boundaries.

## Validation

The project is intended to run with:

```bash
npm install
npm run dev
```

For a production build check:

```bash
npm run build
```
