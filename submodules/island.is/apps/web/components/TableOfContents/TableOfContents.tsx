import { FC, useMemo } from 'react'

import { TableOfContents } from '@island.is/island-ui/core'
import { Slice } from '@island.is/web/graphql/schema'
import { scrollTo } from '@island.is/web/hooks/useScrollSpy'

export const TOC: FC<
  React.PropsWithChildren<{ slices: Slice[]; title: string }>
> = ({ slices, title }) => {
  const navigation = useMemo(
    () =>
      slices
        .map((slice) => ({
          id: slice.id,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore make web strict
          text: slice.json?.title ?? slice.title ?? slice.leftTitle ?? '',
        }))
        .filter((item) => !!item.text),
    [slices],
  )
  if (navigation.length === 0) {
    return null
  }
  return (
    <TableOfContents
      tableOfContentsTitle={title}
      headings={navigation.map(({ id, text }) => ({
        headingTitle: text,
        headingId: id,
      }))}
      onClick={(id) => scrollTo(id, { smooth: true })}
    />
  )
}
