import { Request, Response } from "express";
import { CandidatoCampania } from "../models/CandidatoCampania.js";
import { UsuarioVoto } from "../models/UsuarioVoto.js";
import { Usuario } from "../models/Usuario.js";

/** 🔹 Verificar si el usuario ya votó en la campaña */
export const verificarVoto = async (req: Request, res: Response) => {
  try {
    const { idcampania, idusuario } = req.params;

    const existe = await UsuarioVoto.findOne({
      where: {
        idusuario,
        idcandidatocampaniacampania: idcampania
      }
    });

    res.json({ yaVoto: !!existe });
  } catch (error) {
    console.error("Error al verificar voto:", error);
    res.status(500).json({ message: "Error al verificar voto", error });
  }
};

/** 🔹 Registrar voto */
export const registrarVoto = async (req: Request, res: Response) => {
  try {
    const { idusuario, idcampania, idcandidato } = req.body;

    // Verificar si ya votó
    const yaVoto = await UsuarioVoto.findOne({
      where: { idusuario, idcandidatocampaniacampania: idcampania }
    });

    if (yaVoto) {
      return res.status(400).json({ message: "El usuario ya votó en esta campaña" });
    }

    // Registrar el voto
    await UsuarioVoto.create({
      idusuario,
      idcandidatocampaniacampania: idcampania,
      idcandidatocampaniausuario: idcandidato
    });

    res.status(201).json({ message: "Voto registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar voto:", error);
    res.status(500).json({ message: "Error al registrar voto", error });
  }
};

export const obtenerCandidatosCampania = async (req: Request, res: Response) => {
  try {
    const { idcampania } = req.params;
    const candidatos = await CandidatoCampania.findAll({
      where: { idcampania },
      include: [{ model: Usuario, attributes: ["colegiado", "nombre"] }],
    });
    res.json(candidatos);
  } catch (error) {
    console.error("Error al obtener candidatos:", error);
    res.status(500).json({ message: "Error al obtener candidatos" });
  }
};