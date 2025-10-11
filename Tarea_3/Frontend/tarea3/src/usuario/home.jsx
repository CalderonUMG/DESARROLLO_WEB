import { useUser } from "../context/context";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();           // Limpia la sesión del contexto
        navigate("/");      // Redirige al login
    };



    return (
        <>
            <header
                className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm"
                style={{
                    backgroundColor: "#F3E5F5",
                    borderBottom: "1px solid #D1C4E9",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 1000,
                }}
            >
                <h4 className="m-0">
                    <strong>INICIO</strong>
                </h4>

                {user ? (
                    <div>
                        <span className="me-3">Bienvendi@, {user.nombre}</span>
                        <button
                            className="btn btn-sm"
                            style={{
                                backgroundColor: "#FFB6C1",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "500",
                                padding: "4px 10px",
                            }}
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                ) : (
                    <span className="text-muted">No has iniciado sesión</span>
                )}
            </header>
            <div
                className="container text-center"
                style={{
                    marginTop: "100px",
                }}
            >
                <h2>
                    Bienvenido {user?.nombre || "Invitado"}
                </h2>
            </div>
        </>
    );
}
