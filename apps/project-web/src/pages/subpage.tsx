import { Hero } from '@hxm/ui/components/Hero/Hero'

import { GridColumn, GridContainer, GridRow } from '@island.is/island-ui/core'

import { Route, Routes } from '../lib/constants'
import { routesToBreadcrumbs } from '../lib/utils'

export default function Subpage() {
  const breadcrumbs = routesToBreadcrumbs(Routes, Route.INDEX)

  return (
    <>
      <Hero
        breadcrumbs={{ items: breadcrumbs }}
        variant="small"
        title="Undirsíða"
        description="Hæ heimur."
        image={{
          src: '/assets/banner-image-small-2.svg',
          alt: 'Image alt',
        }}
      ></Hero>
      <GridContainer>
        <GridRow>
          <GridColumn span={['12/12', '10/12']} offset={['0', '1/12']}>
            <p>Foo bar</p>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </>
  )
}
