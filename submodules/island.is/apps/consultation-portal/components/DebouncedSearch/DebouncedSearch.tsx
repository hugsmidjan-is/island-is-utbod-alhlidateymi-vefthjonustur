import { setItem } from '../../utils/helpers/localStorage'
import { useDebounce } from '../../hooks'
import { Input } from '@island.is/island-ui/core'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { AdviceFilter, CaseFilter } from '../../types/interfaces'
import localization from './DebouncedSearch.json'

interface Props {
  filters?: CaseFilter | AdviceFilter
  setFilters?: (arr: CaseFilter | AdviceFilter) => void
  searchValue?: string
  setSearchValue?: (str: string) => void
  name: string
  localStorageId?: string
  label?: string
  isSubscriptions?: boolean
  filtersLoaded?: boolean
}

const loc = localization.debouncedSearch

const DebouncedSearch = ({
  filters,
  setFilters,
  searchValue,
  setSearchValue,
  name,
  localStorageId,
  label = loc.label,
  isSubscriptions,
  filtersLoaded,
}: Props) => {
  const [value, setValue] = useState(
    isSubscriptions ? searchValue : filters?.searchQuery,
  )

  useEffect(() => {
    if (filtersLoaded && !isSubscriptions) {
      setValue(filters?.searchQuery)
    }
  }, [filtersLoaded])

  const debouncedHandleSearch = useDebounce(() => {
    if (isSubscriptions) {
      setSearchValue(value)
    } else {
      const filtersCopy = { ...filters }
      filtersCopy.searchQuery = value
      filtersCopy.pageNumber = 0
      setItem({ key: localStorageId, value: filtersCopy })
      setFilters(filtersCopy)
    }
  }, 500)

  const onChange = (e: BaseSyntheticEvent) => {
    setValue(e.target.value)
    debouncedHandleSearch()
  }

  return (
    <Input
      name={name}
      label={label}
      size="xs"
      placeholder={
        isSubscriptions ? loc.subscriptionsPlaceholder : loc.placeholder
      }
      value={value}
      onChange={onChange}
    />
  )
}

export default DebouncedSearch
