import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({ valid: true });
});

export default router;
