# Food Recipe App

Ứng dụng quản lý công thức nấu ăn với React và Node.js

## 🚀 Cài đặt và chạy dự án

### Yêu cầu
- Node.js (v14 trở lên)
- MongoDB (local hoặc MongoDB Atlas)

### Backend

```bash
cd backend
npm install

# Tạo file .env (xem .env.example)
# Sau đó chạy:
npm run dev
```

Backend sẽ chạy tại: http://localhost:4000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend sẽ chạy tại: http://localhost:5173

## 📁 Cấu trúc dự án

Xem file [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) để biết chi tiết.

## 🌐 Deploy

Xem file [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) để biết cách deploy.

## 🔧 Công nghệ sử dụng

### Backend
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (upload files)
- Bcrypt

### Frontend
- React 18
- Vite
- React Router
- Axios

## 📝 API Endpoints

### User
- POST `/api/user/signup` - Đăng ký
- POST `/api/user/login` - Đăng nhập
- GET `/api/user/:id` - Lấy thông tin user

### Recipe
- GET `/api/recipe` - Lấy tất cả recipes
- GET `/api/recipe/:id` - Lấy chi tiết recipe
- POST `/api/recipe` - Tạo recipe mới (cần auth)
- PUT `/api/recipe/:id` - Cập nhật recipe (cần auth)
- DELETE `/api/recipe/:id` - Xóa recipe (cần auth)

## 🔐 Environment Variables

### Backend (.env)
```
PORT=4000
CONNECTION_STRING=mongodb://localhost:27017/food-recipe-app
SECRET_KEY=your-secret-key
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:4000/api
```

## 📦 Build Production

```bash
# Frontend
cd frontend
npm run build

# Output: frontend/dist/
```

## 📸 Screenshots

(Thêm screenshots của ứng dụng)

## 👥 Đóng góp

Mọi đóng góp đều được chào đón!

## 📄 License

MIT
