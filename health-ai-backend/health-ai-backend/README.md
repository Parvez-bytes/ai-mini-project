# AI-Powered Preventive Healthcare Recommendation Engine — Backend (Part 2)

This repository contains **Part 2: the Node.js backend** for the AI-Powered Preventive Healthcare Recommendation Engine. It is designed to connect later to the existing React/Vite frontend from Part 1 and, in Part 3, to a Python FastAPI AI service.

## Scope

This part includes:

- Node.js + Express.js REST API
- MongoDB + Mongoose data models
- JWT authentication with HTTP-only cookies
- bcryptjs password hashing
- Request validation using `express-validator`
- CORS with credentials for the Part 1 frontend
- Health profiles with server-side BMI calculation
- Assessment storage with profile snapshots
- Recommendation CRUD
- Health history CRUD
- Basic current-user CRUD
- Centralized 404 and error handling
- A `/api/health` endpoint

This part intentionally **does not** include the React frontend, Python/FastAPI service, ML models, Gemini/OpenAI integrations, or fake AI endpoints.

## Architecture

```text
React Frontend (Part 1)
        |
        | HTTP + credentials
        v
Node.js + Express (Part 2)
        |
        +----> MongoDB / Mongoose
        |
        +----> Python FastAPI AI Service (Part 3, future)
```

The future AI integration can use:

```text
Node Backend
    |
    v
AI_SERVICE_URL=http://localhost:8000
    |
    v
Python FastAPI AI Service
```

The current backend does not call `AI_SERVICE_URL`.

## Technology

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (`jsonwebtoken`)
- `bcryptjs`
- `dotenv`
- `cors`
- `cookie-parser`
- `express-validator`
- Nodemon for development
- JavaScript ES Modules

## Folder structure

```text
health-ai-backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   ├── assessmentController.js
│   │   ├── recommendationController.js
│   │   ├── historyController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── notFoundMiddleware.js
│   │   └── validateMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── HealthProfile.js
│   │   ├── Assessment.js
│   │   ├── Recommendation.js
│   │   └── HealthHistory.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── assessmentRoutes.js
│   │   ├── recommendationRoutes.js
│   │   ├── historyRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── calculateBMI.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── SETUP.md
```

## API routes

### Authentication

| Method | Endpoint | Auth |
|---|---|---|
| POST | `/api/auth/signup` | No |
| POST | `/api/auth/login` | No |
| POST | `/api/auth/logout` | No |
| GET | `/api/auth/me` | Yes |

### User

| Method | Endpoint | Auth |
|---|---|---|
| GET | `/api/users/me` | Yes |
| PUT | `/api/users/me` | Yes |

### Profile

| Method | Endpoint | Auth |
|---|---|---|
| GET | `/api/profile` | Yes |
| POST | `/api/profile` | Yes |
| PUT | `/api/profile` | Yes |
| DELETE | `/api/profile` | Yes |

### Assessments

| Method | Endpoint | Auth |
|---|---|---|
| POST | `/api/assessments` | Yes |
| GET | `/api/assessments` | Yes |
| GET | `/api/assessments/:id` | Yes |
| DELETE | `/api/assessments/:id` | Yes |

### Recommendations

| Method | Endpoint | Auth |
|---|---|---|
| GET | `/api/recommendations` | Yes |
| GET | `/api/recommendations/:id` | Yes |
| POST | `/api/recommendations` | Yes |
| DELETE | `/api/recommendations/:id` | Yes |

### Health history

| Method | Endpoint | Auth |
|---|---|---|
| GET | `/api/history` | Yes |
| GET | `/api/history/:id` | Yes |
| POST | `/api/history` | Yes |
| DELETE | `/api/history/:id` | Yes |

### Health check

`GET /api/health`

Response:

```json
{
  "success": true,
  "message": "Health AI backend is running"
}
```

## Authentication

Passwords are hashed with `bcryptjs` before they are stored. Passwords are excluded from normal API responses.

On signup/login, the server creates a JWT containing the user ID and sends it using an HTTP-only cookie named `token`.

Cookie behavior:

- Local development: `httpOnly=true`, `secure=false`, `sameSite=lax`
- Production: `httpOnly=true`, `secure=true`, `sameSite=none`

The production cookie configuration assumes the frontend/backend are deployed across origins that require credentialed cross-site requests. For local development, `sameSite=lax` avoids requiring HTTPS.

The frontend must later send requests with credentials enabled (for example, Axios `withCredentials: true` or `fetch` with `credentials: 'include'`).

## Database models

### User

Stores account identity and authentication data. Email is unique and lowercased. Password is never returned by API serialization.

### HealthProfile

Stores lifestyle and optional health-related inputs. BMI is calculated server-side from height in centimeters and weight in kilograms.

BMI formula:

```text
BMI = weight(kg) / height(m)^2
```

Example: 170 cm and 65 kg produces approximately 22.49.

BMI is a basic screening metric and is not a diagnosis.

### Assessment

Stores a `profileSnapshot` so the submitted assessment preserves the profile values at that time. `analysisStatus` starts as `pending`. The actual AI/ML analysis is intentionally deferred to Part 3.

### Recommendation

Stores user-owned recommendation content, linked optionally to an assessment, with category, reason, action, priority, and source.

### HealthHistory

Stores historical lifestyle indicators. `wellnessScore` is a project-defined prototype wellness indicator and is **not a medical score**.

## Environment variables

Copy `.env.example` to `.env` and configure:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/health_ai
JWT_SECRET=replace_with_secure_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
AI_SERVICE_URL=http://localhost:8000
```

Never commit `.env` or real secrets.

## Security measures

- bcrypt password hashing
- JWT verification
- HTTP-only authentication cookie
- Credentialed CORS restricted to `CLIENT_URL`
- `express-validator` request validation
- User ownership checks on protected resources
- No password fields in API responses
- Environment variables for secrets/configuration
- Consistent error responses
- No stack traces in production responses
- Database startup failure stops the server instead of silently continuing

## Frontend compatibility

Part 1 is expected at:

```text
http://localhost:5173
```

This backend is expected at:

```text
http://localhost:5000
```

CORS is configured to allow the value from `CLIENT_URL` and credentials are enabled.

The backend does not modify or rebuild the frontend.

## Future Part 3

Part 3 can add a Python FastAPI service behind `AI_SERVICE_URL`:

```text
React
  -> Node/Express
      -> MongoDB
      -> Python/FastAPI AI Service
```

The present backend does not call the AI service and does not create Python files or endpoints.

## Healthcare safety

This is an educational college project. The backend stores and transports preventive-health prototype data, but it does not diagnose disease, prescribe medication, claim medical certainty, or provide emergency treatment.

Preferred terminology includes `preventive insight`, `prototype analysis`, `lifestyle recommendation`, and `educational analysis`.
