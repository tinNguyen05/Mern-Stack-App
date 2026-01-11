# Food Recipe App - Cấu trúc dự án

## Cây thư mục

```
Food-Recipe-App/
│
├── backend/                          # Server-side application
│   ├── config/
│   │   └── connectionDb.js          # Cấu hình kết nối MongoDB
│   │
│   ├── controller/
│   │   ├── recipe.js                # Controller xử lý recipe
│   │   └── user.js                  # Controller xử lý user
│   │
│   ├── middleware/
│   │   └── auth.js                  # Middleware xác thực JWT
│   │
│   ├── models/
│   │   ├── recipe.js                # Model schema cho Recipe
│   │   └── user.js                  # Model schema cho User
│   │
│   ├── routes/
│   │   ├── recipe.js                # Routes API cho recipe
│   │   └── user.js                  # Routes API cho user
│   │
│   ├── public/
│   │   └── images/                  # Thư mục lưu trữ hình ảnh upload
│   │
│   ├── server.js                    # File chính khởi động server
│   ├── package.json                 # Dependencies và scripts
│   └── .env                         # Biến môi trường (cần tạo)
│
└── frontend/
    └── food-blog-app/               # React application (Vite)
        ├── public/                  # Static assets
        │
        ├── src/
        │   ├── assets/              # Images, fonts, etc.
        │   │
        │   ├── components/          # React components
        │   │   ├── Footer.jsx
        │   │   ├── InputForm.jsx
        │   │   ├── MainNavigation.jsx
        │   │   ├── Modal.jsx
        │   │   ├── Navbar.jsx
        │   │   └── RecipeItems.jsx
        │   │
        │   ├── pages/               # Page components
        │   │   ├── AddFoodRecipe.jsx
        │   │   ├── EditRecipe.jsx
        │   │   ├── Home.jsx
        │   │   └── RecipeDetails.jsx
        │   │
        │   ├── App.jsx              # Component chính
        │   ├── App.css              # Styles cho App
        │   ├── main.jsx             # Entry point
        │   └── index.css            # Global styles
        │
        ├── index.html               # HTML template
        ├── vite.config.js           # Vite configuration
        ├── package.json             # Dependencies và scripts
        └── README.md                # Documentation

```

## Công nghệ sử dụng

### Backend
- **Node.js** + **Express.js** - Web framework
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variables
- **Nodemon** - Development auto-reload

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **React Icons** - Icon library

## Các file quan trọng

### Backend
- `server.js` - Entry point, khởi tạo Express server
- `config/connectionDb.js` - Kết nối MongoDB
- `models/*.js` - Định nghĩa schema cho database
- `controller/*.js` - Business logic
- `routes/*.js` - API endpoints
- `middleware/auth.js` - Authentication middleware
- `.env` - Cấu hình môi trường (MongoDB URI, JWT secret, PORT)

### Frontend
- `main.jsx` - Entry point của React app
- `App.jsx` - Main component, routing configuration
- `pages/*.jsx` - Các trang chính của ứng dụng
- `components/*.jsx` - Các component tái sử dụng
- `vite.config.js` - Cấu hình Vite

## Cách chạy dự án

### 1. Backend
```bash
cd backend
npm install
# Tạo file .env với các biến môi trường cần thiết
npm run dev
```

### 2. Frontend
```bash
cd frontend/food-blog-app
npm install
npm run dev
```

### 3. Yêu cầu
- Node.js (v14+)
- MongoDB (local hoặc cloud)
- File `.env` trong backend với:
  - `PORT`
  - `MONGODB_URI`
  - `JWT_SECRET`
