import {
  FieldBaseProps,
  FieldComponents,
  FieldTypes,
} from '@island.is/application/types'
import { Box, GridColumn, GridRow, Text } from '@island.is/island-ui/core'
import { FC } from 'react'
import { information, review } from '../../lib/messages'
import { Citizenship } from '../../lib/dataSchema'
import { useLocale } from '@island.is/localization'
import { Routes } from '../../lib/constants'
import SummaryBlock from '../../components/SummaryBlock'
import { YES, getValueViaPath } from '@island.is/application/core'
import { OptionSetItem } from '@island.is/clients/directorate-of-immigration'
import { DescriptionFormField } from '@island.is/application/ui-fields'

interface Props extends FieldBaseProps {
  goToScreen?: (id: string) => void
  route: Routes
}

export const StaysAbroadReview: FC<Props> = ({
  application,
  goToScreen,
  route,
}) => {
  const answers = application.answers as Citizenship
  const { formatMessage } = useLocale()

  const countryOptions = getValueViaPath(
    application.externalData,
    'countries.data',
    [],
  ) as OptionSetItem[]

  return (
    <SummaryBlock editAction={() => goToScreen?.(route)}>
      <Box paddingBottom={4}>
        {DescriptionFormField({
          application: application,
          showFieldName: false,
          field: {
            id: 'title',
            title: '',
            description: formatMessage(review.labels.abroadStays),
            titleVariant: 'h4',
            type: FieldTypes.DESCRIPTION,
            component: FieldComponents.DESCRIPTION,
            children: undefined,
          },
        })}
        <GridRow>
          {answers?.staysAbroad?.hasStayedAbroad === YES &&
          answers?.staysAbroad?.selectedAbroadCountries &&
          answers?.staysAbroad?.selectedAbroadCountries?.length > 0 ? (
            answers?.staysAbroad?.selectedAbroadCountries
              ?.filter((x) => x.wasRemoved === 'false')
              ?.map((country) => {
                const countryInfo = countryOptions.filter(
                  (z) => z.id?.toString() === country.countryId,
                )[0]
                return <GridColumn span="1/2">{countryInfo.name}</GridColumn>
              })
          ) : (
            <GridColumn>
              <Text>
                {formatMessage(information.labels.radioButtons.radioOptionNo)}
              </Text>
            </GridColumn>
          )}
        </GridRow>
      </Box>
    </SummaryBlock>
  )
}
