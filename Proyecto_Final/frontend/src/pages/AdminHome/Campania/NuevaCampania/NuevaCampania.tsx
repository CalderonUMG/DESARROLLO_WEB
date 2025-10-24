import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NuevaCampania.scss";

const NuevaCampania: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    cantidadvotos: "",
    fechainicio: "",
    fechafin: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Validar token antes de cargar la página
  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/auth/verify", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Error al verificar token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verificarToken();
  }, [navigate]);

  if (loading) return <p>Cargando...</p>;

  // ✅ Manejo del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Guardar campaña
  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nombre, descripcion, cantidadvotos, fechainicio, fechafin } = formData;

    if (!nombre || !descripcion || !fechainicio || !fechafin) {
      alert("Por favor complete todos los campos obligatorios.");
      return;
    }

    if (new Date(fechainicio) > new Date(fechafin)) {
      alert("❌ La fecha de inicio no puede ser mayor que la fecha de fin.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const usuario = localStorage.getItem("usuario");
      const creador = usuario ? JSON.parse(usuario).colegiado : null; // ⚠️ asegurate que este campo exista


      const response = await fetch("http://localhost:3000/api/campanias/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          cantidadvotos: parseInt(cantidadvotos) || 0,
          fechainicio,
          fechafin,
          admincreacion: creador,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      alert("✅ Campaña creada correctamente");
      navigate("/admin/campanias");
    } catch (error: any) {
      console.error(error);
      alert(`Error al guardar: ${error.message}`);
    }
  };

  const handleCancelar = () => {
    navigate("/admin/campanias");
  };

  return (
    <div className="nueva-campania">
      <div className="form-container">
        <h2>Registrar Nueva Campaña</h2>
        <form onSubmit={handleGuardar} className="campania-form">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre de la campaña"
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Breve descripción"
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label>Cantidad de votos:</label>
            <input
              type="number"
              name="cantidadvotos"
              value={formData.cantidadvotos}
              onChange={handleChange}
              placeholder="Ej. 100"
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Fecha de inicio:</label>
            <input
              type="date"
              name="fechainicio"
              value={formData.fechainicio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha de fin:</label>
            <input
              type="date"
              name="fechafin"
              value={formData.fechafin}
              onChange={handleChange}
              required
            />
          </div>

          <div className="botones">
            <button type="submit" className="btn-guardar">Guardar</button>
            <button type="button" className="btn-cancelar" onClick={handleCancelar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaCampania;
