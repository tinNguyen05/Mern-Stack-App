const express = require("express");
const router = express.Router();
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload } = require("../controller/recipe");
const verifyToken = require("../middleware/auth");

// Đường dẫn: /api/recipe/ (Lấy tất cả công thức)
router.get("/", getRecipes);

// Đường dẫn: /api/recipe/:id (Lấy chi tiết 1 công thức)
router.get("/:id", getRecipe);

// Các route bên dưới cần đăng nhập (verifyToken)
// Thêm công thức
router.post("/", upload.single('file'), verifyToken, addRecipe);

// Sửa công thức (Nên thêm verifyToken để chỉ chủ sở hữu mới được sửa)
router.put("/:id", upload.single('file'), verifyToken, editRecipe);

// Xóa công thức
router.delete("/:id", verifyToken, deleteRecipe);

module.exports = router;