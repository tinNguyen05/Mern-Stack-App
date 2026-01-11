const express = require("express");
const router = express.Router();
const { userLogin, userSignUp, getUser } = require("../controller/user");

// Đường dẫn sẽ là: /api/user/signUp
router.post("/signUp", userSignUp);

// Đường dẫn sẽ là: /api/user/login
router.post("/login", userLogin);

// Đường dẫn sẽ là: /api/user/:id
router.get("/:id", getUser); 

module.exports = router;