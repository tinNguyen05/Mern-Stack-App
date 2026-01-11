const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Tiêu đề không được để trống"],
        trim: true
    },
    ingredients: {
        type: [String], // Xác định rõ là mảng các chuỗi (strings)
        required: [true, "Cần có ít nhất một nguyên liệu"]
    },
    instructions: {
        type: String,
        required: [true, "Hướng dẫn nấu ăn là bắt buộc"]
    },
    time: {
        type: String,
    },
    coverImage: {
        type: String, // Lưu đường dẫn hoặc tên file từ Multer
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Phải khớp với tên Model trong file user.js
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Recipes", recipeSchema);