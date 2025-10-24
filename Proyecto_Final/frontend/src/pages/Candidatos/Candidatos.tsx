import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Candidatos.scss";
import { format } from "date-fns";

interface Campania {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadvotos: number;
  estado: string;
  fechainicio: string;
  fechafin: string;
}

const CandidatosPage: React.FC = () => {
  const navigate = useNavigate();
  const [campanias, setCampanias] = useState<Campania[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarTokenYcargar = async () => {
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

        await cargarCampaniasActivas(token);
      } catch (error) {
        console.error("Error al verificar token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verificarTokenYcargar();
  }, [navigate]);

  const cargarCampaniasActivas = async (token: string) => {
    try {
      const response = await fetch("https://desarrollo-web-1nh5.onrender.com/api/campanias/activas", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al obtener campañas activas");

      const data = await response.json();
      setCampanias(data);
    } catch (error) {
      console.error("Error al cargar campañas activas:", error);
      alert("No se pudieron cargar las campañas activas");
    }
  };

  const handleAgregar = (campania: Campania) => {
    navigate("/admin/candidatos/agregar", { state: { campania } });
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="candidatos-page">
      <div className="candidatos-header">
        <h2>Gestión de Candidatos</h2>
      </div>

      <table className="candidatos-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cant. Votos</th>
            <th>Estado</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {campanias.length > 0 ? (
            campanias.map((campania) => (
              <tr key={campania.id}>
                <td>{campania.nombre}</td>
                <td>{campania.descripcion}</td>
                <td>{campania.cantidadvotos}</td>
                <td>{campania.estado}</td>
                <td>{format(new Date(campania.fechainicio), "dd/MM/yyyy")}</td>
                <td>{format(new Date(campania.fechafin), "dd/MM/yyyy")}</td>
                <td>
                  <button
                    className="btn-agregar"
                    onClick={() => handleAgregar(campania)}
                  >
                    Agregar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No hay campañas activas disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatosPage;
