import {
  ApplicationPagination,
  ApplicationState,
} from '@island.is/financial-aid/shared/lib'
import { useLazyQuery } from '@apollo/client'
import { ApplicationFilterQuery } from '../../graphql'
import { Filters } from './useFilter'
import { NextRouter } from 'next/router'
import isSameDay from 'date-fns/isSameDay'
import formatISO from 'date-fns/formatISO'

const useApplicationFilter = (
  router: NextRouter,
  statesOnRoute: ApplicationState[],
  setFilterApplications: React.Dispatch<
    React.SetStateAction<ApplicationPagination | undefined>
  >,
) => {
  const [getApplications, { error, loading }] = useLazyQuery<{
    filterApplications: ApplicationPagination
  }>(ApplicationFilterQuery, {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  })

  const formatDateForQuery = (date: Date) => {
    return formatISO(date, {
      representation: 'date',
    })
  }

  const filterTable = async (filters: Filters, currentPage: number) => {
    const { applicationState, staff, period } = filters
    const query = new URLSearchParams()
    query.append('page', currentPage.toString())

    if (applicationState.length > 0) {
      query.append('state', applicationState.join(','))
    }

    if (staff.length > 0) {
      query.append('staff', staff.join(','))
    }

    if (period.from) {
      query.append('periodFrom', formatDateForQuery(period.from))
    }
    if (period.to && !isSameDay(period.to, new Date())) {
      query.append('periodTo', formatDateForQuery(period.to))
    }

    router.push({ search: query.toString() })

    await getApplications({
      variables: {
        input: {
          defaultStates: statesOnRoute,
          states: applicationState,
          staff: staff,
          page: currentPage,
          startDate: period.to,
          endDate: period.from,
        },
      },
    })
      .then((res) => {
        setFilterApplications(res?.data?.filterApplications)
      })
      .catch(() => {
        console.log('ERROR')
      })
  }

  return {
    filterTable,
    error,
    loading,
  }
}
export default useApplicationFilter
