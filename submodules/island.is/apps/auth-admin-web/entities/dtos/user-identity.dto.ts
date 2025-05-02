import { ClaimDTO } from './claim.dto'

export class UserIdentityDTO {
  constructor() {
    this.subjectId = ''
    this.name = ''
    this.providerName = ''
    this.active = true
    this.providerSubjectId = ''
    this.claims = []
  }
  subjectId: string
  name: string
  providerName: string
  active: boolean
  providerSubjectId: string
  claims: ClaimDTO[]
}
