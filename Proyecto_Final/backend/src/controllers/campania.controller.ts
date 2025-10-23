import { Request, Response } from "express";
import { Campania } from "../models/Campania.js"; // asegúrate de tener este modelo

export const crearCampania = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, cantidadvotos ,fechainicio, fechafin, admincreacion } = req.body;

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

export const obtenerCampanias = async (req: Request, res: Response) => {
  try {
    const campanias = await Campania.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json(campanias);
  } catch (error: any) {
    console.error("Error al obtener campañas:", error);
    res.status(500).json({ message: "Error al obtener campañas", error: error.message });
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
      order: [["id", "ASC"]], // 👈 ajustado al nombre correcto
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



