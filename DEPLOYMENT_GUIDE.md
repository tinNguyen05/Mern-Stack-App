# Hướng dẫn Deploy Food Recipe App

## 📋 Tổng quan

Dự án Food Recipe App bao gồm:
- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + Vite

## 🚀 Các phương thức Deploy

### 1. Deploy trên VPS/Server (Ubuntu)

#### Backend

```bash
# 1. Cài đặt Node.js và MongoDB
sudo apt update
sudo apt install nodejs npm mongodb -y

# 2. Clone dự án
git clone <your-repo-url>
cd Food-Recipe-App/backend

# 3. Cài đặt dependencies
npm install

# 4. Tạo file .env
nano .env
# Thêm:
PORT=4000
CONNECTION_STRING=mongodb://localhost:27017/food-recipe-app
SECRET_KEY=your-production-secret-key
NODE_ENV=production

# 5. Cài đặt PM2 để chạy trong background
sudo npm install -g pm2

# 6. Khởi động ứng dụng
pm2 start server.js --name food-recipe-backend
pm2 save
pm2 startup

# 7. Cấu hình Nginx reverse proxy
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/food-recipe

# Thêm cấu hình:
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /images {
        proxy_pass http://localhost:4000/images;
    }
}

# Kích hoạt site
sudo ln -s /etc/nginx/sites-available/food-recipe /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Frontend

```bash
# 1. Build frontend
cd ../frontend
npm install
npm run build

# 2. Deploy với Nginx
sudo nano /etc/nginx/sites-available/food-recipe

# Thêm vào server block:
location / {
    root /var/www/food-recipe;
    try_files $uri $uri/ /index.html;
}

# 3. Copy build files
sudo mkdir -p /var/www/food-recipe
sudo cp -r dist/* /var/www/food-recipe/

sudo systemctl restart nginx
```

---

### 2. Deploy Backend lên Heroku

```bash
# 1. Cài đặt Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# 2. Login Heroku
heroku login

# 3. Tạo app
cd backend
heroku create food-recipe-backend

# 4. Thêm MongoDB Add-on (hoặc dùng MongoDB Atlas)
heroku addons:create mongolab:sandbox

# 5. Set environment variables
heroku config:set SECRET_KEY=your-secret-key
heroku config:set NODE_ENV=production

# 6. Deploy
git init
git add .
git commit -m "Deploy to Heroku"
heroku git:remote -a food-recipe-backend
git push heroku main

# 7. Kiểm tra logs
heroku logs --tail
```

**Lưu ý**: Cần tạo file `Procfile` trong backend:
```
web: node server.js
```

---

### 3. Deploy Frontend lên Vercel

```bash
# 1. Cài đặt Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
cd frontend
vercel

# Hoặc deploy qua GitHub:
# - Push code lên GitHub
# - Vào vercel.com
# - Import repository
# - Cấu hình build:
#   - Build Command: npm run build
#   - Output Directory: dist
#   - Install Command: npm install

# 4. Cấu hình biến môi trường
# Trên dashboard Vercel, thêm:
VITE_API_URL=https://your-backend-url.herokuapp.com/api
```

---

### 4. Deploy Backend lên Railway

```bash
# 1. Vào railway.app
# 2. Tạo New Project > Deploy from GitHub
# 3. Chọn repository và chỉ định backend folder
# 4. Thêm biến môi trường:
PORT=4000
CONNECTION_STRING=mongodb+srv://...
SECRET_KEY=your-secret-key

# 5. Deploy tự động khi push code
```

---

### 5. Deploy toàn bộ lên Render

#### Backend
1. Vào render.com > New > Web Service
2. Connect GitHub repository
3. Cấu hình:
   - **Name**: food-recipe-backend
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Thêm Environment Variables:
   ```
   PORT=4000
   CONNECTION_STRING=your-mongodb-uri
   SECRET_KEY=your-secret-key
   NODE_ENV=production
   ```

#### Frontend
1. Render.com > New > Static Site
2. Cấu hình:
   - **Name**: food-recipe-frontend
   - **Root Directory**: frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
3. Environment Variables:
   ```
   VITE_API_URL=https://food-recipe-backend.onrender.com/api
   ```

---

### 6. Deploy với Docker

#### Tạo Dockerfile cho Backend

File đã có sẵn: `backend/Dockerfile`

#### Tạo Dockerfile cho Frontend

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Tạo docker-compose.yml

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: food-recipe-db
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    container_name: food-recipe-backend
    restart: always
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
      - CONNECTION_STRING=mongodb://mongodb:27017/food-recipe-app
      - SECRET_KEY=your-secret-key
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    container_name: food-recipe-frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

#### Chạy với Docker Compose

```bash
docker-compose up -d
```

---

## 🔒 Bảo mật trước khi Deploy

1. **Thay đổi SECRET_KEY** thành chuỗi phức tạp
2. **Sử dụng HTTPS** (Let's Encrypt cho free SSL)
3. **Cấu hình CORS** đúng origin
4. **Ẩn thông tin nhạy cảm** (.env không push lên git)
5. **Rate limiting** cho API
6. **Validation** input đầy đủ

---

## 📊 Monitoring

### Với PM2
```bash
pm2 monit
pm2 logs
```

### Với Docker
```bash
docker-compose logs -f
```

---

## 🔄 Cập nhật ứng dụng

### VPS/PM2
```bash
git pull
npm install
pm2 restart food-recipe-backend
```

### Heroku
```bash
git push heroku main
```

### Docker
```bash
docker-compose down
docker-compose up -d --build
```

---

## 📝 Checklist trước khi Deploy

- [ ] Test đầy đủ trên local
- [ ] Build thành công không lỗi
- [ ] Cấu hình .env đầy đủ
- [ ] Database connection string đúng
- [ ] CORS cấu hình đúng domain
- [ ] Secret keys đủ mạnh
- [ ] .gitignore đã loại trừ .env
- [ ] README.md đầy đủ hướng dẫn
- [ ] Backup database trước khi deploy

---

## 🆘 Troubleshooting

### Backend không kết nối được MongoDB
```bash
# Kiểm tra MongoDB đang chạy
sudo systemctl status mongodb
# Hoặc
mongosh
```

### Frontend không gọi được API
- Kiểm tra CORS settings trong backend
- Kiểm tra VITE_API_URL trong .env
- Kiểm tra Network tab trong browser DevTools

### Port đã được sử dụng
```bash
# Tìm process đang dùng port
lsof -i :4000
# Kill process
kill -9 <PID>
```

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. Logs của backend/frontend
2. Database connection
3. Environment variables
4. Firewall/Security groups
5. DNS settings (nếu dùng domain)
