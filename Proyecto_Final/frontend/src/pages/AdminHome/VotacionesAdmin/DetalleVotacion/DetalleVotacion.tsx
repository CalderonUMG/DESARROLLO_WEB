import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetalleVotacion.scss";

interface Candidato {
  idcandidato: number;
  descripcion: string;
  votos: number;
  nombre: string;
}

const DetalleVotacion: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { campania } = location.state || {};

  const [candidatos, setCandidatos] = useState<Candidato[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !campania) {
      navigate("/login");
      return;
    }

    const cargarCandidatos = async () => {
      try {
        const res = await fetch(
          `https://desarrollo-web-1nh5.onrender.com/api/votacion/candidatos-campania/${campania.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) throw new Error("Error al obtener candidatos");
        const data = await res.json();

        setCandidatos(
          data.map((c: any) => ({
            idcandidato: c.idcandidato,
            nombre: c.nombre_candidato,
            descripcion: c.descripcion,
            votos: c.votos,
          }))
        );
      } catch (error) {
        console.error("Error al cargar candidatos:", error);
        alert("No se pudieron cargar los candidatos");
      }
    };

    cargarCandidatos();
  }, [campania, navigate]);


  const handleVolver = () => {
    navigate("/admin/votacionesAdmin");
  };

  return (
    <div className="detalle-votacion">
      <div className="detalle-header">
        <h2>
          Detalles de Votación — {campania ? campania.nombre : "Campaña desconocida"}
        </h2>
        <button className="btn-volver" onClick={handleVolver}>
          Volver
        </button>
      </div>

      <table className="detalle-table">
        <thead>
          <tr>
            <th>ID Candidato</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Votos</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.map((c) => (
            <tr key={c.idcandidato}>
              <td>{c.idcandidato}</td>
              <td>{c.nombre}</td>
              <td>{c.descripcion}</td>
              <td>{c.votos}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default DetalleVotacion;
