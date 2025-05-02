import { DataValue, ReviewGroup } from '@island.is/application/ui-components'
import { GridColumn, GridRow } from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'
import { format as formatKennitala } from 'kennitala'
import { getApplicationExternalData } from '../../../lib/carRecyclingUtils'
import { carRecyclingMessages } from '../../../lib/messages'
import { ReviewGroupProps } from './props'

export const BaseInformation = ({ application }: ReviewGroupProps) => {
  const {
    applicantName,
    applicantNationalId,
    applicantAddress,
    applicantMunicipality,
  } = getApplicationExternalData(application.externalData)

  const { formatMessage } = useLocale()

  return (
    <ReviewGroup isLast>
      {applicantName !== '' && (
        <GridRow>
          <GridColumn
            span={['12/12', '12/12', '12/12', '5/12']}
            paddingBottom={3}
          >
            <DataValue
              label={formatMessage(carRecyclingMessages.review.name)}
              value={applicantName}
            />
          </GridColumn>
          <GridColumn
            span={['12/12', '12/12', '12/12', '5/12']}
            paddingBottom={3}
          >
            <DataValue
              label={formatMessage(carRecyclingMessages.review.nationalId)}
              value={formatKennitala(applicantNationalId)}
            />
          </GridColumn>
        </GridRow>
      )}

      <GridRow>
        <GridColumn
          span={['12/12', '12/12', '12/12', '5/12']}
          paddingBottom={[3, 3, 3, 0]}
        >
          <DataValue
            label={formatMessage(carRecyclingMessages.review.address)}
            value={applicantAddress}
          />
        </GridColumn>

        <GridColumn span={['12/12', '12/12', '12/12', '5/12']}>
          <DataValue
            label={formatMessage(carRecyclingMessages.review.municipality)}
            value={applicantMunicipality}
          />
        </GridColumn>
      </GridRow>
    </ReviewGroup>
  )
}
