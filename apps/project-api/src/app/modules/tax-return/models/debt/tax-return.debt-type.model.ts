import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'debt_types',
  timestamps: false,
})
export class TaxReturnDebtTypeModel extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string
}
