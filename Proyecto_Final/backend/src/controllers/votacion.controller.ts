import { Request, Response } from "express";
import { CandidatoCampania } from "../models/CandidatoCampania.js";
import { UsuarioVoto } from "../models/UsuarioVoto.js";
import { Usuario } from "../models/Usuario.js";
import { sequelize } from "../config/database.js";
import { QueryTypes } from "sequelize";
import { Campania } from "../models/Campania.js";
import { Estado } from "../models/Estado.js";
import { Op } from "sequelize";

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

export const registrarVoto = async (req: Request, res: Response) => {
  try {
    const { idusuario, idcampania, idcandidato } = req.body;

    const yaVoto = await UsuarioVoto.findOne({
      where: { idusuario, idcandidatocampaniacampania: idcampania }
    });

    if (yaVoto) {
      return res.status(400).json({ message: "El usuario ya votó en esta campaña" });
    }

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

    const resultados = await sequelize.query(
      `
      SELECT 
        c.idusuario,
        c.descripcion,
        u.nombre AS "usuarioNombre",
        u.colegiado AS "usuarioColegiado",
        COUNT(v.idusuario) AS votos
      FROM candidatocampania c
      JOIN usuario u ON c.idusuario = u.colegiado
      LEFT JOIN usuariovoto v 
        ON c.idcampania = v.idcandidatocampaniacampania 
       AND c.idusuario = v.idcandidatocampaniausuario
      WHERE c.idcampania = :idcampania
      GROUP BY c.idusuario, u.nombre, u.colegiado, c.descripcion
      ORDER BY votos DESC;
      `,
      {
        replacements: { idcampania },
        type: QueryTypes.SELECT,
      }
    );

    // Transformar el formato para que coincida con tu frontend
    const candidatos = resultados.map((r: any) => ({
      idusuario: r.idusuario,
      descripcion: r.descripcion,
      usuario: {
        colegiado: r.usuarioColegiado,
        nombre: r.usuarioNombre,
      },
      votos: parseInt(r.votos, 10) || 0,
    }));

    res.json(candidatos);
  } catch (error) {
    console.error("Error al obtener candidatos con votos:", error);
    res.status(500).json({ message: "Error al obtener candidatos con votos", error });
  }
};

export const obtenerResultadosSQL = async (req: Request, res: Response) => {
  try {
    const resultados = await sequelize.query(
      `
      SELECT
    c.id,
    c.nombre,
    c.descripcion,
    e.nombre AS estado,
    COALESCE(u.nombre, 'Sin ganador') AS ganador,
    COALESCE(v.total_votos, 0) AS total_votos
FROM campania c
JOIN estado e ON e.id = c.estado
LEFT JOIN (
    SELECT
        x.idcampania,
        x.idusuario,
        x.total_votos
    FROM (
        SELECT
            cc.idcampania,
            cc.idusuario,
            COUNT(v.idusuario) AS total_votos,
            RANK() OVER (PARTITION BY cc.idcampania ORDER BY COUNT(v.idusuario) DESC) AS rank_pos
        FROM candidatocampania cc
        LEFT JOIN usuariovoto v
            ON v.idcandidatocampaniacampania = cc.idcampania
           AND v.idcandidatocampaniausuario = cc.idusuario
        GROUP BY cc.idcampania, cc.idusuario
    ) x
    WHERE x.rank_pos = 1
) v ON v.idcampania = c.id
LEFT JOIN usuario u ON u.colegiado = v.idusuario
ORDER BY c.id;
      `,
      { type: QueryTypes.SELECT }
    );

    res.json(resultados);
  } catch (error) {
    console.error("❌ Error al obtener resultados SQL:", error);
    res.status(500).json({ message: "Error al obtener resultados SQL" });
  }
};

/** 🔹 Obtener candidatos y votos de una campaña específica */
export const obtenerCandidatosPorCampania = async (req: Request, res: Response) => {
  try {
    const { idcampania } = req.params;

    const candidatos = await sequelize.query(
      `
      SELECT
        u.colegiado AS idcandidato,
        u.nombre AS nombre_candidato,
        cc.descripcion,
        COUNT(v.idusuario) AS votos
      FROM candidatocampania cc
      JOIN usuario u ON u.colegiado = cc.idusuario
      LEFT JOIN usuariovoto v
        ON v.idcandidatocampaniacampania = cc.idcampania
       AND v.idcandidatocampaniausuario = cc.idusuario
      WHERE cc.idcampania = :idcampania
      GROUP BY u.colegiado, u.nombre, cc.descripcion
      ORDER BY votos DESC;
      `,
      {
        replacements: { idcampania },
        type: QueryTypes.SELECT,
      }
    );

    res.json(candidatos);
  } catch (error) {
    console.error("❌ Error al obtener candidatos de la campaña:", error);
    res.status(500).json({ message: "Error al obtener candidatos" });
  }
};

