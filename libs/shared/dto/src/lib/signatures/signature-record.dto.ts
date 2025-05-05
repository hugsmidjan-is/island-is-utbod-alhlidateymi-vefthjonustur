import { ApiProperty, PartialType, PickType } from '@nestjs/swagger'

import { CreateSignatureMember, SignatureMember } from './signature-member.dto'

export class SignatureRecord {
  @ApiProperty({
    type: String,
  })
  id!: string

  @ApiProperty({
    type: String,
  })
  institution!: string

  @ApiProperty({
    type: String,
  })
  signatureDate!: string

  @ApiProperty({
    type: String,
    nullable: true,
  })
  additional!: string | null

  @ApiProperty({
    type: SignatureMember,
    nullable: true,
  })
  chairman!: SignatureMember | null

  @ApiProperty({
    type: [SignatureMember],
  })
  members!: SignatureMember[]
}

export class CreateSignatureRecord {
  @ApiProperty({
    type: String,
    required: true,
  })
  institution!: string

  @ApiProperty({
    type: String,
    required: true,
  })
  signatureDate!: string

  @ApiProperty({
    type: String,
    required: false,
  })
  additional?: string

  @ApiProperty({
    type: CreateSignatureMember,
    required: false,
  })
  chairman?: CreateSignatureMember

  @ApiProperty({
    type: [CreateSignatureMember],
    required: true,
  })
  members!: CreateSignatureMember[]
}

export class UpdateSignatureRecord extends PartialType(
  PickType(CreateSignatureRecord, [
    'institution',
    'signatureDate',
    'additional',
  ]),
) {}
