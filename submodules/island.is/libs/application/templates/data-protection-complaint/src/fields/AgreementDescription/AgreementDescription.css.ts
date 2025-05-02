import { style } from '@vanilla-extract/css'
import { theme } from '@island.is/island-ui/theme'

export const link = style({
  color: theme.color.blue400,
  selectors: {
    '&:hover': {
      backgroundColor: theme.color.purple100,
    },
  },
})
