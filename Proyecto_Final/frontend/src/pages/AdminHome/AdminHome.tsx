import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavbarAdmin/NavbarAdmin";
import "./AdminHome.scss";

const AdminHome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const verificarToken = async () => {
      try {
        const response = await fetch("https://desarrollo-web-1nh5.onrender.com/api/auth/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error al verificar token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
      }
    };

    verificarToken();
  }, [navigate]);

  return (
    <div className="admin-home">
      <main className="admin-content">
        <div className="admin-card">
          <h2>Panel de Administración</h2>
          <p>
            Desde este panel podrás gestionar las campañas, registrar candidatos,
            administrar votaciones y generar reportes del sistema de votación del{" "}
            <strong>Colegio de Ingenieros de Guatemala</strong>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
