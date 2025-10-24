import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Importa el hook
import "./Register.scss";
import { CrearUsuarioResponse } from "../../interface/usuario.interface";

const Register: React.FC = () => {
  const navigate = useNavigate(); // ✅ Inicializa el hook

  const [form, setForm] = useState({
    colegiado: "",
    nombre: "",
    email: "",
    dpi: "",
    fechanacimiento: "",
    contrasena: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<CrearUsuarioResponse>(
        "https://desarrollo-web-1nh5.onrender.com/api/usuarios/crear",
        form
      );

      setMensaje(res.data.mensaje);
      setExito(true);

      // ✅ Espera 1.5 segundos y redirige a Home
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error: any) {
      setExito(false);
      setMensaje(error.response?.data?.mensaje || "Error al registrar usuario");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Número de Colegiado</label>
            <input
              type="text"
              name="colegiado"
              value={form.colegiado}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>DPI</label>
            <input
              type="text"
              name="dpi"
              value={form.dpi}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              name="fechanacimiento"
              value={form.fechanacimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-register">
            Registrar
          </button>
        </form>

        {mensaje && (
          <p className={`mensaje ${exito ? "exito" : "error"}`}>{mensaje}</p>
        )}
      </div>
    </div>
  );
};

export default Register;
