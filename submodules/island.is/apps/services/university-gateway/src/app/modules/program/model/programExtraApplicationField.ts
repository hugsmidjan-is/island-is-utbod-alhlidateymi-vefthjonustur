import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger'
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
import { FieldType } from '@island.is/university-gateway'
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'

@Table({
  tableName: 'program_extra_application_field',
})
export class ProgramExtraApplicationField extends Model<
  InferAttributes<ProgramExtraApplicationField>,
  InferCreationAttributes<ProgramExtraApplicationField>
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
    description: 'External key for field',
    example: 'cv_field',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  externalKey!: string

  @ApiProperty({
    description: 'Field name (Icelandic)',
    example: 'Ferilskrá',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nameIs!: string

  @ApiProperty({
    description: 'Field name (English)',
    example: 'CV',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nameEn!: string

  @ApiPropertyOptional({
    description: 'Field description (Icelandic)',
    example: 'Fusce sit amet pellentesque magna.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  descriptionIs?: string

  @ApiPropertyOptional({
    description: 'Field description (English)',
    example: 'Phasellus nisi turpis, rutrum vitae congue sed.',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  descriptionEn?: string

  @ApiProperty({
    description: 'Is this field required?',
    example: true,
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  required!: boolean

  @ApiProperty({
    description:
      'What type of field should be displayed in the application form',
    example: FieldType.UPLOAD,
    enum: FieldType,
  })
  @Column({
    type: DataType.ENUM,
    values: Object.values(FieldType),
    allowNull: false,
  })
  fieldType!: FieldType

  @ApiPropertyOptional({
    description:
      'If field type is UPLOAD, then this field is required and should list up all file types that should be accepted',
    example: '.pdf, .jpg, .jpeg, .png',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  uploadAcceptedFileType?: string

  @ApiPropertyOptional({
    description:
      'If using field type dropdown or testing site, this should be a list of options in selection field, semi-comma separated',
    example: 'Option 1;Option 2;Option 3',
  })
  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  options?: string

  @ApiHideProperty()
  @CreatedAt
  readonly created!: CreationOptional<Date>

  @ApiHideProperty()
  @UpdatedAt
  readonly modified!: CreationOptional<Date>
}
