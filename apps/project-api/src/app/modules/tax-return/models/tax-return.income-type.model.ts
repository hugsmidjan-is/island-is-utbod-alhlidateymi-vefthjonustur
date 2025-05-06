import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'income_types',
  timestamps: false,
})
export class TaxReturnIncomeTypeModel extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    field: 'id',
  })
  id!: string

  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  code!: string

  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  name!: string
}
