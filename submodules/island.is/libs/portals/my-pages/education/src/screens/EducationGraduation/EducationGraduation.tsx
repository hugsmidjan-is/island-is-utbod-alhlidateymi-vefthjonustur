import { defineMessage } from 'react-intl'
import { AlertMessage, Box, Stack } from '@island.is/island-ui/core'
import { useLocale, useNamespaces } from '@island.is/localization'
import {
  ActionCard,
  CardLoader,
  IntroHeader,
  IntroWrapper,
  m,
} from '@island.is/portals/my-pages/core'
import { isDefined } from '@island.is/shared/utils'
import { EducationPaths } from '../../lib/paths'
import { Problem } from '@island.is/react-spa/shared'
import { useStudentInfoQuery } from './EducationGraduation.generated'
import { useMemo } from 'react'
import { mapUniversityToSlug } from '../../utils/mapUniversitySlug'

export const EducationGraduation = () => {
  useNamespaces('sp.education-graduation')
  const { lang, formatMessage } = useLocale()

  const { loading, error, data } = useStudentInfoQuery({
    variables: {
      input: {
        locale: lang,
      },
    },
  })

  const errors = data?.universityCareersStudentTrackHistory?.errors
  const transcripts = data?.universityCareersStudentTrackHistory?.transcripts

  const errorString = useMemo(() => {
    if (errors) {
      return errors
        .map((e) => e.institution.displayName)
        .filter(isDefined)
        .join(', ')
    }
  }, [errors])

  return (
    <IntroWrapper
      title={m.educationGraduation}
      intro={defineMessage({
        id: 'sp.education-graduation:education-graduation-intro',
        defaultMessage:
          'Hér getur þú fundið yfirlit yfir brautskráningar frá háskólanámi frá árinu 2015.',
        description: 'education graduation intro',
      })}
    >
      {!!errors?.length && !error && !loading && (
        <Box marginBottom={2}>
          <AlertMessage
            type="warning"
            title={formatMessage(m.couldNotFetchAllItems)}
            message={formatMessage(m.couldNotFetchAllItemsDetail, {
              arg: errorString,
            })}
          />
        </Box>
      )}
      {error && !loading && <Problem error={error} noBorder={false} />}
      {loading && !error && <CardLoader />}
      {!loading && !error && !transcripts?.length && !errors?.length && (
        <Box marginTop={8}>
          <Problem
            type="no_data"
            noBorder={false}
            title={formatMessage(m.noData)}
            message={formatMessage(m.noDataFoundDetail)}
            imgSrc="./assets/images/sofa.svg"
          />
        </Box>
      )}
      <Stack space={2}>
        {!!transcripts?.length &&
          transcripts?.map((item, index) => {
            if (!item.institution.id) {
              return null
            }
            return (
              <ActionCard
                key={`education-graduation-${index}`}
                heading={
                  item.studyProgram && item.degree
                    ? `${item.studyProgram} - ${item.degree}`
                    : item.institution.displayName ?? undefined
                }
                text={item.faculty}
                subText={
                  item.studyProgram && item.degree
                    ? item.institution.displayName ?? undefined
                    : undefined
                }
                cta={{
                  label: defineMessage({
                    id: 'sp.education-graduation:details',
                    defaultMessage: 'Skoða',
                  }).defaultMessage,
                  variant: 'text',
                  url:
                    item?.trackNumber && item?.institution?.id
                      ? EducationPaths.EducationHaskoliGraduationDetail.replace(
                          ':id',
                          item.trackNumber.toString(),
                        ).replace(
                          ':uni',
                          mapUniversityToSlug(item.institution.id),
                        )
                      : '',
                }}
                image={
                  item.institution?.logoUrl
                    ? {
                        type: 'image',
                        url: item.institution.logoUrl,
                      }
                    : undefined
                }
              />
            )
          })}
      </Stack>
    </IntroWrapper>
  )
}

export default EducationGraduation
