import { Type } from 'class-transformer'
import { IsString, ValidateIf } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

import { CaseCommentTitle } from './case-comment-title.dto'

export class CaseCommentTask {
  @ApiProperty({
    type: String,
    description:
      'From who or what initied the task, used by client to show who inited the task.',
    example: 'Ármann',
    nullable: true,
  })
  @ValidateIf((o) => o.from !== null)
  @IsString()
  from!: string | null

  @ApiProperty({
    type: String,
    description: 'To whom or what the task is assigned to.',
    example: 'Pálina J',
    nullable: true,
  })
  @ValidateIf((o) => o.to !== null)
  @IsString()
  to!: string | null

  @ApiProperty({
    type: CaseCommentTitle,
    description: 'Title for the task action',
  })
  @Type(() => CaseCommentTitle)
  title!: CaseCommentTitle

  @ApiProperty({
    type: String,
    description: 'The comment itself',
    example:
      'Pálína, getur þú tekið við og staðfest að upplýsingarnar séu réttar?',
    nullable: true,
  })
  @ValidateIf((o) => o.comment !== null)
  @IsString()
  comment!: string | null
}
