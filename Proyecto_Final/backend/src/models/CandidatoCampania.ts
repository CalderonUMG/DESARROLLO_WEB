import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";
import { Usuario } from "./Usuario.js";
import { Campania } from "./Campania.js";

@Table({
  tableName: "candidatocampania",
  timestamps: false
})
export class CandidatoCampania extends Model {
  @ForeignKey(() => Campania)
  @Column({
    field: "idcampania",
    type: DataType.INTEGER,
    primaryKey: true
  })
  declare idcampania: number;

  @ForeignKey(() => Usuario)
  @Column({
    field: "idusuario",
    type: DataType.INTEGER,
    primaryKey: true
  })
  declare idusuario: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  declare descripcion: string;

  @BelongsTo(() => Usuario, { foreignKey: "idusuario", as: "usuario" })
  usuario!: Usuario;

  @BelongsTo(() => Campania, { foreignKey: "idcampania", as: "campania" })
  campania!: Campania;
}
