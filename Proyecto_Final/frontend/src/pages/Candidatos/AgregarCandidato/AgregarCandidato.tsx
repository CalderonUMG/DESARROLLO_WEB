import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AgregarCandidato.scss";

interface Candidato {
  colegiado: string;
  descripcion: string;
}

const AgregarCandidato: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { campania } = location.state || {};

  const [formData, setFormData] = useState({ colegiado: "", descripcion: "" });
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Validar token y cargar candidatos de la campaña
  useEffect(() => {
    const verificarTokenYCargar = async () => {
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

        await cargarCandidatos(token);
      } catch (error) {
        console.error("Error al verificar token:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verificarTokenYCargar();
  }, [campania, navigate]);

  const cargarCandidatos = async (token: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/candidatos/${campania.id}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Error al obtener candidatos");
      const data = await response.json();
      setCandidatos(data);
    } catch (error) {
      console.error("Error al cargar candidatos:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Agregar candidato
  const handleAgregar = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!formData.colegiado || !formData.descripcion) {
      alert("Por favor complete todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/candidatos/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idcampania: campania.id,
          idusuario: parseInt(formData.colegiado),
          descripcion: formData.descripcion,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("✅ Candidato agregado correctamente");
      setFormData({ colegiado: "", descripcion: "" });
      await cargarCandidatos(token!);
    } catch (error: any) {
      alert(error.message || "Error al agregar candidato");
    }
  };

  // ✅ Eliminar candidato
  const handleEliminar = async (colegiado: string) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("¿Desea eliminar este candidato?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/candidatos/${campania.id}/${colegiado}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("🗑️ Candidato eliminado correctamente");
      await cargarCandidatos(token!);
    } catch (error: any) {
      alert(error.message || "Error al eliminar candidato");
    }
  };

  const handleVolver = () => navigate("/admin/candidatos");

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="agregar-candidato">
      <div className="form-container">
        <h2>
          {campania ? `Campaña: ${campania.nombre}` : "Campaña no seleccionada"}
        </h2>

        <form onSubmit={handleAgregar} className="formulario">
          <div className="form-group">
            <label>No. Colegiado:</label>
            <input
              type="text"
              name="colegiado"
              value={formData.colegiado}
              onChange={handleChange}
              placeholder="Ingrese el número de colegiado"
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
              rows={2}
              required
            />
          </div>

          <div className="botones">
            <button type="submit" className="btn-agregar">
              Agregar
            </button>
            <button type="button" className="btn-volver" onClick={handleVolver}>
              Volver
            </button>
          </div>
        </form>

        <table className="tabla-candidatos">
          <thead>
            <tr>
              <th>Colegiado</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {candidatos.length > 0 ? (
              candidatos.map((c, index) => (
                <tr key={index}>
                  <td>{c.colegiado || c.colegiado}</td>
                  <td>{c.descripcion}</td>
                  <td>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminar(c.colegiado || c.colegiado)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  No hay candidatos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgregarCandidato;
