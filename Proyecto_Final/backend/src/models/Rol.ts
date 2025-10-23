import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'rol', timestamps: false })
export class Rol extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  nombre!: string;
}
