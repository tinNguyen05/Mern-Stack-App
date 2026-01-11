const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email là bắt buộc"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Mật khẩu là bắt buộc"],
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);