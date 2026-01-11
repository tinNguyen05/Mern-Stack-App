const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // Lấy token từ header Authorization
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Bạn cần đăng nhập để thực hiện hành động này" });
    }

    try {
        // Xác thực token đồng bộ
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Gán dữ liệu đã giải mã vào req.user (bao gồm id và email)
        req.user = decoded;
        
        // Chỉ cho phép đi tiếp nếu xác thực thành công
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }
};

module.exports = verifyToken;