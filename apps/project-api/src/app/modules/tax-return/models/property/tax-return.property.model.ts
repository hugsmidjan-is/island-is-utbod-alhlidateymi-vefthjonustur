import { TaxReturnModel } from '../tax-return.tax-return.model'
import { TaxReturnPropertyLineModel } from './tax-return.property-line.model'

import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'

@Table({
  tableName: 'property',
})
export class TaxReturnPropertyModel extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    field: 'id',
  })
  id!: string

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'created',
  })
  created!: Date

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'modified',
  })
  modified!: Date

  @Column({
    type: DataType.ENUM('prefill', 'submit'),
    allowNull: false,
  })
  type!: 'prefill' | 'submit'

  @BelongsTo(() => TaxReturnModel, 'tax_return_id')
  taxReturn!: TaxReturnModel

  @HasMany(() => TaxReturnPropertyLineModel, 'property_id')
  propertyLines!: TaxReturnPropertyLineModel[]
}
