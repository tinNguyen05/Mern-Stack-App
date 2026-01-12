# Build Stage
FROM node:20-alpine AS builder

ARG VITE_API_URL
# Chuyển ARG thành ENV để Vite có thể đọc được trong quá trình build
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Produciton Stage 
FROM nginx:alpine3.23

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /app/dist ./

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]