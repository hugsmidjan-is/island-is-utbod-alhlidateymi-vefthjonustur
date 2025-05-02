import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import {
  ActivationButtonTableItem,
  ApplicationOverviewSkeleton,
  LoadingContainer,
  NewUserModal,
  TableBody,
  TableHeaders,
  TextTableItem,
} from '@island.is/financial-aid-web/veita/src/components'
import { Text, Box, Button, ToastContainer } from '@island.is/island-ui/core'

import * as tableStyles from '../../sharedStyles/Table.css'
import * as headerStyles from '../../sharedStyles/Header.css'
import cn from 'classnames'

import {
  formatNationalId,
  Staff,
  StaffRole,
  staffRoleDescription,
} from '@island.is/financial-aid/shared/lib'
import { SupervisorsQuery } from '@island.is/financial-aid-web/veita/graphql'
import { AdminContext } from '@island.is/financial-aid-web/veita/src/components/AdminProvider/AdminProvider'
import { useStaff } from '@island.is/financial-aid-web/veita/src/utils/useStaff'

export const Supervisors = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [supervisors, setSupervisors] = useState<Staff[]>()
  const { admin } = useContext(AdminContext)
  const { changeUserActivity, staffActivationLoading } = useStaff()

  const [getSupervisors, { data, error, loading }] = useLazyQuery<{
    supervisors: Staff[]
  }>(SupervisorsQuery, {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  })

  useEffect(() => {
    getSupervisors()
  }, [])

  useEffect(() => {
    if (data?.supervisors) {
      setSupervisors(data.supervisors)
    }
  }, [data])

  const isLoggedInUser = (staff: Staff) =>
    admin?.nationalId === staff.nationalId

  const refreshList = () => {
    setIsModalVisible(false)
    getSupervisors()
  }

  return (
    <LoadingContainer
      isLoading={loading}
      loader={<ApplicationOverviewSkeleton />}
    >
      <Box
        className={headerStyles.header}
        marginTop={15}
        marginBottom={[2, 2, 4]}
      >
        <Text as="h1" variant="h1">
          Umsjónaraðilar
        </Text>
        <Button
          size="small"
          icon="add"
          variant="ghost"
          onClick={() => setIsModalVisible(true)}
        >
          Nýr umsjónaraðili
        </Button>
      </Box>
      {supervisors && (
        <div className={`${tableStyles.wrapper} hideScrollBar`}>
          <div className={tableStyles.smallTableWrapper}>
            <table
              className={cn({
                [`${tableStyles.tableContainer}`]: true,
              })}
            >
              <thead className={`contentUp delay-25`}>
                <tr>
                  {['Nafn', 'Kennitala', 'Hlutverk', 'Aðgerð'].map(
                    (item, index) => (
                      <TableHeaders
                        header={{ title: item }}
                        index={index}
                        key={`tableHeaders-${index}`}
                      />
                    ),
                  )}
                </tr>
              </thead>

              <tbody className={`${tableStyles.tableBody} contentUp delay-50`}>
                {supervisors.map((item: Staff, index) => (
                  <TableBody
                    items={[
                      TextTableItem(
                        'h5',
                        `${item.name} ${isLoggedInUser(item) ? '(Þú)' : ''}`,
                        item.active ? 'dark400' : 'dark300',
                      ),
                      TextTableItem(
                        'default',
                        formatNationalId(item.nationalId),
                        item.active ? 'dark400' : 'dark300',
                      ),
                      TextTableItem(
                        'default',
                        staffRoleDescription(item.roles),
                        item.active ? 'dark400' : 'dark300',
                      ),
                      isLoggedInUser(item) === false &&
                        ActivationButtonTableItem(
                          item.active ? 'Óvirkja' : 'Virkja',
                          staffActivationLoading,
                          () =>
                            changeUserActivity(!item.active, item.id).then(
                              () => {
                                getSupervisors()
                              },
                            ),
                          item.active,
                        ),
                    ]}
                    index={index}
                    identifier={item.id}
                    key={`tableBody-${item.id}`}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {error && (
        <div>
          Abbabab mistókst að sækja notendur, ertu örugglega með aðgang að þessu
          upplýsingum?
        </div>
      )}
      <NewUserModal
        isVisible={isModalVisible}
        setIsVisible={(visible) => {
          setIsModalVisible(visible)
        }}
        onStaffCreated={refreshList}
        predefinedRoles={[StaffRole.SUPERADMIN]}
      />
      <ToastContainer />
    </LoadingContainer>
  )
}

export default Supervisors
