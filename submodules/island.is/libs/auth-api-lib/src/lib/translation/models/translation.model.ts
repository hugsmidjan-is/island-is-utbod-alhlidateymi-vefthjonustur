import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
  PrimaryKey,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface ModelAttributes {
  language: string
  className: string
  key: string
  property: string
  value?: string
  created: Date
  modified: Date
}

type CreationAttributes = Omit<ModelAttributes, 'created' | 'modified'>

@Table({
  tableName: 'translation',
  indexes: [
    {
      fields: ['language', 'class_name', 'key', 'property'],
    },
  ],
})
export class Translation extends Model<ModelAttributes, CreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  @ApiProperty()
  language!: string

  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  @ApiProperty()
  className!: string

  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  @ApiProperty()
  key!: string

  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  @ApiProperty()
  property!: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty()
  value?: string

  @CreatedAt
  @ApiProperty()
  readonly created!: Date

  @UpdatedAt
  @ApiProperty()
  readonly modified?: Date
}
