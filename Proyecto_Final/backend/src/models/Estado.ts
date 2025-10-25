import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Campania } from "./Campania.js";

@Table({ tableName: 'estado', timestamps: false })
export class Estado extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  nombre!: string;

  @HasMany(() => Campania)
  campanias!: Campania[];
}
