import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import { TaxReturnModel } from '../tax-return.tax-return.model'
import { TaxReturnDebtLineModel } from './tax-return.debt-line.model'

@Table({
  tableName: 'debt',
})
export class TaxReturnDebtModel extends Model {
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

  @HasMany(() => TaxReturnDebtLineModel, 'debt_id')
  debtLines!: TaxReturnDebtLineModel[]
}
