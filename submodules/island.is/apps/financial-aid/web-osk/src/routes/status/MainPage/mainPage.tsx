import React, { useContext, useEffect } from 'react'
import { Text, LoadingDots } from '@island.is/island-ui/core'

import {
  Approved,
  ContentContainer,
  Footer,
  InProgress,
  MoreActions,
  Rejected,
  Timeline,
} from '@island.is/financial-aid-web/osk/src/components'

import { ApplicationState } from '@island.is/financial-aid/shared/lib'

import { useLogOut } from '@island.is/financial-aid-web/osk/src/utils/hooks/useLogOut'

import { AppContext } from '@island.is/financial-aid-web/osk/src/components/AppProvider/AppProvider'

const MainPage = () => {
  const logOut = useLogOut()

  const {
    myApplication,
    loading,
    error,
    municipality,
    setMunicipalityById,
    user,
  } = useContext(AppContext)

  const isUserSpouse = user?.spouse?.hasPartnerApplied

  useEffect(() => {
    if (myApplication && myApplication.municipalityCode) {
      setMunicipalityById(myApplication.municipalityCode)
    }
  }, [myApplication])

  return (
    <>
      <ContentContainer>
        <Text as="h1" variant="h2" marginBottom={1}>
          {isUserSpouse ? 'Aðstoð maka þíns' : 'Aðstoðin þín '}
        </Text>

        {myApplication && myApplication?.state && (
          <>
            <InProgress
              application={myApplication}
              isApplicant={!isUserSpouse}
            />

            <Approved
              isStateVisible={myApplication.state === ApplicationState.APPROVED}
              state={myApplication.state}
              amount={myApplication.amount}
              events={myApplication.applicationEvents}
              isApplicant={!isUserSpouse}
            />

            <Rejected
              isStateVisible={myApplication.state === ApplicationState.REJECTED}
              state={myApplication.state}
              rejectionComment={myApplication?.rejection}
              isApplicant={!isUserSpouse}
            />

            <Timeline
              state={myApplication.state}
              created={myApplication.created}
              modified={myApplication.modified}
            />
          </>
        )}

        {error && (
          <Text>
            Umsókn ekki fundin eða eitthvað fór úrskeiðis <br />
            vinsamlegast reyndu síðar
          </Text>
        )}
        {loading && <LoadingDots />}

        <MoreActions
          rulesPage={municipality?.rulesHomepage}
          email={municipality?.email}
        />
      </ContentContainer>
      <Footer
        onPrevButtonClick={() => {
          logOut()
        }}
        prevButtonText="Skrá sig út"
        previousIsDestructive={true}
        hideNextButton={true}
      />
    </>
  )
}

export default MainPage
