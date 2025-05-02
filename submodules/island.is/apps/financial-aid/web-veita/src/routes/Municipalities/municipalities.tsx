import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  ActivationButtonTableItem,
  ApplicationOverviewSkeleton,
  LoadingContainer,
  NewMunicipalityModal,
  TableBody,
  TableHeaders,
  TextTableItem,
} from '@island.is/financial-aid-web/veita/src/components'
import {
  Text,
  Box,
  Button,
  ToastContainer,
  toast,
} from '@island.is/island-ui/core'

import {
  Municipality,
  Routes,
  UpdateAdmin,
} from '@island.is/financial-aid/shared/lib'
import {
  MunicipalityActivityMutation,
  MunicipalitiesQuery,
  AllAdminsQuery,
} from '@island.is/financial-aid-web/veita/graphql'
import { useRouter } from 'next/router'

import * as tableStyles from '../../sharedStyles/Table.css'
import * as headerStyles from '../../sharedStyles/Header.css'
import cn from 'classnames'

export const Municipalities = () => {
  const [getMunicipalities, { data, error, loading }] = useLazyQuery<{
    municipalities: Municipality[]
  }>(MunicipalitiesQuery, {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  })

  const [
    getAdmins,
    { data: dataAdmins, error: errorAdmins, loading: loadingAdmins },
  ] = useLazyQuery<{
    admins: UpdateAdmin[]
  }>(AllAdminsQuery, {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  })

  const [isModalVisible, setIsModalVisible] = useState(false)
  const router = useRouter()
  useEffect(() => {
    getMunicipalities()
  }, [])

  const refreshList = () => {
    setIsModalVisible(false)
    getMunicipalities()
  }

  const [municipalities, setMunicipalities] = useState<Municipality[]>()

  useEffect(() => {
    if (data?.municipalities) {
      setMunicipalities(data.municipalities)
    }
  }, [data])

  const [municipalityActivity] = useMutation(MunicipalityActivityMutation)

  const changeMunicipalityActivity = async (id: string, active: boolean) => {
    await municipalityActivity({
      variables: {
        input: {
          id,
          active,
        },
      },
    })
      .then(() => {
        getMunicipalities()
      })
      .catch(() => {
        toast.error(
          'Ekki tókst að uppfæra sveitarfélag, vinsamlega reynið aftur síðar',
        )
      })
  }

  return (
    <LoadingContainer
      isLoading={loading}
      loader={<ApplicationOverviewSkeleton />}
    >
      <Box
        className={`${headerStyles.header} contentUp delay-25`}
        marginTop={15}
        marginBottom={[2, 2, 4]}
      >
        <Text as="h1" variant="h1">
          Sveitarfélög
        </Text>
        <Button
          size="small"
          icon="add"
          variant="ghost"
          onClick={() => {
            setIsModalVisible(true)
            if (!dataAdmins?.admins) {
              getAdmins()
            }
          }}
        >
          Nýtt sveitarfélag
        </Button>
      </Box>

      {municipalities && (
        <div className={`${tableStyles.wrapper} hideScrollBar`}>
          <div className={tableStyles.smallTableWrapper}>
            <table
              className={cn({
                [`${tableStyles.tableContainer}`]: true,
              })}
            >
              <thead className={`contentUp delay-50`}>
                <tr>
                  {['Nafn', 'Notendur', 'Aðgerð'].map((item, index) => (
                    <TableHeaders
                      header={{ title: item }}
                      index={index}
                      key={`tableHeaders-${index}`}
                    />
                  ))}
                </tr>
              </thead>

              <tbody className={tableStyles.tableBody}>
                {municipalities.map((item: Municipality, index) => (
                  <TableBody
                    items={[
                      TextTableItem(
                        'h5',
                        item.name,
                        item.active ? 'dark400' : 'dark300',
                      ),
                      TextTableItem(
                        'default',
                        item.numberOfUsers,
                        item.active ? 'dark400' : 'dark300',
                      ),
                      ActivationButtonTableItem(
                        item.active ? 'Óvirkja' : 'Virkja',
                        false,
                        () => changeMunicipalityActivity(item.id, !item.active),
                        item.active,
                      ),
                    ]}
                    index={index}
                    identifier={item.id}
                    onClick={() =>
                      router.push(
                        Routes.municipalityProfile(item.municipalityId),
                      )
                    }
                    key={`tableBody-${item.id}`}
                    hasMaxWidth={false}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {error && (
        <div>
          Abbabab mistókst að sækja sveitarfélög, ertu örugglega með aðgang að
          þessu upplýsingum?
        </div>
      )}
      <ToastContainer />

      <NewMunicipalityModal
        isVisible={isModalVisible}
        setIsVisible={(visible) => {
          setIsModalVisible(visible)
        }}
        activeMunicipalitiesCodes={municipalities?.map((el) =>
          parseInt(el.municipalityId),
        )}
        onMunicipalityCreated={refreshList}
        allAdmins={dataAdmins?.admins}
        loadingAdmins={loadingAdmins}
      />
    </LoadingContainer>
  )
}

export default Municipalities
