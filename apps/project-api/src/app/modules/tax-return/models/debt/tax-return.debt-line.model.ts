import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'
import { TaxReturnDebtModel } from './tax-return.debt.model'
import { TaxReturnDebtTypeModel } from './tax-return.debt-type.model'

@Table({
  tableName: 'debt_lines',
  timestamps: false,
})
export class TaxReturnDebtLineModel extends Model {
  @Column({
    type: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
    field: 'id',
  })
  id!: string

  @BelongsTo(() => TaxReturnDebtModel, 'debt_id')
  debt!: TaxReturnDebtModel

  @BelongsTo(() => TaxReturnDebtTypeModel, 'debt_type_id')
  debtType!: TaxReturnDebtTypeModel

  // @BelongsTo(() => TaxReturnModel, 'tax_return_id')
  // taxReturn!: TaxReturnModel

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'term',
  })
  term?: number

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
    field: 'origination_date',
  })
  originationDate?: Date

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    field: 'ratio',
  })
  ratio?: number

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'identifier',
  })
  identifier?: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'label',
  })
  label!: string

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    field: 'outstanding_principal',
  })
  outstandingPrincipal!: number

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    field: 'interest_amount',
  })
  interestAmount?: number

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    field: 'annual_total_payment',
  })
  annualTotalPayment?: number

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    field: 'annual_total_principal_payment',
  })
  annualTotalPrincipalPayment?: number

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'creditor_id',
  })
  creditorId?: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'creditor_name',
  })
  creditorName?: string

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    field: 'write_down',
  })
  writeDown?: number

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'ISK',
    field: 'currency',
  })
  currency?: string
}
