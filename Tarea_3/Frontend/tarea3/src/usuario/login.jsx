import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUser } from "../context/context"; 

export default function Login() {
  const { login } = useUser(); // función para guardar el usuario
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://desarrollo-web-1nh5.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar sesión en el contexto
        login(data.usuario);
       // alert(`Bienvenido ${data.usuario.nombre}!`);
        navigate("/home"); // Redirigir a otra página
      } else {
        alert(`${data.mensaje}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="form-card text-center">
      <h3 className="mb-4 fw-bold">Iniciar Sesión</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="ejemplo@correo.com"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="********"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button className="btn-pastel w-100" type="submit">
          Iniciar Sesión
        </Button>
      </Form>

      <p className="mt-3">
        ¿No tienes cuenta? <Link to="/registro">Crear una cuenta</Link>
      </p>
    </div>
  );
}
