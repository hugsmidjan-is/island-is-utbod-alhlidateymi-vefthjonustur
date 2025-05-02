import { style } from '@vanilla-extract/css'

export const logo = style({
  width: 150,
  display: 'inline-block',
  textAlign: 'center',
})

export const invertedLogo = style({
  filter: 'invert(0.9)',
})
