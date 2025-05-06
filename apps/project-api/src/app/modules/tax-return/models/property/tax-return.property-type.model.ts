import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'property_types',
  timestamps: false,
})
export class TaxReturnPropertyTypeModel extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    field: 'id',
  })
  id!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'name',
  })
  name!: string
}
