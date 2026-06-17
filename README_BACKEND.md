FastAPI backend (SQLite)

Run locally:

1. Create a virtual environment and install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate  # or .\.venv\Scripts\activate on Windows
pip install -r requirements.txt
```

2. Start the API:

```bash
uvicorn backend.main:app --reload --port 8000
```

3. API endpoints:
- POST /api/register {username, email, password}
- POST /api/login {username, email, password} -> returns token
- GET /api/poems
- POST /api/poems (Bearer token)
- GET /api/images
- POST /api/images (Bearer token)

Notes:
- This backend uses SQLite (`backend.db`) for simplicity. For production, use PostgreSQL and environment secrets for the JWT `SECRET_KEY`.
- Vercel does not run long-lived FastAPI servers; deploy this backend to Render, Fly.io or similar if you want a hosted API.
