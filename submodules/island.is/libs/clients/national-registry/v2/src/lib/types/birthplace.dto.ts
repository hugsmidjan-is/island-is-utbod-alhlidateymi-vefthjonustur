import { Faedingarstadur } from '../../../gen/fetch'

export interface BirthplaceDto {
  municipalityNumber: string | null
  locality: string | null
  birthdate: Date
}

export const formatBirthplaceDto = (
  birthplace: Faedingarstadur | null | undefined,
): BirthplaceDto | null => {
  if (birthplace == null) {
    return null
  }

  return {
    birthdate: birthplace.faedingardagur,
    locality: birthplace.stadur ?? null,
    municipalityNumber: birthplace.sveitarfelagsnumer ?? null,
  }
}
