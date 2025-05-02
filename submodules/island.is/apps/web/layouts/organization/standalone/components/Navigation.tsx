import { useWindowSize } from 'react-use'

import {
  Box,
  GridColumn,
  GridContainer,
  GridRow,
  Hidden,
  Inline,
  LinkV2,
  Text,
} from '@island.is/island-ui/core'
import { theme } from '@island.is/island-ui/theme'
import { LanguageToggler, SearchInput } from '@island.is/web/components'
import { useI18n } from '@island.is/web/i18n'

import { MobileMenu } from './MobileMenu'
import * as styles from './Navigation.css'

export interface NavigationProps {
  logo?: string
  title?: string
  fullWidth?: boolean
  logoAltText?: string
  links: { label: string; href: string }[]
  homeHref: string
  organizationSlug?: string
}

export const Navigation: React.FC<React.PropsWithChildren<NavigationProps>> = ({
  logo,
  title,
  logoAltText,
  homeHref,
  links,
  organizationSlug,
}) => {
  const { activeLocale } = useI18n()
  const { width } = useWindowSize()

  return (
    <GridContainer>
      <GridRow className={styles.gridRow} alignItems="center">
        <GridColumn span={['6/12', '6/12', '6/12', '3/12']}>
          <LinkV2 href={homeHref}>
            <Inline space={[2, 2, 3]} alignY="center" flexWrap="nowrap">
              {!!logo && (
                <img src={logo} alt={logoAltText} className={styles.logo} />
              )}
              <Text
                variant={width < theme.breakpoints.sm ? 'h3' : 'h2'}
                as="h1"
              >
                {title}
              </Text>
            </Inline>
          </LinkV2>
        </GridColumn>
        <GridColumn span="6/12" hiddenBelow="lg">
          <Inline space={3} alignY="center" justifyContent="center">
            {links.map((link) => (
              <LinkV2 key={link.label} href={link.href}>
                <Text variant="h4" color="blue600">
                  {link.label}
                </Text>
              </LinkV2>
            ))}
          </Inline>
        </GridColumn>
        <GridColumn span={['6/12', '6/12', '6/12', '3/12']}>
          <Hidden below="lg">
            <Box display="flex" alignItems="center" justifyContent="flexEnd">
              <SearchInput
                size="medium"
                activeLocale={activeLocale}
                placeholder={activeLocale === 'is' ? 'Leit' : 'Search'}
                organization={organizationSlug}
              />
              <Box marginLeft={[1, 1, 1, 2]}>
                <LanguageToggler />
              </Box>
            </Box>
          </Hidden>
          <Hidden above="md">
            <Box display="flex" alignItems="center" justifyContent="flexEnd">
              <MobileMenu links={links} homeHref={homeHref} homeLabel={title} />
            </Box>
          </Hidden>
        </GridColumn>
      </GridRow>
    </GridContainer>
  )
}
