import { FieldBaseProps } from '@island.is/application/types'
import { FC, useState } from 'react'
import { Box, ErrorMessage } from '@island.is/island-ui/core'
import { useFormContext } from 'react-hook-form'
import { employee } from '../../lib/messages'
import { useLocale } from '@island.is/localization'
import { WorkAccidentNotification } from '../..'
import { dateIsWithin36Hours, formatDate } from '../../utils'
import { getValueViaPath } from '@island.is/application/core'

interface EmployeeStartTimeErrorProps {
  field: {
    props: {
      index: number
    }
  }
}

export const EmployeeStartTimeError: FC<
  React.PropsWithChildren<FieldBaseProps & EmployeeStartTimeErrorProps>
> = (props) => {
  const { application, field, setBeforeSubmitCallback } = props
  const { index } = field.props
  const { getValues } = useFormContext<WorkAccidentNotification>()
  const { formatMessage } = useLocale()
  const [inputError, setInputError] = useState<boolean>(false)
  const startDate =
    getValueViaPath<string>(application.answers, 'accident.date') ?? ''
  const startTime =
    getValueViaPath<string>(application.answers, 'accident.time') ?? ''

  setBeforeSubmitCallback?.(async () => {
    const values = getValues('employee')
    if (
      values?.[index] &&
      values[index].startOfWorkdayDate &&
      values[index].startTime &&
      dateIsWithin36Hours(
        application,
        values[index].startOfWorkdayDate,
        values[index].startTime,
      )
    ) {
      setInputError(false)
      return [true, null]
    }
    setInputError(true)
    return [false, '']
  })

  return (
    <div>
      {inputError && (
        <Box>
          <ErrorMessage id={field.id}>
            {`${formatMessage(employee.employee.errorMessage)}, ${formatDate(
              startDate,
            )} ${startTime.slice(0, 2)}:${startTime.slice(2, 4)}`}
          </ErrorMessage>
        </Box>
      )}
    </div>
  )
}
