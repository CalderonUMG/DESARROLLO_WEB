import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from "sequelize-typescript";
import { Usuario } from "./Usuario.js";
import { CandidatoCampania } from "./CandidatoCampania.js";

@Table({
  tableName: "usuariovoto",
  timestamps: false
})
export class UsuarioVoto extends Model {
  @ForeignKey(() => Usuario)
  @Column({
    field: "idusuario",
    type: DataType.INTEGER,
    primaryKey: true
  })
  declare idusuario: number;

  @Column({
    field: "idcandidatocampaniacampania",
    type: DataType.INTEGER,
    primaryKey: true
  })
  declare idcandidatocampaniacampania: number;

  @Column({
    field: "idcandidatocampaniausuario",
    type: DataType.INTEGER,
    primaryKey: true
  })
  declare idcandidatocampaniausuario: number;

  @BelongsTo(() => Usuario, { foreignKey: "idusuario", as: "usuario" })
  usuario!: Usuario;

  @BelongsTo(() => CandidatoCampania, {
    foreignKey: "idcandidatocampaniacampania",
    targetKey: "idcampania",
    as: "campania"
  })
  campania!: CandidatoCampania;

  @BelongsTo(() => CandidatoCampania, {
    foreignKey: "idcandidatocampaniausuario",
    targetKey: "idusuario",
    as: "candidato"
  })
  candidato!: CandidatoCampania;
}
