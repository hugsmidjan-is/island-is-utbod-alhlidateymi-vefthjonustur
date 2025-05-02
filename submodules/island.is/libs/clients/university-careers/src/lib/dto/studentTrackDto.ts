import {
  BifrostStudentTrack,
  HolarStudentTrack,
  LbhiStudentTrack,
  UnakStudentTrack,
  HIStudentTrack,
} from '../clients'
import { UniversityId } from '../universityCareers.types'
import {
  StudentTrackInstitutionDto,
  mapToStudentTrackInstitutionDto,
} from './studentTrackInstitutionDto'

export interface StudentTrackDto {
  name?: string
  nationalId?: string
  graduationDate?: Date
  trackNumber?: number
  institution?: StudentTrackInstitutionDto
  school?: string
  faculty?: string
  studyProgram?: string
  degree?: string
  programId?: string
}

export const mapToStudentTrackDto = (
  transcript:
    | HolarStudentTrack
    | LbhiStudentTrack
    | BifrostStudentTrack
    | UnakStudentTrack
    | HIStudentTrack,
  institutionId: UniversityId,
): StudentTrackDto | null => {
  if (!transcript.graduationDate) {
    return null
  }

  const institution = mapToStudentTrackInstitutionDto(
    institutionId,
    transcript.institution,
  )

  return {
    ...transcript,
    institution,
    graduationDate: new Date(transcript.graduationDate),
  }
}
