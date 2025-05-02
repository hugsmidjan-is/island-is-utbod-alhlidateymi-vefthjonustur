import { style } from '@vanilla-extract/css'
import { theme } from '@island.is/island-ui/theme'

export const container = style({
  position: 'fixed',
  left: 0,
  bottom: 0,
  top: 0,
  paddingLeft: theme.spacing[3],
  paddingRight: theme.spacing[3],
  backgroundColor: theme.color.purple100,
  width: '250px',
  minHeight: '100%',
  paddingTop: theme.spacing[5],
  paddingBottom: theme.spacing[7],
  display: 'grid',
  zIndex: 10,
  transform: 'translate3d(-120%, 0, 0)',
  transition: 'transform 250ms ease',
  gridTemplateRows: 'max-content auto max-content',
  alignItems: 'center',
  overflowY: 'scroll',
  overflowX: 'hidden',
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      transform: 'translate3d(0%, 0, 0)',
      width: '25.4%',
    },
    [`screen and (min-width: ${theme.breakpoints.lg}px)`]: {
      paddingLeft: theme.spacing[6],
      paddingRight: theme.spacing[6],
    },
    [`screen and (min-width: ${theme.breakpoints.xl}px)`]: {
      paddingLeft: 'calc((100vw - 1440px)/2 + 48px)',
      width: 'calc((100vw - 1440px)/2 + (0.254 * 1440px))',
    },
  },
})

export const adminStyles = style({
  backgroundColor: theme.color.dark100,
})

export const showNavInMobile = style({
  '@media': {
    [`screen and (max-width: ${theme.breakpoints.md}px)`]: {
      transform: 'translate3d(0%, 0, 0)',
    },
  },
})

export const logoContainer = style({
  maxWidth: '160px',
})
export const textContainer = style({
  maxWidth: '270px',
})

export const logoMunicipalityContainer = style({
  display: 'grid',
  gridTemplateColumns: 'max-content auto',
  alignItems: 'center',
  columnGap: theme.spacing[2],
})

export const logoMunicipality = style({
  width: theme.spacing[4],
})

export const personIcon = style({
  marginRight: theme.spacing[1],
})
