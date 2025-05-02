import { Field, ObjectType } from '@nestjs/graphql'
import { Endorsement } from './endorsement.model'
import { NationalIdError } from './nationalIdError.model'

@ObjectType()
export class EndorsementBulkCreate {
  @Field(() => [Endorsement])
  succeeded!: Endorsement[]

  @Field(() => [NationalIdError])
  failed!: NationalIdError[]
}
