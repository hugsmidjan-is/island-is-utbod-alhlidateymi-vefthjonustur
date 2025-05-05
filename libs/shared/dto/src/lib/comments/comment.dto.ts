import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'

import { CaseActionEnum } from '../cases/case-constants'
import { CaseStatus } from '../cases/case-status.dto'
import { BaseEntity } from '../entity'

export class CommentCreatorDto extends OmitType(BaseEntity, [
  'slug',
] as const) {}

export class CommentReceiverDto extends OmitType(BaseEntity, [
  'slug',
] as const) {}

export class CommentDto {
  @ApiProperty({
    type: String,
    description: 'The id of the comment',
  })
  id!: string

  @ApiProperty({
    type: String,
    description:
      'ISO string representation of the date the comment was created',
  })
  created!: string

  @ApiProperty({
    enum: CaseActionEnum,
    enumName: 'CaseActionEnum',
    description: 'The action that created the comment',
  })
  action!: CaseActionEnum

  @ApiProperty({
    type: CaseStatus,
    description: 'The status of the case when the comment was created',
  })
  caseStatus!: CaseStatus

  @ApiProperty({
    type: CommentCreatorDto,
    description: 'The creator of the comment',
  })
  creator!: CommentCreatorDto

  @ApiProperty({
    type: CommentReceiverDto,
    nullable: true,
    description: 'The receiver of the comment',
  })
  receiver!: CommentReceiverDto | null

  @ApiProperty({
    type: String,
    description: 'The comment',
    nullable: true,
  })
  comment!: string | null
}

class CommentFields {
  @ApiProperty({
    type: String,
    description:
      'Should be passed if the comment is created by an application user',
  })
  applicationUserCreatorId!: string

  @ApiProperty({
    type: String,
    description:
      'Should be passed when an admin user is responsible for the action taken',
  })
  adminUserCreatorId!: string

  @ApiProperty({
    type: String,
    description:
      'Should be passed when an institution is responsible for the action taken',
  })
  institutionCreatorId!: string

  @ApiProperty({
    type: String,
    description:
      'Should be passed when an case status is receiving the action taken',
  })
  caseStatusReceiverId!: string

  @ApiProperty({
    type: String,
    description:
      'Should be passed when an admin user is receiving the action taken',
  })
  adminUserReceiverId!: string

  @ApiProperty({
    type: String,
  })
  comment?: string
}

export class SubmitCommentBody extends PickType(CommentFields, [
  'institutionCreatorId',
]) {}

export class AssignUserCommentBody extends PickType(CommentFields, [
  'adminUserCreatorId',
  'adminUserReceiverId',
]) {}

export class AssignSelfCommentBody extends PickType(CommentFields, [
  'adminUserCreatorId',
]) {}

export class UpdateStatusCommentBody extends PickType(CommentFields, [
  'adminUserCreatorId',
  'caseStatusReceiverId',
]) {}

export class InternalCommentBody extends PickType(CommentFields, [
  'adminUserCreatorId',
  'comment',
]) {}

export class InternalCommentBodyDto extends PickType(CommentFields, [
  'comment',
]) {}

export class ExternalCommentBody extends PickType(CommentFields, [
  'adminUserCreatorId',
  'comment',
]) {}

export class ExternalCommentBodyDto extends PickType(CommentFields, [
  'comment',
]) {}

export class ApplicationCommentBody extends PickType(CommentFields, [
  'applicationUserCreatorId',
  'comment',
]) {}

export class GetComment {
  @ApiProperty({
    type: CommentDto,
  })
  comment!: CommentDto
}

export class GetComments {
  @ApiProperty({
    type: [CommentDto],
  })
  comments!: CommentDto[]
}

export class GetCommentsQuery {
  @ApiProperty({
    enum: [CaseActionEnum],
    required: false,
  })
  action?: CaseActionEnum[]
}
