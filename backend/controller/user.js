const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashPwd = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashPwd });

        const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
        
        // Loại bỏ password trước khi gửi về client
        const { password: _, ...userWithoutPassword } = newUser._doc;
        return res.status(201).json({ token, user: userWithoutPassword });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        let user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
            
            const { password: _, ...userWithoutPassword } = user._doc;
            return res.status(200).json({ token, user: userWithoutPassword });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); // Không lấy password
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Invalid User ID" });
    }
};

module.exports = { userLogin, userSignUp, getUser };