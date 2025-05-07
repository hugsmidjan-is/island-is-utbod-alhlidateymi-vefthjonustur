import { fi } from 'date-fns/locale'
import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'tax_return',
})
export class TaxReturnModel extends Model {
  @Column({
    type: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'person_id',
  })
  nationalId!: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year!: number

  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: 'submit' | 'prefill'

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'submitted_at',
  })
  submittedAt?: Date
}
