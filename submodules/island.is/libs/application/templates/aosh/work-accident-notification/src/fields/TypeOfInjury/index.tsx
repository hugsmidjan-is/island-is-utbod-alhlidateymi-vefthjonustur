import { FieldBaseProps } from '@island.is/application/types'
import { FC } from 'react'
import { causeAndConsequences } from '../../lib/messages'
import { CausesAndEffects } from '../Components/CausesAndEffects'
import { WorkAccidentNotification } from '../..'

interface TypeOfInjuryProps {
  field: {
    props: {
      index: number
    }
  }
}

export const TypeOfInjury: FC<
  React.PropsWithChildren<TypeOfInjuryProps & FieldBaseProps>
> = (props) => {
  const { application } = props
  const answers = application.answers as WorkAccidentNotification
  const idx = props.field?.props?.index

  return (
    <CausesAndEffects
      majorGroupLength={2}
      externalDataKey={'aoshData.data.typeOfInjury'}
      heading={causeAndConsequences.typeOfInjury.heading}
      subHeading={causeAndConsequences.typeOfInjury.subHeading}
      answerId={`typeOfInjury[${idx}].typeOfInjury`}
      mostSeriousAnswerId={`typeOfInjury[${idx}].typeOfInjuryMostSerious`}
      screenId={'typeOfInjury'}
      mostSeriousAnswer={
        (answers?.typeOfInjury?.[idx]?.typeOfInjuryMostSerious as string) || ''
      }
      {...props}
    />
  )
}
