import { Citizenship } from '../../lib/dataSchema'
import { Box } from '@island.is/island-ui/core'
import { FileUploadController } from '@island.is/application/ui-components'
import { supportingDocuments } from '../../lib/messages'
import { useLocale } from '@island.is/localization'
import { getErrorViaPath, getValueViaPath } from '@island.is/application/core'
import { OptionSetItem } from '@island.is/clients/directorate-of-immigration'
import { FieldBaseProps } from '@island.is/application/types'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { FILE_TYPES_ALLOWED } from '../../shared'

export const CriminalRecords: FC<FieldBaseProps> = ({
  field,
  application,
  errors,
}) => {
  const { setValue } = useFormContext()

  const answers = application.answers as Citizenship
  const countryList = answers?.countriesOfResidence?.selectedAbroadCountries

  const filteredCountryList = countryList?.filter(
    (x) => x.wasRemoved === 'false',
  )

  const countryOptions = getValueViaPath(
    application.externalData,
    'countries.data',
    [],
  ) as OptionSetItem[]

  const { formatMessage } = useLocale()

  const setCountryId = (countryId: string, index: number) => {
    setValue(`${field.id}[${index}].countryId`, countryId)
  }

  return (
    <Box paddingTop={2}>
      {filteredCountryList &&
        filteredCountryList.map((x, index) => {
          setCountryId(x.countryId, index)
          return (
            <Box paddingBottom={2}>
              <FileUploadController
                key={x.countryId}
                application={application}
                id={`${field.id}[${index}].attachment`}
                error={
                  errors &&
                  getErrorViaPath(errors, `${field.id}[${index}].attachment`)
                }
                accept={FILE_TYPES_ALLOWED}
                header={`${formatMessage(
                  supportingDocuments.labels.otherDocuments.criminalRecord,
                )} - ${
                  countryOptions.find((z) => z.id?.toString() === x.countryId)
                    ?.name
                }`}
                description={formatMessage(
                  supportingDocuments.labels.otherDocuments.acceptedFileTypes,
                )}
                buttonLabel={formatMessage(
                  supportingDocuments.labels.otherDocuments.buttonText,
                )}
              />
            </Box>
          )
        })}
    </Box>
  )
}
