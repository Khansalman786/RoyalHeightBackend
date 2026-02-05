import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorizeMiddleware.js";

const router = express.Router();
// Admin + Manager route
router.get("/admin", protect, authorize("admin"), (req, res) => {
	res.json({ message: "Admin access granted" });
});

// Only manager route
router.get(
	"/manager",
	protect,
	authorize("manager", "admin", "user"),
	(req, res) => {
		res.json({ message: `Welcome ${req.user.role}`, user: req.user });
	},
);

// Normal user route
router.get("/user", protect, (req, res) => {
	res.json(req.user);
});

export default router;
