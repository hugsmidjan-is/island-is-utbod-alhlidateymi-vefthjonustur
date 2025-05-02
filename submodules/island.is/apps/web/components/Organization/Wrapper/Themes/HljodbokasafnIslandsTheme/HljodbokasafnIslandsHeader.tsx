import React, { useMemo } from 'react'

import { ResponsiveSpace } from '@island.is/island-ui/core'
import { DefaultHeader, DefaultHeaderProps } from '@island.is/web/components'
import { OrganizationPage } from '@island.is/web/graphql/schema'
import { useLinkResolver, useNamespace } from '@island.is/web/hooks'

import * as styles from './HljodbokasafnIslandsHeader.css'

interface HeaderProps {
  organizationPage: OrganizationPage
  logoAltText: string
}

const HljodbokasafnIslandsHeader: React.FC<
  React.PropsWithChildren<HeaderProps>
> = ({ organizationPage, logoAltText }) => {
  const { linkResolver } = useLinkResolver()
  const namespace = useMemo(
    () => JSON.parse(organizationPage.organization?.namespace?.fields || '{}'),
    [organizationPage.organization?.namespace?.fields],
  )
  const n = useNamespace(namespace)

  const themeProp = organizationPage.themeProperties

  return (
    <DefaultHeader
      title={organizationPage.title}
      underTitle={n(
        'hljodbokasafnIslandsHeaderUnderTitle',
        'Fyrir blinda, sjónskerta og fólk með lestrarhömlun',
      )}
      image={n(
        'hljodbokasafnIslandsHeaderImage',
        'https://images.ctfassets.net/8k0h54kbe6bj/3tzrR4b3oS4x84sAfGfOlk/7a69079d123471048e6ef9130d962313/mynd_HBS_1.png',
      )}
      imagePadding={themeProp.imagePadding ?? '0'}
      fullWidth={false}
      imageIsFullHeight={themeProp.imageIsFullHeight ?? false}
      imageObjectFit={
        themeProp?.imageObjectFit === 'cover' ? 'cover' : 'contain'
      }
      imageObjectPosition={
        themeProp.imageObjectPosition === 'left'
          ? 'left'
          : themeProp.imageObjectPosition === 'right'
          ? 'right'
          : 'center'
      }
      titleColor={
        (themeProp.textColor as DefaultHeaderProps['titleColor']) ?? 'dark400'
      }
      logo={organizationPage.organization?.logo?.url}
      logoHref={linkResolver('organizationpage', [organizationPage.slug]).href}
      className={styles.gridContainer}
      logoAltText={logoAltText}
      titleSectionPaddingLeft={
        organizationPage.themeProperties
          .titleSectionPaddingLeft as ResponsiveSpace
      }
      mobileBackground={organizationPage.themeProperties.mobileBackgroundColor}
    />
  )
}

export default HljodbokasafnIslandsHeader
