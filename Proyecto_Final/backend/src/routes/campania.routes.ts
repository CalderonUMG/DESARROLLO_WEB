import { Router } from "express";
import { crearCampania, inactivarCampania, obtenerCampanias, obtenerCampaniasActivas, obtenerCampaniasHabilitadas } from "../controllers/campania.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/crear", verifyToken, crearCampania);
router.get("/", verifyToken, obtenerCampanias);
router.get("/activas", verifyToken, obtenerCampaniasActivas);
router.get("/habilitadas", verifyToken, obtenerCampaniasHabilitadas);
router.put("/:id/inactivar", verifyToken, inactivarCampania);

export default router;
