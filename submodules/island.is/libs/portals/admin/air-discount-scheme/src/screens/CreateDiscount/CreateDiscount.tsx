import React, { useState } from 'react'

import {
  GridRow,
  GridColumn,
  GridContainer,
  Button,
  Input,
  Stack,
  Box,
  Text,
  Select,
} from '@island.is/island-ui/core'
import { PortalNavigation } from '@island.is/portals/core'
import {
  CreateExplicitDiscountCodeMutation,
  useCreateExplicitDiscountCodeMutation,
} from './CreateDiscount.generated'
import Modal from '../../components/Modal/Modal'
import { airDiscountSchemeNavigation } from '../../lib/navigation'
import { Problem, ProblemTypes } from '@island.is/react-spa/shared'

const AdminCreateDiscount = () => {
  const options = [
    {
      label: '24 tímar',
      value: '1',
    },
    {
      label: '14 dagar',
      value: '14',
    },
  ]

  const typeOptions = [
    { label: 'Nei', value: false },
    {
      label: 'Já',
      value: true,
    },
  ]

  const [createExplicitDiscountCode] = useCreateExplicitDiscountCodeMutation()
  const [nationalId, setNationalId] = useState('')
  const [postalcode, setPostalcode] = useState('')
  const [comment, setComment] = useState('')
  const [length, setLength] = useState(options[0])

  const [needsConnecting, setNeedsConnecting] = useState(typeOptions[0])
  const [discountCode, setDiscountCode] = useState<
    CreateExplicitDiscountCodeMutation | undefined | null
  >(undefined)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <GridContainer>
        <GridRow>
          <GridColumn span={['12/12', '12/12', '12/12', '4/12', '3/12']}>
            <Box paddingBottom={4}>
              <PortalNavigation navigation={airDiscountSchemeNavigation} />
            </Box>
          </GridColumn>
          <GridColumn
            span={['12/12', '12/12', '12/12', '8/12']}
            offset={['0', '0', '0', '0', '1/12']}
          >
            <Stack space={3}>
              <Text variant="h1" as="h1">
                Handvirkir kóðar
              </Text>
              {discountCode ? (
                <>
                  {discountCode?.createAirDiscountSchemeExplicitDiscountCode?.map(
                    (item) => {
                      return (
                        <>
                          <Text variant="h3">
                            Venjulegur kóði: {item.discountCode}
                          </Text>
                          {!!item.connectionDiscountCodes.length &&
                            item.connectionDiscountCodes.map(
                              (connectionCode) => {
                                return (
                                  <Text variant="h3">
                                    Tengiflugs kóði: {connectionCode.code}
                                  </Text>
                                )
                              },
                            )}
                        </>
                      )
                    },
                  )}
                  <Text>
                    Umsýsluviðmótið geymir þessa kóða ekki. Þeir munu birtast í
                    viðmóti viðkomandi kennitöluhafa.
                  </Text>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setNationalId('')
                      setPostalcode('')
                      setComment('')
                      setDiscountCode(null)
                      setNeedsConnecting(typeOptions[0])
                    }}
                  >
                    Búa til nýjan kóða
                  </Button>
                </>
              ) : discountCode === null ? (
                <Problem
                  type={ProblemTypes.notFound}
                  title="Villa"
                  message="Kennitala gæti verið röng eða þessi notandi er búinn með sína leggi"
                />
              ) : (
                <>
                  <Text variant="intro">
                    Hér getur þú handvirkt búið til kóða fyrir einstaklinga.
                  </Text>
                  <Input
                    name="nationalid"
                    label="Kennitala"
                    required
                    onChange={(e) => {
                      setNationalId(e.target.value)
                    }}
                  />

                  <Input
                    name="postalcode"
                    label="Póstnúmer"
                    type="number"
                    required
                    onChange={(e) => {
                      setPostalcode(e.target.value)
                    }}
                  />

                  <Input
                    name="comment"
                    label="Athugasemd"
                    required
                    onChange={(e) => {
                      setComment(e.target.value)
                    }}
                  />
                  <Select
                    name="length"
                    label="Þarf tengiflug"
                    required
                    onChange={(opt) => {
                      setNeedsConnecting(
                        typeOptions.find((item) => item.value === opt?.value) ??
                          typeOptions[0],
                      )
                    }}
                    value={needsConnecting}
                    options={typeOptions}
                  />
                  <Select
                    name="length"
                    label="Tímalengd"
                    required
                    onChange={(opt) => {
                      setLength(
                        options.find((item) => item.value === opt?.value) ??
                          options[0],
                      )
                    }}
                    value={length}
                    options={options}
                  />

                  <Button
                    disabled={[nationalId, postalcode, comment].some(
                      (val) => !val.length,
                    )}
                    onClick={() => setShowModal(true)}
                  >
                    Búa til kóða
                  </Button>
                </>
              )}
            </Stack>
          </GridColumn>
        </GridRow>
      </GridContainer>
      <Modal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onContinue={() => {
          setDiscountCode(undefined)
          setShowModal(false)

          createExplicitDiscountCode({
            variables: {
              input: {
                nationalId: nationalId.replace('-', ''),
                postalcode: parseInt(postalcode, 10),
                comment,
                numberOfDaysUntilExpiration: parseInt(length.value, 10),
                isExplicit: false,
                needsConnectionFlight: needsConnecting.value,
              },
            },
          })
            .then((data) => {
              setDiscountCode(data.data ?? undefined)
            })
            .catch(() => setDiscountCode(null))
        }}
        t={{
          title: 'Búa til kóða handvirkt',
          info: 'MIKILVÆGT: Sjáið til að allar upplýsingar séu réttar.',
          buttons: {
            cancel: 'Hætta við',
            continue: 'Halda áfram',
          },
        }}
      />
    </>
  )
}

export default AdminCreateDiscount
