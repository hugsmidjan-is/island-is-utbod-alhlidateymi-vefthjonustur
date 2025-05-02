import { style } from '@vanilla-extract/css'

import { theme, themeUtils } from '@island.is/island-ui/theme'

export const footerBg = style({
  background: 'linear-gradient(99.09deg, #003D85 23.68%, #4E8ECC 123.07%)',
})
export const footerItemFirst = style({
  '@media': {
    [`screen and (max-width: ${theme.breakpoints.lg}px)`]: {
      maxWidth: 'none',
      flexBasis: '100%',
    },
  },
})

export const serviceWebFooterBg = style({
  background: theme.color.purple100,
})

export const linkMaxWidth = style({
  ...themeUtils.responsiveStyle({
    lg: {
      maxWidth: '200px',
    },
  }),
})
