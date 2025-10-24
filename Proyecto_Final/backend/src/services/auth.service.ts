import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "default_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1h";

export class AuthService {
  static async login(
    colegiado: string,
    dpi: string,
    fechanacimiento: string,
    password: string
  ) {
    // Buscar usuario
    const user = await Usuario.findOne({
      where: { colegiado, dpi, fechanacimiento: fechanacimiento },
    });

    if (!user) {
      throw new Error("Credenciales incorrectas");
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(
      password,
      user.getDataValue("contrasena")
    );

    if (!validPassword) {
      throw new Error("Contraseña incorrecta");
    }

    const payload = {
      id: user.getDataValue("id_usuario"),
      colegiado: user.getDataValue("colegiado"),
      rol: user.getDataValue("rol"),
    };

    const token = jwt.sign(payload, JWT_SECRET as jwt.Secret, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

    return {
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.getDataValue("id_usuario"),
        nombre: user.getDataValue("nombre"),
        colegiado: user.getDataValue("colegiado"),
        rol: user.getDataValue("rol"),
      },
    };
  }
}
