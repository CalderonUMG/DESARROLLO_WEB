import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import pkg from "pg";
const { Pool } = pkg;
import { Rol } from '../models/Rol.js';
import { Usuario } from '../models/Usuario.js';
import { Estado } from '../models/Estado.js';
import { Administrador } from '../models/Administrador.js';
import { Campania } from '../models/Campania.js';
import { CandidatoCampania } from '../models/CandidatoCampania.js';
import { UsuarioVoto } from '../models/UsuarioVoto.js';

dotenv.config();

/**
 * Función auxiliar para obtener variables de entorno de forma segura
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`❌ Falta la variable de entorno: ${name}`);
  return value;
}

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: requireEnv('DB_HOST'),
  port: Number(requireEnv('DB_PORT')),
  username: requireEnv('DB_USER'),
  password: requireEnv('DB_PASS'),
  database: requireEnv('DB_NAME'),
  models: [Rol, Usuario, Estado, Administrador, Campania, CandidatoCampania, UsuarioVoto],
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});