import { style } from '@vanilla-extract/css'
import { theme } from '@island.is/island-ui/theme'

export const modal = style({
  display: 'block',
  width: '100%',
  maxWidth: '752px',
  boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.08)',
  borderRadius: '12px',
  padding: theme.spacing[4],
})
