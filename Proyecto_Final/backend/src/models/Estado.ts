import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'estado', timestamps: false })
export class Estado extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  nombre!: string;
}
