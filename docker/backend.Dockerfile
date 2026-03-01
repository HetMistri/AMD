# syntax=docker/dockerfile:1.7

########## Builder ##########
FROM python:3.12-slim AS builder

WORKDIR /tmp

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt /tmp/requirements.txt

RUN pip install --upgrade pip \
    && pip wheel --no-cache-dir --no-deps -r /tmp/requirements.txt -w /wheels

########## Runtime ##########
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /workspace/backend

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /wheels /wheels
RUN pip install --no-cache-dir /wheels/* gunicorn

COPY backend /workspace/backend
COPY ML /workspace/ML

EXPOSE 8000 8001