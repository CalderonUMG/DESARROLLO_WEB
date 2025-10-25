import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./Votacion.scss";

interface Candidato {
  idusuario: number;
  descripcion: string;
  usuario: {
    colegiado: number;
    nombre: string;
  };
  votos?: number;
}


const Votacion: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { campania } = location.state || {};

  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [votoSeleccionado, setVotoSeleccionado] = useState<number | null>(null);
  const [haVotado, setHaVotado] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarTokenYCargar = async () => {
      const token = localStorage.getItem("token");
      const idUsuario = localStorage.getItem("idUsuario");

      if (!token || !idUsuario) {
        navigate("/login");
        return;
      }

      try {
        // Verificar voto
        const res = await fetch(`https://desarrollo-web-1nh5.onrender.com/api/votacion/verificar/${campania.id}/${idUsuario}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.yaVoto) setHaVotado(true);
        }

        // Cargar candidatos
        await cargarCandidatos(token, campania.id);
      } catch (error) {
        console.error("Error al verificar token o cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    verificarTokenYCargar();
  }, [campania, navigate]);


  const cargarCandidatos = async (token: string, idcampania: number) => {
    try {
      const res = await fetch(
        `https://desarrollo-web-1nh5.onrender.com/api/votacion/candidatos/${idcampania}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      console.log(data)
      setCandidatos(data);
    } catch (error) {
      console.error("Error al obtener candidatos:", error);
    }
  };

  const handleVotar = async (id: number) => {
    if (haVotado) {
      alert("Ya has votado en esta campaña.");
      return;
    }

    const token = localStorage.getItem("token");
    const usuario = localStorage.getItem("usuario");
    const userData = JSON.parse(usuario!);

    try {
      const res = await fetch("https://desarrollo-web-1nh5.onrender.com/api/votacion/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idcampania: campania.id,
          idusuario: userData.colegiado,
          idcandidato: id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("¡Tu voto ha sido registrado correctamente!");
      setVotoSeleccionado(id);
      setHaVotado(true);

      // Actualizar gráfica local
      const nuevos = candidatos.map((c) =>
        c.idusuario === id ? { ...c, votos: (c.votos ?? 0) + 1 } : c
      );

      setCandidatos(nuevos);
    } catch (error: any) {
      alert(error.message || "Error al registrar el voto.");
    }
  };

  const handleVolver = () => navigate("/home-usuario");

  const datosGrafica = candidatos.map(c => ({
    nombre: c.usuario?.nombre || "Desconocido",
    votos: c.votos ?? 0
  }));

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="votacion-container">
      <header className="home-header">
        <div className="header-left">
          <h3>Campaña: {campania ? campania.nombre : "Campaña Desconocida"}</h3>
        </div>
        <div className="header-right">
          <button className="btn-volver" onClick={handleVolver}>
            Volver
          </button>
        </div>
      </header>

      <section className="grafica-section">
        <h2>Resultados Parciales</h2>

        {candidatos.length === 0 ? (
          <p>No hay datos de candidatos disponibles.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={candidatos.map(c => ({
                nombre: c.usuario?.nombre || "Desconocido",
                votos: c.votos ?? 0,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="votos" fill="#1e90ff" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </section>

      <section className="candidatos-section">
        <h2>Candidatos</h2>
        <div className="candidatos-grid">
          {candidatos.map((c) => (
            <div
              key={c.idusuario}
              className={`candidato-card ${votoSeleccionado === c.idusuario ? "seleccionado" : ""}`}
            >
              <h3>{c.usuario?.nombre}</h3>
              <p>{c.descripcion}</p>
              <button
                className="btn-votar"
                onClick={() => handleVotar(c.idusuario)}
                disabled={haVotado}
              >
                {votoSeleccionado === c.idusuario ? "Votado" : "Votar"}
              </button>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default Votacion;
