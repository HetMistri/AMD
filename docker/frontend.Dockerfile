# syntax=docker/dockerfile:1.7

########## Build frontend ##########
FROM node:22-alpine AS frontend_builder

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend .
RUN npm run build

########## Runtime ##########
FROM nginx:alpine

COPY docker/nginx-unified.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend_builder /app/dist /usr/share/nginx/html

EXPOSE 80