import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VotacionesAdmin.scss";

interface Campania {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadVotos: number;
  estado: string;
  ganador: string;
}


const VotacionesAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [votaciones, setVotaciones] = useState<Campania[]>([]);

  useEffect(() => {
    const verificarTokenYCargar = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("https://desarrollo-web-1nh5.onrender.com/api/votacion/resultados-sql", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.error("Error HTTP:", res.status);
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setVotaciones(
          data.map((v: any) => ({
            id: v.id,
            nombre: v.nombre,
            descripcion: v.descripcion,
            cantidadVotos: v.total_votos,
            estado: v.estado,
            ganador: v.ganador || "En proceso",
          }))
        );
      } catch (error) {
        console.error("Error al cargar votaciones:", error);
        alert("No se pudieron cargar los resultados de votación");
      }
    };

    verificarTokenYCargar();
  }, [navigate]);



  const handleDetalles = (campania: Campania) => {
    navigate(`/admin/votaciones/detalle`, { state: { campania } });
  };

  return (
    <div className="votaciones-page">
      <h2 className="titulo">Resultados de Votaciones</h2>

      <table className="tabla-votaciones">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cant. Votos</th>
            <th>Estado</th>
            <th>Ganador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {votaciones.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.nombre}</td>
              <td>{v.descripcion}</td>
              <td>{v.cantidadVotos}</td>
              <td>{v.estado}</td>
              <td>{v.ganador}</td>
              <td>
                <button
                  className="btn-detalles"
                  onClick={() => handleDetalles(v)}
                >
                  Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VotacionesAdmin;
