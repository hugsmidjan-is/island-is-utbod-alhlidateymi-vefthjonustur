import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'
import { NationalRegistryAddressModel } from './national-registry.address.model'

@Table({
  tableName: 'th_people',
  timestamps: false,
})
export class NationalRegistryPersonModel extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
    field: 'national_id',
  })
  nationalId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phonenumber!: string

  @BelongsTo(() => NationalRegistryAddressModel, 'address_id')
  address!: NationalRegistryAddressModel
}
