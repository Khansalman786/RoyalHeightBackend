import express, { Router } from "express";
import userSchema from "../model/userSchema.js";
const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { name, email, role, password } = req.body;

		// check existing user
		const existingUser = await userSchema.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// create new user
		const user = new userSchema({ name, email, role, password });
		await user.save();

		res.status(201).json({ message: "User registered successfully", user });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email } = req.body;

		const user = await userSchema.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json({
			message: "Login successful",
			user,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
