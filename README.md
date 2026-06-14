# FridgeChef AI

A full-stack MVP for AI-powered fridge scanning, recipe generation, meal planning, and nutrition tracking.

## Architecture

This is a monorepo containing:
- `/frontend`: Next.js (App Router), React 19, Tailwind CSS, Shadcn UI.
- `/backend`: FastAPI, PostgreSQL, SQLAlchemy.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- Docker & Docker Compose
- PostgreSQL (if running without Docker)

### Docker Compose
To spin up the entire application stack:
```bash
docker-compose up --build
```
This will start the frontend, backend, and PostgreSQL database.

### Manual Setup
1. Setup Database:
   Ensure PostgreSQL is running and create a database named `fridgechef`.

2. Backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

3. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables
See `.env.example` for required variables. Copy to `frontend/.env.local` and `backend/.env` and update accordingly.
