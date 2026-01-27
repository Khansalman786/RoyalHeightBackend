import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
connectDB();

// middleware
app.use(express.json());

// TEST ROUTE
app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    message: "User route working 🚀",
  });
});

// server
const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  console.log(`server is live on ${PORT}`);
});
