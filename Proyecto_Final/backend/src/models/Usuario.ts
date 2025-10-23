import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Rol } from './Rol.js';

@Table({ tableName: 'usuario', timestamps: false })
export class Usuario extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  colegiado!: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  nombre!: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING(13), allowNull: false, unique: true })
  dpi!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  fechanacimiento!: Date;

  @Column({ type: DataType.STRING(255), allowNull: false })
  contrasena!: string;

  @ForeignKey(() => Rol)
  @Column({ type: DataType.INTEGER, allowNull: false })
  rol!: number;
}
