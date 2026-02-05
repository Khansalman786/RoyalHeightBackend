import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	role: {
		type: String,
		required: true,
		enum: ["manager", "admin", "user"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
		Timestamp: true,
	},
});

export default mongoose.model("User", userSchema);
