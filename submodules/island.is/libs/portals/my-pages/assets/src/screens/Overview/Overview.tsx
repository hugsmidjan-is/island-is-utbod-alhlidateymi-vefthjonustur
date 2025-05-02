import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Filter,
  Input,
  Pagination,
  Stack,
  Text,
} from '@island.is/island-ui/core'
import { useLocale, useNamespaces } from '@island.is/localization'
import {
  CardLoader,
  FootNote,
  formSubmit,
  IntroHeader,
  m,
  SAMGONGUSTOFA_SLUG,
} from '@island.is/portals/my-pages/core'

import { VehicleCard } from '../../components/VehicleCard'
import {
  vehicleMessage as messages,
  urls,
  vehicleMessage,
} from '../../lib/messages'
import DropdownExport from '../../components/DropdownExport/DropdownExport'

import { useGetUsersVehiclesV2LazyQuery } from './Overview.generated'
import { useGetExcelVehiclesLazyQuery } from '../../utils/VehicleExcel.generated'
import { exportVehicleOwnedDocument } from '../../utils/vehicleOwnedMapper'
import useDebounce from 'react-use/lib/useDebounce'
import { VehiclesDetail } from '@island.is/api/schema'
import { Problem } from '@island.is/react-spa/shared'
import { useUserInfo } from '@island.is/react-spa/bff'

const defaultFilterValues = {
  searchQuery: '',
  onlyMileageRequiredVehicles: undefined,
}
type FilterValues = {
  searchQuery: string
  onlyMileageRequiredVehicles?: boolean
}

const VehiclesOverview = () => {
  useNamespaces('sp.vehicles')
  const userInfo = useUserInfo()
  const { formatMessage } = useLocale()
  const [page, setPage] = useState(1)
  const [searchLoading, setSearchLoading] = useState(false)

  const [downloadExcel, setDownloadExcel] = useState(false)
  const [vehicleData, setVehicleData] = useState<
    Array<VehiclesDetail> | undefined | null
  >(null)

  const [filterValue, setFilterValue] =
    useState<FilterValues>(defaultFilterValues)

  const [GetUsersVehiclesLazyQuery, { loading, error, ...usersVehicleQuery }] =
    useGetUsersVehiclesV2LazyQuery()

  const [
    GetExcelVehiclesLazyQuery,
    { loading: excelLoading, error: excelError, ...usersExcelVehicleQuery },
  ] = useGetExcelVehiclesLazyQuery()

  useEffect(() => {
    GetUsersVehiclesLazyQuery({
      variables: {
        input: {
          pageSize: 10,
          page: 1,
        },
      },
    })
  }, [])

  useDebounce(
    () => {
      const onlyMileage = Boolean(filterValue.onlyMileageRequiredVehicles)
      const permno = filterValue.searchQuery
      GetUsersVehiclesLazyQuery({
        onCompleted: () => setSearchLoading(false),
        variables: {
          input: {
            pageSize: 10,
            page: page,
            ...(permno && { permno }),
            ...(onlyMileage && { onlyMileage }),
          },
        },
      })
    },
    500,
    [filterValue.onlyMileageRequiredVehicles, filterValue.searchQuery, page],
  )

  useEffect(() => {
    if (downloadExcel) {
      GetExcelVehiclesLazyQuery().then((data) =>
        setVehicleData(data.data?.getExcelVehicles?.vehicles),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadExcel])

  useEffect(() => {
    if (downloadExcel && vehicleData) {
      exportVehicleOwnedDocument(
        usersExcelVehicleQuery.data?.getExcelVehicles?.vehicles ?? [],
        formatMessage(messages.myCarsFiles),
        userInfo.profile.name,
        userInfo.profile.nationalId,
      )
      setDownloadExcel(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleData])
  const vehicles = usersVehicleQuery.data?.vehiclesListV2

  const ownershipPdf =
    usersVehicleQuery.data?.vehiclesListV2?.downloadServiceURL
  const filteredVehicles = vehicles?.vehicleList ?? []

  return (
    <>
      <IntroHeader
        title={messages.title}
        intro={messages.intro}
        serviceProviderSlug={SAMGONGUSTOFA_SLUG}
        serviceProviderTooltip={formatMessage(m.vehiclesTooltip)}
      />

      {error && !loading && <Problem error={error} noBorder={false} />}
      {((!loading && !error && filteredVehicles.length > 0) ||
        searchLoading) && (
        <Box marginBottom={3} display="flex" flexWrap="wrap">
          {(ownershipPdf || searchLoading) && (
            <Box marginRight={2} marginBottom={[1]}>
              <DropdownExport
                onGetPDF={() => formSubmit(`${ownershipPdf}`)}
                onGetExcel={() => setDownloadExcel(true)}
              />
            </Box>
          )}
          <Box paddingRight={2} marginBottom={[1]}>
            <a
              href={formatMessage(urls.ownerChange)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                as="span"
                unfocusable
                colorScheme="default"
                icon="open"
                iconType="outline"
                size="default"
                variant="utility"
              >
                {formatMessage(messages.changeOfOwnership)}
              </Button>
            </a>
          </Box>
          <Box marginRight={2} marginBottom={[1]}>
            <a
              href={formatMessage(urls.recycleCar)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                as="span"
                unfocusable
                variant="utility"
                size="small"
                icon="reader"
                iconType="outline"
              >
                {formatMessage(messages.recycleCar)}
              </Button>
            </a>
          </Box>
          <Box marginBottom={[1]}>
            <a
              href={formatMessage(urls.hideName)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                as="span"
                unfocusable
                variant="utility"
                size="small"
                icon="eyeOff"
                iconType="outline"
              >
                {formatMessage(messages.vehicleNameSecret)}
              </Button>
            </a>
          </Box>
        </Box>
      )}
      <Stack space={2}>
        {((!loading && !error) || searchLoading) && (
          <Box marginBottom={1}>
            <Filter
              labelClear={formatMessage(m.clearFilter)}
              labelClearAll={formatMessage(m.clearAllFilters)}
              labelOpen={formatMessage(m.openFilter)}
              labelClose={formatMessage(m.closeFilter)}
              variant="popover"
              onFilterClear={() => {
                setFilterValue(defaultFilterValues)
                setPage(1)
              }}
              align="left"
              reverse
              filterInput={
                <Input
                  icon={{ name: 'search' }}
                  backgroundColor="blue"
                  size="xs"
                  value={filterValue.searchQuery}
                  onChange={(ev) => {
                    if (ev.target.value !== filterValue.searchQuery) {
                      setPage(1)
                      setSearchLoading(true)
                    }
                    setFilterValue({
                      ...filterValue,
                      searchQuery: ev.target.value,
                    })
                  }}
                  name="okutaeki-leit"
                  label={formatMessage(m.searchLabel)}
                  placeholder={formatMessage(vehicleMessage.searchForPlate)}
                />
              }
            >
              <Box padding={4}>
                <Text variant="eyebrow" as="p" paddingBottom={2}>
                  {formatMessage(m.filterBy)}
                </Text>
                <Checkbox
                  name="onlyMileageRequiredVehicles"
                  label={formatMessage(
                    vehicleMessage.vehiclesRequireMileageRegistration,
                  )}
                  value="onlyMileageRequiredVehicles"
                  checked={Boolean(filterValue.onlyMileageRequiredVehicles)}
                  onChange={(e) => {
                    setPage(1)
                    setSearchLoading(true)
                    setFilterValue({
                      ...filterValue,
                      onlyMileageRequiredVehicles: e.target.checked,
                    })
                  }}
                />
              </Box>
            </Filter>
          </Box>
        )}

        {(loading || searchLoading) && <CardLoader />}

        {filteredVehicles.length > 0 && !searchLoading && (
          <Box width="full">
            <Stack space={2}>
              {filteredVehicles.map((item, index) => {
                return <VehicleCard vehicle={item} key={index} />
              })}
            </Stack>
          </Box>
        )}
        {!loading && !searchLoading && filteredVehicles.length > 0 && (
          <Box>
            <Pagination
              page={vehicles?.paging?.pageNumber ?? 0}
              totalPages={vehicles?.paging?.totalPages ?? 0}
              renderLink={(page, className, children) => (
                <button
                  className={className}
                  onClick={() => {
                    setSearchLoading(true)
                    setPage(page)
                  }}
                >
                  {children}
                </button>
              )}
            />
          </Box>
        )}
        {!loading && !error && vehicles?.vehicleList?.length === 0 && (
          <Problem
            type="no_data"
            noBorder={false}
            title={formatMessage(m.noDataFoundVariable, {
              arg: formatMessage(messages.title).toLowerCase(),
            })}
            message={formatMessage(m.noDataFoundVariableDetailVariation, {
              arg: formatMessage(messages.title).toLowerCase(),
            })}
            imgSrc="./assets/images/sofa.svg"
          />
        )}
      </Stack>

      <FootNote serviceProviderSlug={SAMGONGUSTOFA_SLUG} />
    </>
  )
}
export default VehiclesOverview
