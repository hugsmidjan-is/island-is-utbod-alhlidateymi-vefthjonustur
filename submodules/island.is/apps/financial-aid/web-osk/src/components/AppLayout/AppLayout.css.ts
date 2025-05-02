import { style } from '@vanilla-extract/css'
import { theme } from '@island.is/island-ui/theme'

export const processContainer = style({
  minHeight: 'calc(100vh - 112px)',
  display: 'flex',
  '@media': {
    [`screen and (max-width: ${theme.breakpoints.md}px)`]: {
      paddingTop: `0px`,
      paddingBottom: `0px`,
    },
  },
})

export const gridContainer = style({
  height: 'inherit',
  '@media': {
    [`screen and (max-width: ${theme.breakpoints.md}px)`]: {
      paddingLeft: `0px`,
      paddingRight: `0px`,
    },
  },
})

export const gridRowContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gridTemplateRows: 'max-content auto',
  height: '100%',
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridTemplateRows: 'auto',
      columnGap: theme.spacing[3],
    },
  },
})

export const sidebarContent = style({
  gridColumn: 'span 3',
  display: 'grid',
  gridTemplateRows: 'auto max-content',
  height: '100%',
  '@media': {
    [`screen and (max-width: ${theme.breakpoints.md}px)`]: {
      order: -1,
      marginLeft: `0px`,
      marginBottom: `-8px`,
      overflowX: 'scroll',
      overflowY: 'hidden',
      scrollbarWidth: 'none',

      selectors: {
        [`&::-webkit-scrollbar`]: {
          display: 'none',
        },
      },
    },
  },
})

export const formContainer = style({
  gridColumn: 'span 9',
  display: 'grid',
  gridTemplateRows: 'auto max-content max-content',
  paddingTop: theme.spacing[3],
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      minHeight: '880px',
      paddingTop: theme.spacing[10],
      gridTemplateColumns: 'repeat(10, 1fr)',
      columnGap: theme.spacing[3],
    },
  },
})

export const logo = style({
  display: 'none',
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      display: 'block',
    },
  },
})
