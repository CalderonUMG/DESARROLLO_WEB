import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavbarAdmin.scss";
import logo from '../../assets/logo.png';

interface PanelNavbarProps {
  tipo?: "admin" | "usuario";
}

const PanelNavbar: React.FC<PanelNavbarProps> = ({ tipo = "admin" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [nombreUsuario, setNombreUsuario] = useState<string>("");

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      const data = JSON.parse(usuario);
      setNombreUsuario(data.nombre || "Usuario");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navigateTo = (path: string) => navigate(path);

  return (
    <header className="panel-navbar">
      <div className="panel-navbar__top">
        <div className="navbar__logo">
          <img src={logo} alt="Logo Colegio de Ingenieros" />
          <span className="panel-navbar__user">Bienvenido, {nombreUsuario}</span>
        </div>

        <button className="panel-navbar__logout" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      {tipo === "admin" && (
        <nav className="panel-navbar__menu">
          <button
            className={location.pathname.includes("/campanias") ? "active" : ""}
            onClick={() => navigateTo("/admin/campanias")}
          >
            Campañas
          </button>

          <button
            className={location.pathname.includes("/candidatos") ? "active" : ""}
            onClick={() => navigateTo("/admin/candidatos")}
          >
            Candidatos
          </button>
          <button
            className={location.pathname.includes("/votacionesAdmin") ? "active" : ""}
            onClick={() => navigateTo("/admin/votacionesAdmin")}
          >
            Votaciones
          </button>
        </nav>
      )}
    </header>
  );
};

export default PanelNavbar;
