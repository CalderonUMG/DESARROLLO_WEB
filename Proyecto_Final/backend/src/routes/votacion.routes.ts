import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  obtenerCandidatosCampania,
  verificarVoto,
  registrarVoto,
} from "../controllers/votacion.controller.js";

const router = express.Router();

router.get("/candidatos/:idcampania", verifyToken, obtenerCandidatosCampania);
router.get("/verificar/:idcampania/:idusuario", verifyToken, verificarVoto);
router.post("/registrar", verifyToken, registrarVoto);

export default router;
