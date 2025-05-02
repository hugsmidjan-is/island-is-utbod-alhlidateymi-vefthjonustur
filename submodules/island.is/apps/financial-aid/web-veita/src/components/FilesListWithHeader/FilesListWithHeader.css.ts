import { style } from '@vanilla-extract/css'
import { theme } from '@island.is/island-ui/theme'

export const widthAlmostFull = style({
  gridColumn: '1/-1',
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.xl}px)`]: {
      gridColumn: 'span 7',
    },
  },
})

export const widthFull = style({
  gridColumn: '1/-1',
})
