# Backend Setup — Part 2

This is **FRONTEND-COMPATIBLE BACKEND PART 2** of the AI-Powered Preventive Healthcare Recommendation Engine.

The React frontend is a separate Part 1 project. The Python/FastAPI AI service will be created later in Part 3.

## 1. Install Node.js

Install Node.js 18 or newer.

Verify:

```bash
node --version
npm --version
```

## 2. Install MongoDB

You can use either:

- A local MongoDB installation
- MongoDB Atlas

For local development, the default URI is:

```text
mongodb://127.0.0.1:27017/health_ai
```

Make sure MongoDB is running before starting the backend.

## 3. Extract or clone the project

Open the `health-ai-backend` folder in VS Code.

## 4. Install dependencies

Run:

```bash
npm install
```

## 5. Create `.env`

Copy `.env.example` to `.env`.

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS/Linux:

```bash
cp .env.example .env
```

Then configure at least:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/health_ai
JWT_SECRET=replace_with_secure_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
AI_SERVICE_URL=http://localhost:8000
```

For `JWT_SECRET`, use a long random secret for real deployments.

## 6. Start the development server

Run exactly:

```bash
npm run dev
```

The backend should start at:

```text
http://localhost:5000
```

## 7. Health check

Open:

```text
http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Health AI backend is running"
}
```

## 8. Production start command

```bash
npm start
```

## 9. Important authentication note

The JWT is stored in an HTTP-only cookie, not localStorage. When the Part 1 frontend is connected to this backend, requests that need authentication must include credentials.

Example with `fetch`:

```js
fetch('http://localhost:5000/api/auth/me', {
  credentials: 'include'
});
```

## 10. Development cookie behavior

For local development the backend uses:

```text
httpOnly: true
secure: false
sameSite: lax
```

For a production cross-origin deployment it uses:

```text
httpOnly: true
secure: true
sameSite: none
```

Production cross-origin cookies require HTTPS.

## 11. Current scope

Part 2 contains:

- Express API
- MongoDB/Mongoose
- JWT authentication
- User/profile APIs
- Assessment APIs
- Recommendation APIs
- History APIs
- Validation
- Ownership checks
- Centralized errors

Part 2 does **not** contain:

- React frontend code
- Python files
- FastAPI
- ML models
- OpenAI/Gemini APIs
- API keys
- Real AI analysis

Part 3 can later replace `analysisStatus: "pending"` with the real AI workflow.
