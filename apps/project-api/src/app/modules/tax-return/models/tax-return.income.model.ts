import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import { TaxReturnIncomeTypeModel } from './tax-return.income-type.model'
import { TaxReturnModel } from './tax-return.tax-return.model'
import { TaxReturnIncomeLine } from '../dto/tax-return.income-line.dto'
import { TaxReturnIncomeLineModel } from './tax-return.income-line.model'

@Table({
  tableName: 'income',
})
export class TaxReturnIncomeModel extends Model {
  @Column({
    type: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
    field: 'id',
  })
  id!: string

  @Column({
    type: DataType.ENUM('prefill', 'submit'),
    allowNull: false,
  })
  type!: 'prefill' | 'submit'

  // @BelongsTo(() => TaxReturnIncomeTypeModel, 'income_type_id')
  // incomeType!: TaxReturnIncomeTypeModel

  @BelongsTo(() => TaxReturnModel, 'tax_return_id')
  taxReturn!: TaxReturnModel

  @HasMany(() => TaxReturnIncomeLineModel, 'income_id')
  incomeLines!: TaxReturnIncomeLineModel[]
}
