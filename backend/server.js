const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectionDb");
const cors = require("cors");
const path = require("path"); // Thêm thư viện path để xử lý đường dẫn file

const PORT = process.env.PORT || 4000;
connectDb();

// Middlewares
app.use(express.json());
app.use(cors());

// Sửa lại cách dùng static để truy cập ảnh dễ hơn
// Bây giờ bạn có thể truy cập ảnh qua: http://localhost:4000/images/tên-file.jpg
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Route chào mừng để kiểm tra server (Sửa lỗi "Cannot GET /")
app.get("/", (req, res) => {
    res.json({ message: "Chào mừng bạn đến với Food Recipe API!" });
});

// Routes - Nên thêm tiền tố /api để đúng chuẩn RESTful
app.use("/api/user", require("./routes/user"));
app.use("/api/recipe", require("./routes/recipe"));

app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});