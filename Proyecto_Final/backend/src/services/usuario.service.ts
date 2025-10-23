import bcrypt from 'bcrypt';
import { Usuario } from '../models/Usuario.js';

export class UsuarioService {
  async crearUsuario(data: {
    colegiado: number;
    nombre: string;
    email: string;
    dpi: string;
    fechanacimiento: string;
    contrasena: string;
  }) {
    const { colegiado, nombre, email, dpi, fechanacimiento, contrasena } = data;
    console.log(data)

    // existe el DPI o el correo
    const existente = await Usuario.findOne({ where: { dpi } });
    if (existente) throw new Error('El DPI ya está registrado.');

    const emailExistente = await Usuario.findOne({ where: { email } });
    if (emailExistente) throw new Error('El correo electrónico ya está registrado.');

    //usuario sea mayor de 18 años
    const hoy = new Date();
    const fechaNac = new Date(fechanacimiento);
    const edad =
      hoy.getFullYear() -
      fechaNac.getFullYear() -
      (hoy < new Date(hoy.getFullYear(), fechaNac.getMonth(), fechaNac.getDate()) ? 1 : 0);

    if (edad < 18) throw new Error('El usuario debe ser mayor de 18 años.');

    //contraseña sea segura
    const contrasenaSegura =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!contrasenaSegura.test(contrasena)) {
      throw new Error(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo (@$!%*?&)'
      );
    }

    // 4️⃣ Cifrar la contraseña
    const hash = await bcrypt.hash(contrasena, 10);

    // 5️⃣ Crear usuario
    const nuevo = await Usuario.create({
      colegiado,
      nombre,
      email,
      dpi,
      fechanacimiento,
      contrasena: hash,
      rol: 1, // Puedes asignar un rol predeterminado (por ejemplo, "usuario")
    } as any);

    return nuevo;
  }
}
