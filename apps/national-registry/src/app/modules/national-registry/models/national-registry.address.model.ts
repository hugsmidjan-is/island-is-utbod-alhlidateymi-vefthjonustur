import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'th_address',
  timestamps: false,
})
export class NationalRegistryAddressModel extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  id!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'postal_code',
  })
  postalCode!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city!: string
}
