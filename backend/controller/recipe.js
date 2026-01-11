const Recipes = require("../models/recipe");
const multer = require('multer');

// --- Cấu hình Multer ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.originalname;
        cb(null, filename);
    }
});
const upload = multer({ storage: storage });

// --- Các hàm xử lý (Controllers) ---

// 1. Lấy tất cả công thức (getRecipes - số nhiều)
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipes.find();
        return res.json(recipes);
    } catch (err) {
        return res.status(500).json({ message: "Lỗi khi lấy danh sách món ăn" });
    }
};

// 2. Lấy chi tiết 1 công thức (getRecipe - số ít)
const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Không tìm thấy món ăn" });
        res.json(recipe);
    } catch (err) {
        return res.status(400).json({ message: "ID không hợp lệ" });
    }
};

// 3. Thêm món ăn mới
const addRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time } = req.body;
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
        }

        const newRecipe = await Recipes.create({
            title,
            ingredients,
            instructions,
            time,
            coverImage: req.file ? req.file.filename : null,
            createdBy: req.user.id
        });
        return res.status(201).json(newRecipe);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// 4. Sửa món ăn
const editRecipe = async (req, res) => {
    try {
        let recipe = await Recipes.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "Không tìm thấy món ăn" });

        let coverImage = req.file ? req.file.filename : recipe.coverImage;
        const updatedRecipe = await Recipes.findByIdAndUpdate(
            req.params.id,
            { ...req.body, coverImage },
            { new: true }
        );
        res.json(updatedRecipe);
    } catch (err) {
        return res.status(400).json({ message: "Cập nhật thất bại" });
    }
};

// 5. Xóa món ăn
const deleteRecipe = async (req, res) => {
    try {
        await Recipes.findByIdAndDelete(req.params.id);
        res.json({ status: "ok", message: "Đã xóa thành công" });
    } catch (err) {
        return res.status(400).json({ message: "Xóa thất bại" });
    }
};

// --- Export tất cả ---
// Hãy đảm bảo tên ở đây khớp hoàn toàn với tên hàm đã viết ở trên
module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload };