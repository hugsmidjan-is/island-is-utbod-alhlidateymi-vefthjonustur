import React, { useState, useContext } from 'react'
import { Text, Input, Box } from '@island.is/island-ui/core'

import {
  ContentContainer,
  Footer,
  RadioButtonContainer,
} from '@island.is/financial-aid-web/osk/src/components'
import { FormContext } from '@island.is/financial-aid-web/osk/src/components/FormProvider/FormProvider'
import { useRouter } from 'next/router'
import useFormNavigation from '@island.is/financial-aid-web/osk/src/utils/hooks/useFormNavigation'

import * as styles from './homeCircumstancesForm.css'
import cn from 'classnames'
import {
  NavigationProps,
  getHomeCircumstances,
  HomeCircumstances,
} from '@island.is/financial-aid/shared/lib'

const HomeCircumstancesForm = () => {
  const router = useRouter()

  const { form, updateForm } = useContext(FormContext)
  const [hasError, setHasError] = useState(false)

  const navigation: NavigationProps = useFormNavigation(
    router.pathname,
  ) as NavigationProps

  const options = [
    HomeCircumstances.WITHPARENTS,
    HomeCircumstances.WITHOTHERS,
    HomeCircumstances.OWNPLACE,
    HomeCircumstances.REGISTEREDLEASE,
    HomeCircumstances.UNREGISTEREDLEASE,
    HomeCircumstances.OTHER,
  ].map((item) => ({
    label: getHomeCircumstances[item],
    value: item,
  }))

  const errorCheck = () => {
    if (form?.homeCircumstances === undefined) {
      setHasError(true)
      return
    }

    if (
      form?.homeCircumstances === HomeCircumstances.OTHER &&
      !form?.homeCircumstancesCustom
    ) {
      setHasError(true)
      return
    }

    if (
      form?.homeCircumstances !== HomeCircumstances.OTHER &&
      form?.homeCircumstancesCustom
    ) {
      updateForm({ ...form, homeCircumstancesCustom: '' })
    }

    if (navigation?.nextUrl) {
      router.push(navigation?.nextUrl)
    }
  }

  return (
    <>
      <ContentContainer>
        <Text as="h1" variant="h2" marginBottom={[3, 3, 4]}>
          Hvernig býrðu?
        </Text>

        <RadioButtonContainer
          options={options}
          error={hasError && !form?.homeCircumstances}
          isChecked={(value: HomeCircumstances) => {
            return value === form?.homeCircumstances
          }}
          onChange={(value: HomeCircumstances) => {
            updateForm({ ...form, homeCircumstances: value })

            setHasError(false)
          }}
        />

        {hasError && !form?.homeCircumstances && (
          <div
            data-testid="errorMessage"
            className={cn({
              [`errorMessage`]: true,
              [`showErrorMessage`]: hasError && !form?.homeCircumstances,
            })}
          >
            <Text color="red600" fontWeight="semiBold" variant="small">
              Þú þarft að velja einn valmöguleika
            </Text>
          </div>
        )}

        <Box
          marginTop={1}
          marginBottom={10}
          className={cn({
            [`${styles.inputContainer}`]: true,
            [`${styles.inputAppear}`]:
              form?.homeCircumstances === HomeCircumstances.OTHER,
          })}
        >
          {form?.homeCircumstances === HomeCircumstances.OTHER && (
            <Input
              backgroundColor={'blue'}
              label="Lýstu þínum aðstæðum"
              name="homeCircumstancesCustom"
              rows={8}
              textarea
              value={form?.homeCircumstancesCustom}
              hasError={hasError && !form?.homeCircumstancesCustom}
              errorMessage="Þú þarft að skrifa í textareitinn"
              onChange={(event) => {
                updateForm({
                  ...form,
                  homeCircumstancesCustom: event.target.value,
                })
              }}
            />
          )}
        </Box>
      </ContentContainer>

      <Footer
        previousUrl={navigation?.prevUrl}
        onNextButtonClick={() => errorCheck()}
      />
    </>
  )
}

export default HomeCircumstancesForm
