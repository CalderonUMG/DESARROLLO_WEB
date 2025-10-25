import { Request, Response } from "express";
import { Campania } from "../models/Campania.js"; // asegúrate de tener este modelo
import { Estado } from "../models/Estado.js";

export const crearCampania = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, cantidadvotos, fechainicio, fechafin, admincreacion } = req.body;

    // Validar fechas
    if (new Date(fechainicio) > new Date(fechafin)) {
      return res.status(400).json({ message: "La fecha de inicio no puede ser mayor que la fecha de fin." });
    }

    // Crear registro en BD
    const nueva = await Campania.create({
      nombre,
      descripcion,
      cantidadvotos: cantidadvotos || 0,
      estado: 1,
      fechainicio: fechainicio,
      fechafin: fechafin,
      admincreacion: admincreacion,
    });

    res.status(201).json({ message: "Campaña creada correctamente", data: nueva });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la campaña", error: error.message });
  }
};



export const obtenerCampanias = async (_req: Request, res: Response) => {
  try {
    const lista = await Campania.findAll({
      include: [
        {
          model: Estado,
          attributes: ["nombre"], // 🔹 solo queremos el nombre
        },
      ],
      order: [["id", "ASC"]],
    });

    res.json(lista);
  } catch (error) {
    console.error("Error al obtener campañas:", error);
    res.status(500).json({ message: "Error al obtener campañas" });
  }
};


export const obtenerCampaniasActivas = async (req: Request, res: Response) => {
  try {
    const campanias = await Campania.findAll({
      where: { estado: "1" }, // o { estado: 1 } según tu tipo de dato en BD
      order: [["id", "DESC"]],
    });

    res.status(200).json(campanias);
  } catch (error: any) {
    console.error("Error al obtener campañas activas:", error);
    res.status(500).json({ message: "Error al obtener campañas activas", error: error.message });
  }
};


export const obtenerCampaniasHabilitadas = async (req: Request, res: Response) => {
  try {
    const campanias = await Campania.findAll({
      where: { estado: 1 },
      order: [["id", "ASC"]],
    });

    res.status(200).json(campanias);
  } catch (error: any) {
    console.error("Error al obtener campañas habilitadas:", error);
    res.status(500).json({
      message: "Error al obtener campañas habilitadas",
      error: error.message,
    });
  }
};



/** 🔹 Cambiar estado de campaña a inactivado */
export const inactivarCampania = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const campania = await Campania.findByPk(id, { raw: false });
    if (!campania) return res.status(404).json({ message: "Campaña no encontrada" });

    // Forma 1:
    await campania.update({ estado: 2 });  // marca cambiado y persiste

    // Forma 2 (equivalente):
    // campania.set('estado', 0);
    // await campania.save({ fields: ['estado'] });

    return res.json({ message: "Campaña inactivada correctamente", campania });
  } catch (error) {
    console.error("Error al inactivar campaña:", error);
    res.status(500).json({ message: "Error al inactivar campaña" });
  }
};

