const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

let usuarios = [];

app.post('/api/registro', (req, res) => {
    const {
        nombre,
        dpi,
        email,
        password
    } = req.body;

    // Validaciones básicas
    if (!nombre || !dpi || !email || !password) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios.'
        });
    }

    // Validar que el correo no esté repetido
    const correoExistente = usuarios.find(u => u.email === email);
    if (correoExistente) {
        return res.status(400).json({
            mensaje: 'El correo electrónico ya está registrado.'
        });
    }

    // Crear usuario nuevo
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        dpi,
        email,
        password,
    };

    usuarios.push(nuevoUsuario);
    console.log('Nuevo usuario registrado:', nuevoUsuario);

    res.status(201).json({
        mensaje: `Usuario ${nombre} registrado correctamente.`,
        totalUsuarios: usuarios.length,
    });
});


app.get('/api/usuarios', (req, res) => {
    res.json(usuarios);
});


app.post('/api/login', (req, res) => {
    const {
        email,
        password
    } = req.body;

    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (!usuario) {
        return res.status(401).json({
            mensaje: 'Credenciales incorrectas.'
        });
    }

    // Enviar los datos del usuario al frontend
    res.json({
        mensaje: `Bienvenido ${usuario.nombre}`,
        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            dpi: usuario.dpi,
        },
    });
});

// Ruta: Limpiar memoria (opcional)
app.delete('/api/usuarios', (req, res) => {
    usuarios = [];
    res.json({
        mensaje: 'Usuarios eliminados de la memoria.'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});