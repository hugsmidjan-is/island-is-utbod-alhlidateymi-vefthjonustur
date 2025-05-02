import {
  DataValue,
  ReviewGroup,
  formatBankInfo,
} from '@island.is/application/ui-components'
import { GridColumn, GridRow } from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'

import { socialInsuranceAdministrationMessage } from '@island.is/application/templates/social-insurance-administration-core/lib/messages'
import { ReviewGroupProps } from './props'
import { getApplicationAnswers } from '../../../lib/pensionSupplementUtils'
import { BankAccountType } from '@island.is/application/templates/social-insurance-administration-core/lib/constants'
import {
  friendlyFormatIBAN,
  friendlyFormatSWIFT,
} from '@island.is/application/templates/social-insurance-administration-core/lib/socialInsuranceAdministrationUtils'

export const Payment = ({
  application,
  editable,
  goToScreen,
}: ReviewGroupProps) => {
  const {
    bank,
    bankAccountType,
    iban,
    swift,
    bankName,
    bankAddress,
    currency,
  } = getApplicationAnswers(application.answers)
  const { formatMessage } = useLocale()

  return (
    <ReviewGroup
      isLast
      isEditable={editable}
      editAction={() => goToScreen?.('paymentInfo')}
    >
      {bankAccountType === BankAccountType.ICELANDIC ? (
        <GridRow>
          <GridColumn span={['12/12', '12/12', '12/12', '5/12']}>
            <DataValue
              label={formatMessage(
                socialInsuranceAdministrationMessage.payment.bank,
              )}
              value={formatBankInfo(bank)}
            />
          </GridColumn>
        </GridRow>
      ) : (
        <>
          <GridRow marginBottom={3}>
            <GridColumn span={['12/12', '12/12', '12/12', '12/12']}>
              <DataValue
                label={formatMessage(
                  socialInsuranceAdministrationMessage.payment.iban,
                )}
                value={friendlyFormatIBAN(iban)}
              />
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn
              span={['12/12', '12/12', '12/12', '5/12']}
              paddingBottom={3}
            >
              <DataValue
                label={formatMessage(
                  socialInsuranceAdministrationMessage.payment.swift,
                )}
                value={friendlyFormatSWIFT(swift)}
              />
            </GridColumn>
            <GridColumn
              span={['12/12', '12/12', '12/12', '5/12']}
              paddingBottom={3}
            >
              <DataValue
                label={formatMessage(
                  socialInsuranceAdministrationMessage.payment.currency,
                )}
                value={currency}
              />
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn
              span={['12/12', '12/12', '12/12', '5/12']}
              paddingBottom={[3, 3, 3, 0]}
            >
              <DataValue
                label={formatMessage(
                  socialInsuranceAdministrationMessage.payment.bankName,
                )}
                value={bankName}
              />
            </GridColumn>
            <GridColumn span={['12/12', '12/12', '12/12', '5/12']}>
              <DataValue
                label={formatMessage(
                  socialInsuranceAdministrationMessage.payment.bankAddress,
                )}
                value={bankAddress}
              />
            </GridColumn>
          </GridRow>
        </>
      )}
    </ReviewGroup>
  )
}
