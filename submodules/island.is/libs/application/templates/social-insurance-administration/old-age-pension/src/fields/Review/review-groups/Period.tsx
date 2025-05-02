import { DataValue, ReviewGroup } from '@island.is/application/ui-components'
import { GridColumn, GridRow } from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'
import { socialInsuranceAdministrationMessage } from '@island.is/application/templates/social-insurance-administration-core/lib/messages'
import { errorMessages } from '@island.is/application/templates/social-insurance-administration-core/lib/messages'
import { ReviewGroupProps } from './props'
import { MONTHS } from '@island.is/application/templates/social-insurance-administration-core/lib/constants'
import {
  getApplicationAnswers,
  isMoreThan2Year,
} from '../../../lib/oldAgePensionUtils'

export const Period = ({
  application,
  editable,
  goToScreen,
}: ReviewGroupProps) => {
  const { selectedYear, selectedMonth } = getApplicationAnswers(
    application.answers,
  )
  const month = MONTHS.find((x) => x.value === selectedMonth)
  const { formatMessage } = useLocale()

  return (
    <ReviewGroup
      isLast
      isEditable={editable}
      editAction={() => goToScreen?.('periodField')}
    >
      <GridRow>
        <GridColumn span={['12/12', '12/12', '12/12', '5/12']}>
          <DataValue
            label={formatMessage(
              socialInsuranceAdministrationMessage.period.title,
            )}
            value={`${month && formatMessage(month.label)} ${selectedYear}`}
          />
        </GridColumn>
      </GridRow>
      {isMoreThan2Year(application.answers) && (
        <p style={{ color: '#B30038', fontSize: '14px', fontWeight: '500' }}>
          {formatMessage(errorMessages.period)}
        </p>
      )}
    </ReviewGroup>
  )
}
