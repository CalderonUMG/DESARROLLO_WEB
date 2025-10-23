import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token requerido" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
