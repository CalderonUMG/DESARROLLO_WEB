import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service.js';

const usuarioService = new UsuarioService();

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const nuevo = await usuarioService.crearUsuario(req.body);
    res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: nuevo });
  } catch (error: any) {
    console.error('Error al registrar usuario:', error);
    res.status(400).json({ mensaje: error.message });
  }
};
