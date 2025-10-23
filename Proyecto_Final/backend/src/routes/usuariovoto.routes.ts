import express from "express";
import { verificarVoto, registrarVoto } from "../controllers/usuariovoto.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/verificar/:idcampania/:idusuario", verifyToken, verificarVoto);
router.post("/registrar", verifyToken, registrarVoto);

export default router;
