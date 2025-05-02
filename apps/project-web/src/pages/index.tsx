import { Hero } from '@hxm/ui/components/Hero/Hero'
import { ImagePanel } from '@hxm/ui/components/ImagePanel/ImagePanel'
import { LinkCard } from '@hxm/ui/components/LinkCard/LinkCard'
import { Section } from '@hxm/ui/components/Section/Section'

import { GridColumn, GridRow, Stack } from '@island.is/island-ui/core'

export default function PlayGroundPage() {
  return (
    <>
      <Hero
        title="Útboðsverkefni 2025"
        description="Halló heimur!"
        image={{
          src: '/assets/banner-image.svg',
          alt: 'Image alt',
        }}
      >
        <GridRow>
          <GridColumn span={['12/12', '4/12']} paddingBottom={[2, 0]}>
            <LinkCard
              href={'/'}
              title="Verkefni 1"
              description="Eitthvað um verkefni 1."
              image={{
                src: '/assets/ritstjorn-image.svg',
              }}
            />
          </GridColumn>
          <GridColumn span={['12/12', '4/12']} paddingBottom={[2, 0]}>
            <LinkCard
              href={'/'}
              title="Verkefni 2"
              description="Eitthvað um verkefni 2."
              image={{
                src: '/assets/utgafa-image.svg',
              }}
            />
          </GridColumn>
          <GridColumn span={['12/12', '4/12']} paddingBottom={[0]}>
            <LinkCard
              href={'/'}
              title="Verkefni 3"
              description="Eitthvað um verkefni 3."
              image={{
                src: '/assets/heildar-image.svg',
              }}
            />
          </GridColumn>
        </GridRow>
      </Hero>
      <Section bleed variant="blue"></Section>
      <Section>
        <Stack space={4}>
          <ImagePanel
            align="right"
            title="Eitthvað eitthvað"
            description="Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            link="#"
            linkText="Opna virkni"
            image={{
              src: '/assets/image-with-text-1.svg',
              alt: 'Image alt',
            }}
          />
          <ImagePanel
            title="Eitthvað annað"
            description="Rorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
            link="#"
            linkText="Sækja virkni"
            image={{
              src: '/assets/image-with-text-2.svg',
              alt: 'Image alt',
            }}
          />
        </Stack>
      </Section>
    </>
  )
}
