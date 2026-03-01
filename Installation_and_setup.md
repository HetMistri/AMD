# Installation & Setup

This document gives the complete setup flow for local development and Docker runtime.

## 1) Prerequisites

### Required
- Node.js 20+ (or latest LTS)
- npm 10+
- Python 3.13+ (project files declare 3.14; if wheel issues appear, use 3.13)
- Git

### Optional (Docker runtime)
- Docker Engine
- Docker Compose plugin

## 2) Clone repository

```bash
git clone <your-repo-url>
cd AMD
```

## 3) Local development (recommended)

### Option A: One-click startup on Windows

Run from repo root:

```bat
start_project.bat
```

The script will:
1. Create/activate `.venv`
2. Install backend deps from `backend/requirements.txt`
3. Install frontend deps if missing
4. Start Django backend on `8000`
5. Start Vite frontend on `5173`
6. Start virtual meter feed (`Admin/virtual_meter_gov.py`)

Access points:
- App entry: http://localhost:5173/auth
- User dashboard: http://localhost:5173/dashboard
- Admin route: http://localhost:5173/admin
- Backend API root: http://localhost:8000/api/v1/
- Swagger: http://localhost:8000/swagger/

Logs:
- `logs/backend.log`
- `logs/frontend.log`
- `logs/virtual_meter_gov.log`

### Option B: Manual local startup (all platforms)

#### Backend

```bash
python -m venv .venv
```

Windows:

```bat
.venv\Scripts\activate
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r backend/requirements.txt
```

Prepare backend environment:

```bash
cp backend/.env.example backend/.env
```

Run migrations:

```bash
cd backend
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

#### Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

#### Virtual meter feed (new terminal)

```bash
cd Admin
python -X utf8 virtual_meter_gov.py
```

## 4) Docker runtime

1. Create env files:

```bash
cp backend/.env.example backend/.env
cp .env.docker.example .env.docker
```

2. Build and run:

```bash
docker compose --env-file .env.docker up --build -d
```

3. Access services:
- Frontend: http://localhost/
- Frontend admin route: http://localhost/admin
- Backend API: http://localhost:8000/api/v1/
- ML Gateway docs: http://localhost:8001/docs

4. Stop:

```bash
docker compose down
```

Use `docker compose down -v` to remove volumes.

## 5) Environment variables

### Backend (`backend/.env`)
Important keys:
- `SECRET_KEY`
- `DEBUG`
- `ALLOWED_HOSTS`
- `DB_ENGINE`, `DB_NAME`
- `CORS_ALLOWED_ORIGINS`
- `ML_GATEWAY_URL`
- SMS-related keys (Fast2SMS/Twilio/AWS)

### Docker compose env (`.env.docker`)
Important keys:
- `DEBUG`, `SECRET_KEY`, `ALLOWED_HOSTS`
- `VITE_API_URL`
- `VITE_ADMIN_API_URL`
- `VITE_ADMIN_CONSOLE_API_URL`

`VITE_*` values are build-time for Docker frontend image; rebuild after changes.

## 6) Validation checklist

After startup, verify:
- `http://127.0.0.1:5173` returns HTTP 200
- backend is listening on `8000`
- `http://127.0.0.1:8000/swagger/` opens docs
- simulator log is updating in `logs/virtual_meter_gov.log`

## 7) Troubleshooting

### Frontend not opening
- Wait 10-20 seconds after startup
- Check `logs/frontend.log`
- Ensure `frontend/node_modules` exists; if not, run `npm install`

### Backend errors on startup
- Confirm virtual env is active
- Reinstall deps: `pip install -r backend/requirements.txt`
- Run migrations: `cd backend && python manage.py migrate`
- Check `logs/backend.log`

### Port conflicts (`5173` or `8000`)
- `start_project.bat` already kills listeners on these ports
- If manual run is used, stop existing processes and restart

### Python dependency issues
- If package wheel resolution fails on Python 3.14, use Python 3.13

### Docker build runs with old frontend API URL
- Rebuild with:

```bash
docker compose --env-file .env.docker up --build -d
```
