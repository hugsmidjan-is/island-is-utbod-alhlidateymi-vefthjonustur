import { gql, useQuery } from '@apollo/client'
import { OwnerChangeValidationMessage } from '@island.is/api/schema'
import { getValueViaPath } from '@island.is/application/core'
import { FieldBaseProps } from '@island.is/application/types'
import {
  AlertMessage,
  Box,
  Bullet,
  BulletList,
  Text,
} from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { TransferOfVehicleOwnershipAnswers } from '../..'
import { VALIDATE_VEHICLE_OWNER_CHANGE } from '../../graphql/queries'
import { applicationCheck, payment } from '../../lib/messages'

interface Props {
  showErrorOnly?: boolean
  setValidationErrorFound?: Dispatch<SetStateAction<boolean>>
}

export const ValidationErrorMessages: FC<
  React.PropsWithChildren<Props & FieldBaseProps>
> = ({ showErrorOnly, setValidationErrorFound, ...props }) => {
  const { application, setFieldLoadingState } = props

  const { formatMessage } = useLocale()

  const answers = application.answers as TransferOfVehicleOwnershipAnswers

  const { data, loading } = useQuery(
    gql`
      ${VALIDATE_VEHICLE_OWNER_CHANGE}
    `,
    {
      variables: {
        answers: {
          pickVehicle: {
            plate: answers?.pickVehicle?.plate,
          },
          vehicle: {
            date: answers?.vehicle?.date,
            salePrice: answers?.vehicle?.salePrice,
          },
          vehicleMileage: {
            value: answers?.vehicleMileage?.value,
          },
          seller: {
            email: answers?.seller?.email,
            nationalId: answers?.seller?.nationalId,
          },
          buyer: {
            email: answers?.buyer?.email,
            nationalId: answers?.buyer?.nationalId,
          },
          buyerCoOwnerAndOperator: answers?.buyerCoOwnerAndOperator?.map(
            (x) => ({
              nationalId: x.nationalId,
              email: x.email,
              type: x.type,
              wasRemoved: x.wasRemoved,
            }),
          ),
          buyerMainOperator: answers?.buyerMainOperator
            ? {
                nationalId: answers.buyerMainOperator.nationalId,
              }
            : null,
          insurance: answers?.insurance
            ? { value: answers.insurance.value }
            : null,
        },
      },
      onCompleted: (data) => {
        if (data?.vehicleOwnerChangeValidation?.hasError) {
          setValidationErrorFound?.(true)
        }
      },
      fetchPolicy: 'no-cache',
    },
  )

  useEffect(() => {
    setFieldLoadingState?.(loading)
  }, [loading, setFieldLoadingState])

  return data?.vehicleOwnerChangeValidation?.hasError &&
    data.vehicleOwnerChangeValidation.errorMessages.length > 0 ? (
    <Box>
      <AlertMessage
        type="error"
        title={formatMessage(applicationCheck.validation.alertTitle)}
        message={
          <Box component="span" display="block">
            <BulletList>
              {data.vehicleOwnerChangeValidation.errorMessages.map(
                (error: OwnerChangeValidationMessage) => {
                  const message = formatMessage(
                    getValueViaPath(
                      applicationCheck.validation,
                      error?.errorNo || '',
                    ),
                  )
                  const defaultMessage = error.defaultMessage
                  const fallbackMessage =
                    formatMessage(
                      applicationCheck.validation.fallbackErrorMessage,
                    ) +
                    ' - ' +
                    error?.errorNo

                  return (
                    <Bullet key={error.errorNo}>
                      {message || defaultMessage || fallbackMessage}
                    </Bullet>
                  )
                },
              )}
            </BulletList>
          </Box>
        }
      />
    </Box>
  ) : !showErrorOnly ? (
    <Box>
      <AlertMessage
        type="info"
        title={formatMessage(payment.paymentChargeOverview.alertTitle)}
        message={
          <Box component="span" display="block">
            <Text variant="small">
              {formatMessage(payment.paymentChargeOverview.alertMessage)}
            </Text>
          </Box>
        }
      />
    </Box>
  ) : null
}
