# --- Этап 1: Сборка ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Этап 2: Раздача ---
FROM nginx:stable-alpine AS production

RUN rm -rf /usr/share/nginx/html/*

# Папка для ACME-челленджей Certbot
RUN mkdir -p /var/www/certbot

# обязательно /app/dist а не /app/build, потому что vite по дефолту так билдит
COPY --from=builder /app/dist /usr/share/nginx/html
# (или /app/dist, если у вас Vite)

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]