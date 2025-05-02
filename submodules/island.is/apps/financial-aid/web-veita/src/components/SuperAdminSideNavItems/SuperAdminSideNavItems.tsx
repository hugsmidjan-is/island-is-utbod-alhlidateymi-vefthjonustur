import React from 'react'
import { Text, Icon } from '@island.is/island-ui/core'
import { useRouter } from 'next/router'

import * as sideNavButtonStyles from '../../sharedStyles/SideNavButton.css'

import { Routes, StaffRole } from '@island.is/financial-aid/shared/lib'

interface Props {
  roles?: StaffRole[]
}

const SuperAdminSideNavItems = ({ roles }: Props) => {
  const router = useRouter()

  if (roles === undefined || roles.includes(StaffRole.SUPERADMIN) === false) {
    return null
  }

  return (
    <>
      <button
        className={`${sideNavButtonStyles.sideNavBarButton} navBarButtonHover`}
        onClick={() => router.push(Routes.settings.municipalities)}
      >
        <Icon
          icon="receipt"
          type="outline"
          color="blue400"
          className={sideNavButtonStyles.sideNavBarButtonIcon}
        />
        <Text> Sveitarfélög</Text>
      </button>
      <button
        className={`${sideNavButtonStyles.sideNavBarButton} navBarButtonHover`}
        onClick={() => router.push(Routes.settings.supervisors)}
      >
        <Icon
          icon="people"
          type="outline"
          color="blue400"
          className={sideNavButtonStyles.sideNavBarButtonIcon}
        />
        <Text> Umsjónaraðilar</Text>
      </button>
    </>
  )
}

export default SuperAdminSideNavItems
