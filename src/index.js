import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/authRoutes.js";

const app = express();

connectDB();

// middleware
app.use(express.json());

//router 
app.use("/user", router);


const PORT = process.env.PORT || 7002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
