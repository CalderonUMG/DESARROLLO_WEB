import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { colegiado, dpi, fechanacimiento, password } = req.body;
    const result = await AuthService.login(colegiado, dpi, fechanacimiento, password);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};
