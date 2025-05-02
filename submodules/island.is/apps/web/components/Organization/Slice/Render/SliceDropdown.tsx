import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import slugify from '@sindresorhus/slugify'

import {
  BoxProps,
  GridColumn,
  GridContainer,
  GridRow,
  Select,
  Stack,
} from '@island.is/island-ui/core'
import { SpanType } from '@island.is/island-ui/core/types'
import { sortAlpha } from '@island.is/shared/utils'
import { SliceMachine } from '@island.is/web/components'
import { Slice } from '@island.is/web/graphql/schema'

interface SliceProps {
  slices: Slice[]
  sliceExtraText: string
  gridSpan?: SpanType
  gridOffset?: SpanType
  slicesAreFullWidth?: boolean
  dropdownMarginBottom?: BoxProps['marginBottom']
  orderOptionsAlphabetically?: boolean | null
}

export const SliceDropdown: React.FC<React.PropsWithChildren<SliceProps>> = ({
  slices,
  sliceExtraText,
  gridSpan = ['9/9', '9/9', '7/9', '7/9', '4/9'],
  gridOffset = ['0', '0', '1/9'],
  slicesAreFullWidth = false,
  dropdownMarginBottom = 0,
  orderOptionsAlphabetically = false,
}) => {
  const Router = useRouter()
  const [selectedId, setSelectedId] = useState<string>('')
  const options = useMemo(() => {
    const options = []
    for (const slice of slices) {
      if (slice.__typename === 'OneColumnText') {
        options.push({
          label: slice.title,
          value: slice.id,
          slug: slugify(slice.title),
        })
      }
    }
    if (orderOptionsAlphabetically) {
      options.sort(sortAlpha('label'))
    }
    return options
  }, [orderOptionsAlphabetically, slices])

  useEffect(() => {
    const hashString = window.location.hash.replace('#', '')
    if (!options.length) {
      return
    }

    setSelectedId(
      hashString
        ? options.find((x) => x.slug === hashString)?.value ?? ''
        : options[0].value,
    )
  }, [Router, options])

  const selectedSlice = slices.find((x) => x.id === selectedId)

  return (
    <Stack space={5}>
      <GridContainer>
        <GridRow marginBottom={dropdownMarginBottom}>
          <GridColumn span={gridSpan} offset={gridOffset}>
            <Select
              backgroundColor="white"
              icon="chevronDown"
              size="sm"
              isSearchable
              label={sliceExtraText}
              name="select1"
              options={options}
              value={options.find((x) => x.value === selectedId)}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore make web strict
              onChange={({ value }: Option) => {
                const slug = options.find((x) => x.value === value)?.slug
                setSelectedId(String(value))
                Router.push(
                  {
                    pathname: Router.asPath.split('#')[0],
                    hash: slug,
                  },
                  undefined,
                  { shallow: true },
                )
              }}
            />
          </GridColumn>
        </GridRow>
      </GridContainer>
      {!!selectedSlice && (
        <SliceMachine
          key={selectedSlice.id}
          slice={selectedSlice}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore make web strict
          namespace={null}
          fullWidth={slicesAreFullWidth}
        />
      )}
    </Stack>
  )
}
