import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  obtenerCandidatosCampania,
  verificarVoto,
  registrarVoto,
  obtenerResultadosSQL,
} from "../controllers/votacion.controller.js";
import { obtenerCandidatosPorCampania } from "../controllers/votacion.controller.js";

const router = express.Router();

router.get("/candidatos/:idcampania", verifyToken, obtenerCandidatosCampania);
router.get("/verificar/:idcampania/:idusuario", verifyToken, verificarVoto);
router.post("/registrar", verifyToken, registrarVoto);
router.get("/resultados-sql", verifyToken, obtenerResultadosSQL);
router.get("/candidatos-campania/:idcampania", verifyToken, obtenerCandidatosPorCampania);



export default router;
