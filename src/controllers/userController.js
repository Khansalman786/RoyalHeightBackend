import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ==========================
// Helper → Generate JWT
// ==========================
const generateToken = (id, role) => {
	return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
// ==========================
// REGISTER USER
// ==========================
export const registerUser = async (req, res) => {
	try {
		const { name, email, role, password } = req.body;

		// validation
		if (!name || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		// check existing user
		const existingUser = await User.findOne({ email }).select("+password");

		if (existingUser) {
			return res.status(409).json({ message: "User already exists" });
		}

		// hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// create user
		const user = await User.create({
			name,
			email,
			role,
			password: hashedPassword,
		});

		const token = generateToken(user._id, user.role);

		res.status(201).json({
			message: "User registered successfully",
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// ==========================
// LOGIN USER
// ==========================
export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// validation
		if (!email || !password) {
			return res.status(400).json({ message: "Email and password required" });
		}

		// const user = User.findOne({ email }).select("+password");
		const user = await User.findOne({ email }).select("+password");
		
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// compare password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = generateToken(user._id, user.role);

		res.status(200).json({
			message: "Login successful",
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
