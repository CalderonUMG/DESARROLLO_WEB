import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Estado } from './Estado.js';
import { Administrador } from './Administrador.js';

@Table({ tableName: 'campania', timestamps: false })
export class Campania extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  nombre!: string;

  @Column({ type: DataType.TEXT })
  descripcion!: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  cantidadvotos!: number;

  @ForeignKey(() => Estado)
  @Column({ type: DataType.INTEGER, allowNull: false })
  estado!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  fechainicio!: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  fechafin!: Date;

  @ForeignKey(() => Administrador)
  @Column({ type: DataType.INTEGER, allowNull: false })
  admincreacion!: number;
}
