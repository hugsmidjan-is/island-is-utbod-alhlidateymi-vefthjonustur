import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'
import { TaxReturnIncomeTypeModel } from './tax-return.income-type.model'
import { TaxReturnModel } from '../tax-return.tax-return.model'
import { TaxReturnIncomeModel } from './tax-return.income.model'

@Table({
  tableName: 'income_lines',
  timestamps: false,
})
export class TaxReturnIncomeLineModel extends Model {
  @Column({
    type: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
    field: 'id',
  })
  id!: string

  @BelongsTo(() => TaxReturnIncomeModel, 'income_id')
  income!: TaxReturnIncomeModel

  @BelongsTo(() => TaxReturnIncomeTypeModel, 'income_type_id')
  incomeType!: TaxReturnIncomeTypeModel

  // @BelongsTo(() => TaxReturnModel, 'tax_return_id')
  // taxReturn!: TaxReturnModel

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  label!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  payer?: string

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  value!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'ISK',
  })
  currency!: string
}
