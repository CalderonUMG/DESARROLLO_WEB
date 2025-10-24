import { Request, Response } from "express";
import { UsuarioVoto } from "../models/UsuarioVoto.js";

export const verificarVoto = async (req: Request, res: Response) => {
  try {
    const { idcampania, idusuario } = req.params;

    if (!idcampania || !idusuario) {
      return res
        .status(400)
        .json({ message: "Faltan parámetros (idcampania o idusuario)" });
    }

    // Busca si el usuario ya emitió un voto en esta campaña
    const voto = await UsuarioVoto.findOne({
      where: {
        idusuario,
        idcandidatocampaniacampania: idcampania
      }
    });

    if (voto) {
      return res.status(200).json({ yaVoto: true });
    }

    return res.status(200).json({ yaVoto: false });
  } catch (error: any) {
    console.error("Error al verificar voto:", error);
    res.status(500).json({ message: "Error al verificar voto", error: error.message });
  }
};

export const registrarVoto = async (req: Request, res: Response) => {
  try {
    const { idusuario, idcampania, idcandidato } = req.body;

    if (!idusuario || !idcampania || !idcandidato) {
      return res.status(400).json({ message: "Faltan datos del voto" });
    }

    const existe = await UsuarioVoto.findOne({
      where: { idusuario, idcandidatocampaniacampania: idcampania }
    });

    if (existe) {
      return res.status(400).json({ message: "El usuario ya votó en esta campaña" });
    }

    await UsuarioVoto.create({
      idusuario,
      idcandidatocampaniacampania: idcampania,
      idcandidatocampaniausuario: idcandidato
    });

    return res.status(201).json({ message: "Voto registrado exitosamente" });
  } catch (error: any) {
    console.error("Error al registrar voto:", error);
    res.status(500).json({ message: "Error al registrar voto", error: error.message });
  }
};
