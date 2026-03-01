# Gram Meter

Smart energy monitoring prototype for rural/distributed electricity networks.

This repository combines:
- A **Django + DRF backend** for authentication, meter telemetry, analytics, billing, notifications, and distribution monitoring
- A **React + Vite frontend** for end-user and admin routes in one SPA
- A **FastAPI ML Gateway** for forecasting/anomaly/efficiency APIs
- A **virtual meter simulator** for live demo data generation

---

## Table of Contents

1. [What this project does](#what-this-project-does)
2. [System architecture](#system-architecture)
3. [Repository structure](#repository-structure)
4. [API surface](#api-surface)
5. [Run modes](#run-modes)
6. [Configuration](#configuration)
7. [Technology stack](#technology-stack)
8. [Known implementation notes](#known-implementation-notes)

---

## What this project does

Gram Meter is a multi-module platform that models a smart electricity ecosystem:
- **End users** can authenticate via OTP and view meter/dashboard insights
- **Admins** can monitor village grid data and distribution hierarchy
- **Backend services** store readings, compute billing, trigger alerts, and expose APIs
- **ML services** provide forecast/anomaly endpoints
- **Simulator** emits realistic distribution telemetry for demo/testing

---

## System architecture

### 1) Frontend (`frontend/`)
- Vite + React SPA
- Main routes include:
  - `/language`, `/auth`
  - `/dashboard`, `/analytics`, `/meters`, `/alerts`, `/billing`, `/profile`
  - `/admin`, `/admin/dashboard`, `/admin/distribution`
- API base defaults to `http://localhost:8000/api/v1` through `VITE_API_URL`

### 2) Backend (`backend/`)
Django project: `gram_meter`

Installed domain apps:
- `meters` — custom user, meter, readings, OTP/session auth, admin endpoints
- `analytics` — consumption summaries/trends and ML-backed analytics endpoints
- `billing` — bills/invoices/payments/tariffs/subscriptions
- `notifications` — notification records and delivery APIs
- `distribution` — company→district→village→transformer→house hierarchy and loss analytics

Primary API roots:
- `GET /swagger/`, `GET /redoc/`
- `api/v1/` (meters/auth/dashboard etc.)
- `api/v1/billing/`
- `api/v1/analytics/`
- `api/v1/notifications/`
- `api/v1/distribution/`

### 3) ML Gateway (`backend/ml_gateway/`)
FastAPI service with routers:
- `/api/v1/ml/forecast`
- `/api/v1/ml/anomaly`
- `/api/v1/ml/parser`
- `/api/v1/ml/efficiency`

Default local port: `8001`

### 4) Live Data Simulator
- `Admin/virtual_meter_gov.py` (started by `start_project.bat`)
- Additional distribution simulation logic exists in `backend/distribution/simulator.py`

---

## Repository structure

```text
backend/                 Django backend + FastAPI ML gateway code
frontend/                React SPA (user + admin routes)
Admin/                   Virtual meter scripts and data assets
ML/                      Supporting ML scripts/artifacts
docker/                  Dockerfiles + nginx config
scripts/                 Auxiliary start/stop scripts
logs/                    Runtime logs created by startup scripts
start_project.bat        Primary Windows one-click startup
docker-compose.yml       Containerized deployment stack
Installation_and_setup.md Detailed install/run guide
```

---

## API surface

### Core backend examples
- `POST /api/v1/auth/signup/request/`
- `POST /api/v1/auth/signup/verify/`
- `POST /api/v1/auth/login/request/`
- `POST /api/v1/auth/login/verify/`
- `GET /api/v1/auth/status/`
- `POST /api/v1/auth/token/refresh/`

### Analytics examples
- `GET /api/v1/analytics/summary/`
- `GET /api/v1/analytics/consumption/`
- `GET /api/v1/analytics/trends/`
- `GET /api/v1/analytics/efficiency/`
- `POST /api/v1/analytics/ml/detect_anomaly/`
- `POST /api/v1/analytics/ml/predict_consumption/`

### Distribution examples
- `GET /api/v1/distribution/dashboard/`
- `POST /api/v1/distribution/simulator/run/`

---

## Run modes

### Local development (recommended on Windows)
Use the root startup script:

```bat
start_project.bat
```

It performs:
1. Port cleanup (`8000`, `5173`)
2. Python virtual environment bootstrap (`.venv`)
3. Backend dependency install (`backend/requirements.txt`)
4. Frontend dependency check/install
5. Django runserver start (`8000`)
6. Frontend Vite dev server start (`5173`)
7. Virtual meter feeder start (`Admin/virtual_meter_gov.py`)

Logs:
- `logs/backend.log`
- `logs/frontend.log`
- `logs/virtual_meter_gov.log`

### Docker runtime
See `DOCKER_SETUP.md` or run:

```bash
docker compose --env-file .env.docker up --build -d
```

Services:
- frontend (nginx): `80`
- backend (Django ASGI + gunicorn): `8000`
- ml-gateway (FastAPI): `8001`
- redis: `6379`
- simulator: background service

---

## Configuration

### Backend env file
- Template: `backend/.env.example`
- Active local file: `backend/.env` (create from template)

Notable keys:
- `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`
- `DB_ENGINE`, `DB_NAME`
- `CORS_ALLOWED_ORIGINS`
- `JWT_ACCESS_TOKEN_LIFETIME`, `JWT_REFRESH_TOKEN_LIFETIME`
- `ML_GATEWAY_URL`
- SMS provider keys (`FAST2SMS_*`, optional Twilio/AWS entries)

### Docker env file
- Template: `.env.docker.example`
- Active file: `.env.docker`

Frontend values are build-time in Docker image:
- `VITE_API_URL`
- `VITE_ADMIN_API_URL`
- `VITE_ADMIN_CONSOLE_API_URL`

---

## Technology stack

### Backend
- Django 6.0
- Django REST Framework
- SimpleJWT
- Channels + Daphne
- drf-yasg (Swagger)
- FastAPI + Uvicorn (ML gateway)
- Pandas / NumPy / scikit-learn

### Frontend
- React 19 + Vite
- React Router
- TailwindCSS
- Recharts
- Leaflet + React-Leaflet
- MQTT client

### Infra
- Docker Compose
- Nginx (SPA serving)
- Redis

---

## Known implementation notes

1. `start_project.bat` is the actively maintained one-click launcher in project root.
2. `scripts/start_platform.bat` exists but reflects an older startup variant and references assumptions that differ from current root startup flow.
3. `pyproject.toml` and `.python-version` declare Python `3.14`, while dependency ecosystem compatibility can vary by package/wheel availability. If install issues occur on 3.14, try Python 3.13 locally.
4. Admin frontend currently supports static demo credentials (`admin` / `admin123`) with API fallback.

---

For step-by-step setup and troubleshooting, use `Installation_and_setup.md`.