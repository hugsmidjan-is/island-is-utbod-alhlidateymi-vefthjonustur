import React from 'react'

import { SliceType } from '@island.is/island-ui/contentful'
import {
  Box,
  Button,
  FocusableBox,
  Link,
  Stack,
  Text,
  TopicCard,
} from '@island.is/island-ui/core'
import { BorderAbove } from '@island.is/web/components'
import { Article, FeaturedArticles } from '@island.is/web/graphql/schema'
import { useNamespace } from '@island.is/web/hooks'
import { LinkType, useLinkResolver } from '@island.is/web/hooks/useLinkResolver'
import { hasProcessEntries } from '@island.is/web/utils/article'
import { webRichText } from '@island.is/web/utils/richText'

interface SliceProps {
  slice: FeaturedArticles
  namespace?: Record<string, string>
}

export const FeaturedArticlesSlice: React.FC<
  React.PropsWithChildren<SliceProps>
> = ({ slice, namespace }) => {
  const n = useNamespace(namespace)
  const { linkResolver } = useLinkResolver()
  const labelId = 'sliceTitle-' + slice.id

  const sortedArticles =
    slice.sortBy === 'importance'
      ? slice.resolvedArticles.slice().sort((a, b) => {
          if (
            typeof a.importance !== 'number' ||
            typeof b.importance !== 'number'
          ) {
            return a.title.localeCompare(b.title)
          }
          return a.importance > b.importance
            ? -1
            : a.importance === b.importance
            ? a.title.localeCompare(b.title)
            : 1
        })
      : slice.resolvedArticles

  return (
    (!!slice.articles.length || !!slice.resolvedArticles.length) && (
      <section key={slice.id} id={slice.id} aria-labelledby={labelId}>
        {slice.hasBorderAbove && <BorderAbove />}
        <Box>
          <Text as="h2" variant="h3" paddingBottom={3} id={labelId}>
            {slice.title}
          </Text>
          {slice.introText && slice.introText.length > 0 && (
            <Box paddingBottom={4}>
              {webRichText((slice.introText ?? []) as SliceType[])}
            </Box>
          )}
          <Stack space={2}>
            {(slice.automaticallyFetchArticles
              ? sortedArticles
              : slice.articles
            ).map((article) => {
              const url = linkResolver('Article' as LinkType, [article.slug])

              return (
                <FocusableBox
                  key={article.slug}
                  borderRadius="large"
                  href={url.href}
                >
                  <TopicCard
                    {...(hasProcessEntries(article as Article) ||
                    article.processEntryButtonText
                      ? {
                          tag: n(
                            article.processEntryButtonText || 'application',
                            'Umsókn',
                          ),
                        }
                      : {})}
                  >
                    {article.title}
                  </TopicCard>
                </FocusableBox>
              )
            })}
          </Stack>
          {!!slice.link && (
            <Box display="flex" justifyContent="flexEnd" paddingTop={6}>
              <Link href={slice.link.url}>
                <Button
                  icon="arrowForward"
                  iconType="filled"
                  type="button"
                  variant="text"
                  as="span"
                >
                  {n('seeAllServices', 'Sjá allt efni')}
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </section>
    )
  )
}
