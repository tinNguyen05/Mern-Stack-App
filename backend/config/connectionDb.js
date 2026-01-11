const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        // Sử dụng await mà không cần .then() để code sạch hơn
        const conn = await mongoose.connect(process.env.CONNECTION_STRING);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Lỗi kết nối MongoDB: ${error.message}`);
        // Thoát tiến trình với mã lỗi (1) nếu không kết nối được
        process.exit(1);
    }
};

module.exports = connectDb;