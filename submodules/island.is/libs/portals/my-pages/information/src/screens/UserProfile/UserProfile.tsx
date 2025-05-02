import { ISLANDIS_SLUG, IntroHeader, m } from '@island.is/portals/my-pages/core'
import ProfileForm from '../../components/PersonalInformation/Forms/ProfileForm/ProfileForm'
import { useUserProfile } from '@island.is/portals/my-pages/graphql'
import { useLocale } from '@island.is/localization'
import { useUserInfo } from '@island.is/react-spa/bff'
import { msg } from '../../lib/messages'

const UserProfile = () => {
  const { data } = useUserProfile()
  const { formatMessage } = useLocale()
  const userInfo = useUserInfo()

  return (
    <>
      <IntroHeader
        marginBottom={2}
        title={formatMessage(m.mySettings)}
        intro={formatMessage(msg.overlayIntro)}
        serviceProviderTooltip={formatMessage(m.userProfileTooltip)}
        serviceProviderSlug={ISLANDIS_SLUG}
      />
      <ProfileForm
        showIntroText={false}
        showDetails={!!data}
        title={userInfo?.profile?.name || ''}
      />
    </>
  )
}

export default UserProfile
