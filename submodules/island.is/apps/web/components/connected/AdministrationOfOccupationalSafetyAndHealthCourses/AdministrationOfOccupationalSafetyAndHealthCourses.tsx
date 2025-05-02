import { useState } from 'react'
import { useIntl } from 'react-intl'
import { useQuery } from '@apollo/client/react'

import {
  AlertMessage,
  Box,
  FocusableBox,
  LoadingDots,
  Tag,
  Text,
} from '@island.is/island-ui/core'
import { BorderAbove } from '@island.is/web/components'
import { ConnectedComponent, Query } from '@island.is/web/graphql/schema'
import { useDateUtils } from '@island.is/web/i18n/useDateUtils'
import { extractHeadingLevels } from '@island.is/web/utils/navigation'

import { GET_ADMINISTRATION_OF_SAFETY_AND_HEALTH_COURSES_QUERY } from './queries'
import { translation as translationStrings } from './translation.strings'
import { getCurrencyString, parseDateString } from './utils'

const normalizesAndMatch = (value1: string, value2: string) => {
  return value1.toLowerCase().trim().includes(value2.toLowerCase().trim())
}

interface AdministrationOfOccupationalSafetyAndHealthCoursesProps {
  slice: ConnectedComponent
}

type ListState = 'loading' | 'loaded' | 'error'

const AdministrationOfOccupationalSafetyAndHealthCourses = ({
  slice,
}: AdministrationOfOccupationalSafetyAndHealthCoursesProps) => {
  const { format } = useDateUtils()
  const { formatMessage } = useIntl()

  const title = slice.json?.title ?? null
  const hasBorderAbove = slice.configJson?.hasBorderAbove ?? false
  const { titleHeading } = extractHeadingLevels(slice.configJson ?? {})

  const [listState, setListState] = useState<ListState>('loading')
  const [courses, setCourses] = useState<
    Query['administrationOfOccupationalSafetyAndHealthCourses']['courses']
  >([])

  useQuery<Query>(GET_ADMINISTRATION_OF_SAFETY_AND_HEALTH_COURSES_QUERY, {
    onCompleted: (data) => {
      const fetchedCourses = [
        ...(data?.administrationOfOccupationalSafetyAndHealthCourses.courses ??
          []),
      ]
      setCourses(
        fetchedCourses.filter((fetchedCourses) => {
          const category = slice.configJson?.category
          const subCategory = slice.configJson?.subCategory

          if (category && subCategory) {
            return (
              normalizesAndMatch(fetchedCourses.category, category) &&
              normalizesAndMatch(fetchedCourses.subCategory, subCategory)
            )
          }

          if (category) {
            return normalizesAndMatch(fetchedCourses.category, category)
          }

          if (subCategory) {
            return normalizesAndMatch(fetchedCourses.subCategory, subCategory)
          }

          return fetchedCourses
        }),
      )
      setListState('loaded')
    },
    onError: () => {
      setListState('error')
    },
  })

  return (
    <Box id={slice.id}>
      {hasBorderAbove && <BorderAbove />}
      {title && (
        <Text variant="h2" as={titleHeading}>
          {title}
        </Text>
      )}
      {listState === 'loading' && (
        <Box
          display="flex"
          marginTop={4}
          marginBottom={20}
          justifyContent="center"
        >
          <LoadingDots />
        </Box>
      )}
      {listState === 'error' && (
        <AlertMessage
          title={formatMessage(translationStrings.errorTitle)}
          message={formatMessage(translationStrings.errorMessage)}
          type="error"
        />
      )}

      {listState === 'loaded' && courses.length === 0 && (
        <Box display="flex" marginTop={4} justifyContent="center">
          <Text variant="h3">
            {formatMessage(translationStrings.noResults)}
          </Text>
        </Box>
      )}
      {listState === 'loaded' && courses.length > 0 && (
        <Box>
          <Box paddingTop={[4, 4, 6]} paddingBottom={[4, 5, 10]}>
            {courses.map((course, index) => {
              const dateFormat = 'dd.MMM'

              let dateFrom = format(
                parseDateString(course.dateFrom),
                dateFormat,
              )
              if (dateFrom.endsWith('.')) {
                dateFrom = dateFrom.slice(0, dateFrom.length - 1)
              }

              let dateTo = format(parseDateString(course.dateTo), dateFormat)
              if (dateTo.endsWith('.')) {
                dateTo = dateTo.slice(0, dateTo.length - 1)
              }

              return (
                <FocusableBox
                  key={`course-${index}`}
                  href={course.registrationUrl}
                  borderRadius="large"
                  borderColor="blue200"
                  borderWidth="standard"
                  flexDirection="column"
                  color="blue"
                  marginBottom={4}
                  paddingX={4}
                  paddingY={3}
                >
                  <Box
                    alignItems="flexStart"
                    display="flex"
                    flexDirection={[
                      'columnReverse',
                      'columnReverse',
                      'columnReverse',
                      'columnReverse',
                      'row',
                    ]}
                    justifyContent="spaceBetween"
                    marginBottom={2}
                  >
                    <Text variant="h3" color={'blue400'}>
                      {course.name}
                    </Text>
                    <Box marginBottom={[2, 2, 2, 2]}>
                      <Tag disabled>{course.location}</Tag>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection={['column', 'column', 'column', 'row']}
                  >
                    <Box style={{ flex: '0 0 50%' }}>
                      <Text>
                        {formatMessage(translationStrings.validPeriodLabel)}:{' '}
                        {dateFrom !== dateTo
                          ? dateFrom + ' - ' + dateTo
                          : dateFrom}
                      </Text>
                      <Text paddingBottom={2}>
                        {formatMessage(translationStrings.time)}: {course.time}
                      </Text>
                    </Box>

                    <Box paddingLeft={[0, 0, 0, 2]}>
                      <Text>
                        {formatMessage(translationStrings.price)}:{' '}
                        {getCurrencyString(course.price || 0)}
                      </Text>
                    </Box>
                  </Box>
                </FocusableBox>
              )
            })}
          </Box>
        </Box>
      )}
    </Box>
  )
}
export default AdministrationOfOccupationalSafetyAndHealthCourses
