import {
  Box,
  Button,
  FocusableBox,
  Hidden,
  Logo,
  Text,
} from '@island.is/island-ui/core'
import { useLocale, useNamespaces } from '@island.is/localization'
import { useUserInfo } from '@island.is/react-spa/bff'
import { UserLanguageSwitcher } from '@island.is/shared/components'

interface OnboardingHeaderProps {
  dropOnboarding: () => void
  hideClose: boolean
}

export const OnboardingHeader = ({
  dropOnboarding,
  hideClose,
}: OnboardingHeaderProps) => {
  useNamespaces('sp.settings')
  const { formatMessage } = useLocale()
  const user = useUserInfo()
  const closeWindow = formatMessage({
    id: 'sp.settings:close-window',
    defaultMessage: 'Loka glugga',
  })
  return (
    <Box
      display="flex"
      justifyContent="spaceBetween"
      alignItems="center"
      height="full"
      background="white"
      paddingX={[2, 2, 4, 4, 6]}
      paddingBottom={[2, 4]}
    >
      <FocusableBox component="div">
        <Hidden above="md">
          <Logo width={40} iconOnly />
        </Hidden>
        <Hidden below="lg">
          <Logo width={160} />
        </Hidden>
      </FocusableBox>
      {!hideClose && (
        <Box display="flex" flexDirection="row" alignItems="center">
          {user && <UserLanguageSwitcher />}
          <Box
            paddingLeft={5}
            paddingRight={2}
            onClick={dropOnboarding}
            cursor="pointer"
            type="button"
            aria-label={closeWindow}
          >
            <Text variant="medium">{closeWindow}</Text>
          </Box>
          <Button
            colorScheme="light"
            circle
            icon="close"
            onClick={dropOnboarding}
            aria-label={closeWindow}
          ></Button>
        </Box>
      )}
    </Box>
  )
}
