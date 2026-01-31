import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";

const app = express();

connectDB();
// middleware
app.use(express.json());

// routes
app.use("/api/user", router);
app.use("/profile", userRoute);

const PORT = process.env.PORT || 7002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
