import React, { useEffect, useState } from "react";
import "./Campania.scss";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Campania {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadvotos: number; // 👈 debe coincidir con tu modelo
  estado: string;
  fechainicio: string;
  fechafin: string;
  admincreacion?: string;
}

const CampaniaPage: React.FC = () => {
  const [campanias, setCampanias] = useState<Campania[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("https://desarrollo-web-1nh5.onrender.com/api/auth/verify", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          navigate("/login");
          return;
        }

        // Token válido → cargar campañas
        await cargarCampanias(token);
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

  // ✅ Cargar campañas reales desde el backend
  const cargarCampanias = async (token: string) => {
    try {
      const response = await fetch("https://desarrollo-web-1nh5.onrender.com/api/campanias", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al obtener campañas");

      const data = await response.json();
      setCampanias(data);
    } catch (error) {
      console.error("Error al cargar campañas:", error);
      alert("❌ No se pudieron cargar las campañas");
    }
  };

  const handleNuevaCampania = () => navigate("/admin/campanias/nueva");

  const handleModificar = (id: number) => console.log("Modificar campaña", id);
  const handleEliminar = (id: number) => console.log("Eliminar campaña", id);

  const fechaActual = new Date();

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="campania-page">
      <div className="campania-header">
        <h2>Gestión de Campañas</h2>
        <button className="btn-nueva" onClick={handleNuevaCampania}>
          + Nueva Campaña
        </button>
      </div>

      <table className="campania-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cant. Votos</th>
            <th>Estado</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Creada por</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {campanias.map((campania) => {
            const fechaInicio = new Date(campania.fechainicio);
            const accionesHabilitadas = fechaActual <= fechaInicio;

            return (
              <tr key={campania.id}>
                <td>{campania.nombre}</td>
                <td>{campania.descripcion}</td>
                <td>{campania.cantidadvotos}</td>
                <td>{campania.estado}</td>
                <td>{format(fechaInicio, "dd/MM/yyyy")}</td>
                <td>{format(new Date(campania.fechafin), "dd/MM/yyyy")}</td>
                <td>{campania.admincreacion || "—"}</td>
                <td className="acciones">
                  <button
                    className="btn-modificar"
                    onClick={() => handleModificar(campania.id)}
                    disabled={!accionesHabilitadas}
                  >
                    Modificar
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(campania.id)}
                    disabled={!accionesHabilitadas}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CampaniaPage;
