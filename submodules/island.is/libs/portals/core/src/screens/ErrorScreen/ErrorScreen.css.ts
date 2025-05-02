import { themeUtils } from '@island.is/island-ui/theme'
import { style } from '@vanilla-extract/css'

export const img = style({
  minHeight: '20vh',
  ...themeUtils.responsiveStyle({
    md: {
      maxHeight: '300px',
      minHeight: '250px',
    },
  }),
})

export const errorScreenTextContainer = style({
  maxWidth: 660,
})
