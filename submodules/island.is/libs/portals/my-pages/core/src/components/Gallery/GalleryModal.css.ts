import { theme, themeUtils, white } from '@island.is/island-ui/theme'
import { style } from '@vanilla-extract/css'

export const container = style({
  height: '100%',
  width: '100%',
  display: 'grid',
  borderRadius: theme.border.radius.large,
  gridTemplateRows: `${theme.spacing[8]}px 2fr ${theme.spacing[1]}px 1fr`,
  gridTemplateColumns: `${theme.spacing[6]}px 1fr ${theme.spacing[6]}px`,
  gridTemplateAreas:
    '"header header exit""left main right" ". counter ." " swiper swiper swiper"',
  rowGap: '5px',
  backgroundColor: white,

  ...themeUtils.responsiveStyle({
    md: {
      gridTemplateRows: `${theme.spacing[8]}px 4fr ${theme.spacing[2]}px 1fr`,
      gridTemplateColumns: `${theme.spacing[15]}px 1fr ${theme.spacing[15]}px`,
    },
    lg: {
      gridTemplateRows: `${theme.spacing[8]}px 5fr ${theme.spacing[2]}px 1fr`,
      gridTemplateColumns: `${theme.spacing[15]}px 1fr ${theme.spacing[15]}px`,
    },
  }),
})

export const modal = style({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  aspectRatio: '1/1',
  maxWidth: theme.contentWidth.medium,
  borderRadius: theme.border.radius.large,
  boxShadow: '0px 4px 70px rgba(0, 97, 255, 0.1)',

  ...themeUtils.responsiveStyle({
    xs: {
      width: '400px',
    },
    sm: {
      width: '440px',
    },
    md: {
      width: '648px',
    },
    lg: {
      width: '800px',
    },
  }),
})

export const header = style({
  gridArea: 'header',
  overflow: 'visible',
})

export const main = style({
  gridArea: 'main',
  contain: 'layout',
  position: 'relative',
  zIndex: theme.zIndex.base,
})

export const imageWrap = style({
  position: 'relative',
  aspectRatio: '1/1',
  height: '90%',
})

export const closeButton = style({
  gridArea: 'exit',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const rightCaret = style({
  gridArea: 'right',
})

export const leftCaret = style({
  gridArea: 'left',
})

export const carets = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const swiper = style({
  gridArea: 'swiper',
  //reverse the swiper negative margins
  paddingLeft: `${theme.grid.gutter.mobile * 2}px`,
  paddingRight: `${theme.grid.gutter.mobile * 2}px`,
})

export const counter = style({
  gridArea: 'counter',
})

export const galleryButtonThumbnail = style({
  width: 'auto',
})
