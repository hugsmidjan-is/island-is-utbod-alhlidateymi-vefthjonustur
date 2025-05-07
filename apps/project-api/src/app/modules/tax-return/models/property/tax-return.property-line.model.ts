import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'
import { TaxReturnPropertyModel } from './tax-return.property.model'
import { TaxReturnPropertyTypeModel } from './tax-return.property-type.model'

@Table({
  tableName: 'property_lines',
  timestamps: false,
})
export class TaxReturnPropertyLineModel extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    field: 'id',
  })
  id!: string

  @BelongsTo(() => TaxReturnPropertyModel, 'property_id')
  property!: TaxReturnPropertyModel

  // @Column({
  //   type: DataType.UUID,
  //   allowNull: false,
  //   field: 'property_id',
  // })
  // propertyId!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'label',
  })
  label!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'identifier',
  })
  identifier!: string

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: 'value',
  })
  value!: number

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'ISK',
    field: 'currency',
  })
  currency?: string

  @BelongsTo(() => TaxReturnPropertyTypeModel, 'property_type_id')
  propertyType!: TaxReturnPropertyTypeModel

  // @Column({
  //   type: DataType.UUID,
  //   allowNull: false,
  //   field: 'property_type_id',
  // })
  // propertyTypeId!: string
}
