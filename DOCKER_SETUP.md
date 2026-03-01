# Docker Setup (Production Runtime)

This setup containerizes the full Gram Meter stack for production-style runtime:

- Django backend (`8000`)
- FastAPI ML gateway (`8001`)
- React frontend (including admin routes from `frontend/src`) on one host port (`80`)
- Redis (`6379`)
- Virtual meter simulator (`simulator` service)

## Prerequisites

- Docker Engine + Docker Compose plugin

Verify:

```bash
docker --version
docker compose version
```

## 1) Environment files

Backend env:

```bash
cp backend/.env.example backend/.env
```

Compose env (required for production runtime values):

```bash
cp .env.docker.example .env.docker
```

## 2) Start all services

```bash
docker compose --env-file .env.docker up --build -d
```

Frontend/admin API URLs are compiled at build time. Rebuild after changing `VITE_*` values.

## 3) Check status and logs

```bash
docker compose ps
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f ml-gateway
```

## 4) Access points

- Frontend: http://localhost/
- Admin panel (from `frontend/src`): http://localhost/admin
- Backend API: http://localhost:8000/api/v1/
- ML Gateway docs: http://localhost:8001/docs

## 5) Stop and cleanup

Stop services:

```bash
docker compose down
```

Stop + remove volumes:

```bash
docker compose down -v
```

## Notes

- Frontend and admin routes run as a single static SPA build on Nginx.
- `/admin` and `/admin/dashboard` are frontend router paths from `frontend/src`.
- Backend and ML gateway run without hot-reload.
- Backend runs migrations automatically at startup.
- Redis hostname inside containers is `redis`.

## Rebuild after config changes

When updating `VITE_*` values in `.env.docker`, rebuild images:

```bash
docker compose --env-file .env.docker up --build -d
```
