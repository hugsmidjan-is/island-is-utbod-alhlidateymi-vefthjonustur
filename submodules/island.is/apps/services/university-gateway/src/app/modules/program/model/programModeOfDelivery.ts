import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import { Program } from './program'
import { ModeOfDelivery } from '@island.is/university-gateway'
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'

@Table({
  tableName: 'program_mode_of_delivery',
})
export class ProgramModeOfDelivery extends Model<
  InferAttributes<ProgramModeOfDelivery>,
  InferCreationAttributes<ProgramModeOfDelivery>
> {
  @ApiHideProperty()
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id!: CreationOptional<string>

  @ApiHideProperty()
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @ForeignKey(() => Program)
  programId!: string

  @ApiHideProperty()
  @BelongsTo(() => Program, 'programId')
  program?: Program

  @ApiProperty({
    description: 'Modes of deliveries available for the program',
    example: ModeOfDelivery.ON_SITE,
    enum: ModeOfDelivery,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(ModeOfDelivery),
    allowNull: false,
  })
  modeOfDelivery!: ModeOfDelivery

  @ApiHideProperty()
  @CreatedAt
  readonly created!: CreationOptional<Date>

  @ApiHideProperty()
  @UpdatedAt
  readonly modified!: CreationOptional<Date>
}
