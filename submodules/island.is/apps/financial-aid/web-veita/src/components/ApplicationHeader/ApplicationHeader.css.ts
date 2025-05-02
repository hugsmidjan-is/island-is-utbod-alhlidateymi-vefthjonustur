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

export const button = style({
  color: theme.color.blue400,
  textDecoration: 'underline',
  marginRight: '8px',
  fontSize: '14px',
  marginBottom: '1px',
  display: 'flex',
  alignItems: 'center',
  selectors: {
    '&:hover': {
      color: theme.color.blueberry400,
    },
  },
})
