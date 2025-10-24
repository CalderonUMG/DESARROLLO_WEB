import { Router } from "express";
import { agregarCandidato, obtenerCandidatosPorCampania, eliminarCandidato } from "../controllers/candidatocampania.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:idcampania", verifyToken, obtenerCandidatosPorCampania);

router.post("/agregar", verifyToken, agregarCandidato);

router.delete("/:idcampania/:idusuario", verifyToken, eliminarCandidato);

export default router;
