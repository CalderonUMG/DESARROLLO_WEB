import { Request, Response } from "express";
import { CandidatoCampania } from "../models/CandidatoCampania.js";
import { Usuario } from "../models/Usuario.js";

/**
 * 🔹 Agregar candidato a una campaña
 */
export const agregarCandidato = async (req: Request, res: Response) => {
  try {
    const { idcampania, idusuario, descripcion } = req.body;

    // Verificar si el candidato ya existe en la campaña
    const existe = await CandidatoCampania.findOne({
      where: { idcampania, idusuario },
    });

    if (existe) {
      return res.status(400).json({ message: "El candidato ya está asignado a esta campaña" });
    }

    const nuevo = await CandidatoCampania.create({ idcampania, idusuario, descripcion });
    res.status(201).json(nuevo);
  } catch (error: any) {
    console.error("Error al agregar candidato:", error);
    res.status(500).json({ message: "Error al agregar candidato", error: error.message });
  }
};

/**
 * 🔹 Obtener candidatos de una campaña
 */
export const obtenerCandidatosPorCampania = async (req: Request, res: Response) => {
  try {
    const { idcampania } = req.params;

    const candidatos = await CandidatoCampania.findAll({
      where: { idcampania },
      include: [{ model: Usuario, attributes: ["colegiado", "nombre", "dpi"] }],
    });

    res.status(200).json(candidatos);
  } catch (error: any) {
    console.error("Error al obtener candidatos:", error);
    res.status(500).json({ message: "Error al obtener candidatos", error: error.message });
  }
};

/**
 * 🔹 Eliminar candidato
 */
export const eliminarCandidato = async (req: Request, res: Response) => {
  try {
    const { idcampania, idusuario } = req.params;

    const eliminado = await CandidatoCampania.destroy({
      where: { idcampania, idusuario },
    });

    if (!eliminado) {
      return res.status(404).json({ message: "Candidato no encontrado" });
    }

    res.status(200).json({ message: "Candidato eliminado correctamente" });
  } catch (error: any) {
    console.error("Error al eliminar candidato:", error);
    res.status(500).json({ message: "Error al eliminar candidato", error: error.message });
  }
};
