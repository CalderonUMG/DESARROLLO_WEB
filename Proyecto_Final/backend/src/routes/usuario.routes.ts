import { Router } from 'express';
import { crearUsuario } from '../controllers/usuario.controller.js';

const router = Router();

router.post('/crear', crearUsuario);

router.get('/ping', (req, res) => {
  res.json({ mensaje: 'Conexión exitosa con el backend 🚀' });
});

export default router;
