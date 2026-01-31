import express from "express";
import { protect } from "../middleware/protect.js";
import { authorize } from "../middleware/authorizeMiddleware.js";

const router = express.Router();
// Admin + Manager route
router.get("/admin", protect, authorize("admin", "manager"), (req, res) => {
	res.json({ message: "Admin access granted" });
});

// Only manager route
router.get("/manager", protect, authorize("manager"), (req, res) => {
	res.json({ message: "Welcome manager" });
});

// Normal user route
router.get("/user", protect, (req, res) => {
	res.json(req.user);
});

export default router;
