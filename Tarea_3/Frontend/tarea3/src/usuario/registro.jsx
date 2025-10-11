import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function Registro() {
    const [user, setUser] = useState({
        nombre: "",
        dpi: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/api/registro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.mensaje);
                navigate("/");
            } else {
                alert(data.mensaje);
            }
        } catch (error) {
            alert("Error de conexión con el servidor.");
            console.error(error);
        }
    };

    return (
        <div className="form-card text-center">
            <h3 className="mb-4 fw-bold">Crear Cuenta</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre Completo</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre"
                        value={user.nombre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDPI">
                    <Form.Label>DPI</Form.Label>
                    <Form.Control
                        type="text"
                        name="dpi"
                        placeholder="0000 00000 0000"
                        value={user.dpi}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="ejemplo@correo.com"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="********"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Botón de registro */}
                <Button className="btn-pastel w-100 mb-3" type="submit">
                    Crear Cuenta
                </Button>

                {/* Botón de regreso 
                <Button
                    variant="outline-secondary"
                    className="w-100"
                    style={{
                        borderRadius: "10px",
                        borderColor: "#D1C4E9",
                        color: "#6A5B7F",
                        fontWeight: "500",
                        backgroundColor: "#F3E5F5",
                        transition: "all 0.3s ease",
                    }}
                    onClick={() => navigate("/")}
                >
                    ← Regresar al Login
                </Button>*/}
            </Form>

            <p className="mt-3">
                ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
            </p>
        </div>
    );
}
