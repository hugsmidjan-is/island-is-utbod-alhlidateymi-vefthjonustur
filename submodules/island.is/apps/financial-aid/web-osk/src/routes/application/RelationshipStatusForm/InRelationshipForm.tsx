import React, { useContext, useState } from 'react'
import { Box, Checkbox, Text } from '@island.is/island-ui/core'

import {
  ContentContainer,
  Footer,
  SpouseEmailInput,
} from '@island.is/financial-aid-web/osk/src/components'
import { FormContext } from '@island.is/financial-aid-web/osk/src/components/FormProvider/FormProvider'
import { FamilyStatus, isEmailValid } from '@island.is/financial-aid/shared/lib'
import { useRouter } from 'next/router'

interface Props {
  previousUrl?: string
  nextUrl?: string
}

const InRelationshipForm = ({ previousUrl, nextUrl }: Props) => {
  const router = useRouter()
  const { form, updateForm } = useContext(FormContext)

  const [acceptData, setAcceptData] = useState(false)

  const [hasError, setHasError] = useState(false)

  const isInputEmailValid = () =>
    Boolean(form.spouse?.email && isEmailValid(form.spouse.email))

  const errorCheck = () => {
    if (!nextUrl) {
      setHasError(true)
      return
    }

    if (!acceptData || isInputEmailValid() === false) {
      setHasError(true)
      return
    }

    updateForm({ ...form, familyStatus: FamilyStatus.MARRIED })

    router.push(nextUrl)
  }

  return (
    <>
      <ContentContainer>
        <Text as="h1" variant="h2" marginBottom={2}>
          Hjúskaparstaða þín
        </Text>
        <Text variant="intro" marginBottom={[2, 2, 3]}>
          Þar sem þú ert í sambúð þarft þú að skila inn umsókn um fjárhagsaðstoð
          og maki þinn að skila inn upplýsingum um tekjur.
        </Text>
        <Text marginBottom={2}>
          Hvað þýðir það? Þú klárar að fylla út þína umsókn um fjárhagsaðstoð
          hér og maki þinn notar sín rafrænu skilríki til að skila inn
          nauðsynlegum gögnum.
        </Text>
        <Text marginBottom={[3, 3, 4]}>
          Úrvinnsla umsóknarinnar hefst þegar öll gögn hafa borist.
        </Text>

        <Box marginBottom={[5, 5, 10]}>
          <SpouseEmailInput
            hasError={hasError && isInputEmailValid() === false}
            removeError={() => setHasError(false)}
          />
          <Checkbox
            name={'accept'}
            backgroundColor="blue"
            label="Ég skil að maki minn þarf líka að skila inn umsókn áður en úrvinnsla hefst"
            large
            checked={acceptData}
            onChange={(event) => {
              setAcceptData(event.target.checked)
              setHasError(false)
            }}
            hasError={hasError}
            errorMessage={'Þú þarft að samþykkja'}
          />
        </Box>
      </ContentContainer>
      <Footer
        previousUrl={previousUrl}
        onNextButtonClick={() => errorCheck()}
      />
    </>
  )
}

export default InRelationshipForm
