import { ObjectType, Field } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class PageInfoDto {
  @Field()
  @ApiProperty({ example: true })
  hasNextPage!: boolean

  @Field({ nullable: true })
  @ApiProperty({ example: false })
  hasPreviousPage?: boolean

  @Field({ nullable: true })
  @ApiProperty({
    example: 'MTpwYWdl',
  })
  startCursor?: string

  @Field({ nullable: true })
  @ApiProperty({
    example: 'MTA6cGFnZQ==',
  })
  endCursor?: string
}
