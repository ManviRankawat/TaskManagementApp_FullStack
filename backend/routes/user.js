const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGN-IN API
router.post("/sign-in", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }

        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashPass });
        await newUser.save();

        return res.status(201).json({ message: "Sign-up successful!" }); 
    } catch (error) {
        console.error("Sign-up error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/log-in", async (req, res) => {
    try {
        console.log("📩 Received Login Request:", req.body); 

        const { email, password } = req.body; 

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email }); 
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email }, 
            "manviTM",
            { expiresIn: "2d" }
        );

        return res.status(200).json({ id: existingUser._id, token }); 
    } catch (error) {
        console.error(" Login error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



module.exports = router;
