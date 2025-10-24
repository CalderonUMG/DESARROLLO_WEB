import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeUsuario.scss";

interface Campania {
  id: number;
  nombre: string;
  descripcion: string;
}

const HomeUsuario: React.FC = () => {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [campanias, setCampanias] = useState<Campania[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarTokenYCargar = async () => {
      const usuario = localStorage.getItem("usuario");
      const token = localStorage.getItem("token");

      if (!usuario || !token) {
        navigate("/login");
        return;
      }

      const userData = JSON.parse(usuario);
      setNombreUsuario(userData.nombre || "Usuario");

      try {
        const res = await fetch("https://desarrollo-web-1nh5.onrender.com/api/auth/verify", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("usuario");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        await cargarCampaniasHabilitadas(token);
      } catch (error) {
        console.error("Error al verificar token:", error);
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verificarTokenYCargar();
  }, [navigate]);

  const cargarCampaniasHabilitadas = async (token: string) => {
    try {
      const response = await fetch("https://desarrollo-web-1nh5.onrender.com/api/campanias/habilitadas", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al obtener campañas habilitadas");

      const data = await response.json();
      setCampanias(data);
    } catch (error) {
      console.error("Error al cargar campañas:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleVotar = (campania: Campania) => {
    navigate("/home-usuario/votacion", { state: { campania } });
  };


  if (loading) return <p>Cargando campañas...</p>;

  return (
    <div className="home-usuario-container">
      <header className="home-header">
        <div className="header-left">
          <h3>Bienvenido, {nombreUsuario}</h3>
        </div>
        <div className="header-right">
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="home-content">
        <h2 className="titulo-principal">Campañas Disponibles</h2>

        {campanias.length > 0 ? (
          <div className="campanias-grid">
            {campanias.map((campania) => (
              <div key={campania.id} className="campania-card">
                <h3>{campania.nombre}</h3>
                <p>{campania.descripcion}</p>
                <button className="btn-votar" onClick={() => handleVotar(campania)}>
                  Votar
                </button>

              </div>
            ))}
          </div>
        ) : (
          <p className="sin-campanias">No hay campañas habilitadas actualmente.</p>
        )}
      </main>
    </div>
  );
};

export default HomeUsuario;
