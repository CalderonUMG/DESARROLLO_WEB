import './Login.scss';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({
    colegiado: '',
    dpi: '',
    fechanacimiento: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) throw new Error(data.message);

      // ✅ Guardar token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.user));
      localStorage.setItem("idUsuario", data.user.colegiado); // ⚠️ importante


      // ✅ Redirigir según el rol
      switch (data.user.rol) {
        case 1:
          navigate("/home-usuario");
          break;
        case 2:
          navigate("/admin");
          break;
        default:
          navigate("/home");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };


  return (
    <section className="login-container">
      <div className="login-box">
        <h2>Ingreso de Colegiado</h2>
        <p>Ingrese sus datos para acceder al sistema.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="colegiado">Número de Colegiado</label>
            <input
              type="text"
              id="colegiado"
              name="colegiado"
              placeholder="Ej. 12345"
              value={formData.colegiado}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dpi">DPI</label>
            <input
              type="text"
              id="dpi"
              name="dpi"
              placeholder="Ej. 1234567890101"
              maxLength={13}
              value={formData.dpi}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechanacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fechanacimiento"
              name="fechanacimiento"
              value={formData.fechanacimiento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese su contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Ingresar
          </button>

          <p className="create-account">
            ¿No tiene una cuenta? <a href="/register">Cree una aquí</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
