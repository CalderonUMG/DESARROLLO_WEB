export interface CrearUsuarioResponse {
  mensaje: string;
  usuario: {
    colegiado: number;
    nombre: string;
    email: string;
    dpi: string;
    fechanacimiento: string;
    contrasena: string;
  };
}
