import { useEffect, useState } from 'react';
import api from '../api/api';

function TestConnection() {
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        api.get('/usuarios/ping')
            .then((res) => setMensaje((res.data as any).mensaje))
            .catch(() => setMensaje('Error al conectar con backend'));

    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <h2>Prueba de conexión Backend</h2>
            <p>{mensaje}</p>
        </div>
    );
}

export default TestConnection;
