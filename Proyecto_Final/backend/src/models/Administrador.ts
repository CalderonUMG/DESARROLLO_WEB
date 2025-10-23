import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Usuario } from './Usuario.js';
import { Rol } from './Rol.js';

@Table({ tableName: 'administrador', timestamps: false })
export class Administrador extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: false })
  idUsuario!: number;

  @ForeignKey(() => Rol)
  @Column({ type: DataType.INTEGER, allowNull: false })
  rol!: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  fechaCreacion!: Date;
}
