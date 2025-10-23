import { Router } from "express";
import { agregarCandidato, obtenerCandidatosPorCampania, eliminarCandidato } from "../controllers/candidatocampania.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ Obtener candidatos de una campaña
router.get("/:idcampania", verifyToken, obtenerCandidatosPorCampania);

// ✅ Agregar candidato a una campaña
router.post("/agregar", verifyToken, agregarCandidato);

// ✅ Eliminar candidato de una campaña
router.delete("/:idcampania/:idusuario", verifyToken, eliminarCandidato);

export default router;
