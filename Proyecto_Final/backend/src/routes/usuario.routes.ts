import { Router } from 'express';
import { crearUsuario } from '../controllers/usuario.controller.js';

const router = Router();

// 🧠 Endpoint de creación de usuario
router.post('/crear', crearUsuario);

// Prueba de conexión
router.get('/ping', (req, res) => {
  res.json({ mensaje: 'Conexión exitosa con el backend 🚀' });
});

export default router;
