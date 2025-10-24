import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database.js';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuario.routes.js';
import authRoutes from "./routes/auth.routes.js";
import campaniaRoutes from "./routes/campania.routes.js";
import candidatoCampaniaRoutes from "./routes/candidatocampania.routes.js";
import votacionRoutes from "./routes/votacion.routes.js";


dotenv.config();

const app = express();

//CORS
app.use(cors({
  origin: 'https://desarrollo-web-1-nrm7.onrender.com', // dominio del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/campanias", campaniaRoutes);
app.use("/api/candidatos", candidatoCampaniaRoutes);
app.use("/api/votacion", votacionRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
  } catch (error) {
    console.error("Error al conectar a la BD:", error);
  }
})();


