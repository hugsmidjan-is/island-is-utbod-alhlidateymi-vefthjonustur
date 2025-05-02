import { useLocale, useNamespaces } from '@island.is/localization'
import { useParams } from 'react-router-dom'
import {
  HUGVERKASTOFAN_SLUG,
  IntroHeader,
  TableGrid,
  UserInfoLine,
  formatDate,
  m,
} from '@island.is/portals/my-pages/core'
import { ipMessages } from '../../lib/messages'
import {
  Accordion,
  AccordionItem,
  Box,
  Divider,
  Stack,
  Text,
} from '@island.is/island-ui/core'
import Timeline from '../../components/Timeline/Timeline'
import Image from '../../components/Image/Image'
import chunk from 'lodash/chunk'
import { AudioPlayer, VideoPlayer } from '@island.is/portals/my-pages/core'
import { TrademarkType } from '@island.is/api/schema'
import { isDefined } from '@island.is/shared/utils'
import { useGetIntellectualPropertiesTrademarkByIdQuery } from './IntellectualPropertiesTrademarkDetail.generated'
import { Problem } from '@island.is/react-spa/shared'
import { orderTimelineData } from '../../utils/timelineMapper'
import { useMemo } from 'react'
import { makeArrayEven } from '../../utils/makeArrayEven'

type UseParams = {
  id: string
}

const IntellectualPropertiesTrademarkDetail = () => {
  useNamespaces('sp.intellectual-property')
  const { formatMessage } = useLocale()
  const { id } = useParams() as UseParams

  const { data, loading, error } =
    useGetIntellectualPropertiesTrademarkByIdQuery({
      variables: {
        input: {
          key: id,
        },
      },
    })

  const ip = data?.intellectualPropertiesTrademark

  const categories = ip?.markCategories?.filter(
    (c) => !!c.categoryDescription && !!c.categoryNumber,
  )

  const orderedDates = useMemo(
    () =>
      orderTimelineData([
        {
          date: ip?.lifecycle.applicationDate ?? undefined,
          message: formatMessage(ipMessages.application),
        },
        {
          date: ip?.lifecycle.maxValidObjectionDate ?? undefined,
          message: formatMessage(ipMessages.maxValidObjectionDate),
        },
        {
          date: ip?.lifecycle.registrationDate ?? undefined,
          message: formatMessage(ipMessages.registration),
        },
        {
          date: ip?.lifecycle.expiryDate ?? undefined,
          message: formatMessage(ipMessages.expires),
        },
        {
          date: ip?.lifecycle.publishDate ?? undefined,
          message: formatMessage(ipMessages.publish),
        },
      ]),
    [formatMessage, ip?.lifecycle],
  )

  const extraInfoArray = useMemo(() => {
    if (ip) {
      const extraInfoArray = [
        ip?.applicationNumber
          ? {
              title: formatMessage(ipMessages.applicationNumber),
              value: ip?.applicationNumber ?? '',
            }
          : null,
        ip?.imageCategories
          ? {
              title: formatMessage(ipMessages.imageCategories),
              value: ip.imageCategories,
            }
          : null,
        ip?.registrationNumber
          ? {
              title: formatMessage(ipMessages.registrationNumber),
              value: ip.registrationNumber,
            }
          : null,
        ip?.isColorMark
          ? {
              title: formatMessage(ipMessages.colorMark),
              value: ip?.isColorMark
                ? formatMessage(m.yes)
                : formatMessage(m.no),
            }
          : null,
      ].filter(isDefined)

      return makeArrayEven(extraInfoArray, { title: '', value: '' })
    }
  }, [formatMessage, ip])

  const mapTrademarkToHero = (
    type: TrademarkType,
    mediaUrl: string,
    mediaText: string,
  ) => {
    switch (type) {
      case TrademarkType.TEXT:
        return (
          <Box>
            <Text variant="eyebrow" as="div" color="purple400">
              {formatMessage(ipMessages.text)}
            </Text>
            <Image url={mediaUrl} title={mediaText} />
          </Box>
        )
      case TrademarkType.MULTIMEDIA:
        return (
          <Box>
            <Text variant="eyebrow" as="div" color="purple400" marginBottom={2}>
              {formatMessage(ipMessages.video)}
            </Text>
            <VideoPlayer url={mediaUrl} title={mediaText} />
          </Box>
        )
      case TrademarkType.ANIMATION:
        return (
          <Box>
            <Text variant="eyebrow" as="div" color="purple400">
              {formatMessage(ipMessages.animation)}
            </Text>
            <Image
              url={mediaUrl}
              title={mediaText}
              height="352px"
              width="352px"
              isAnimation
            />
          </Box>
        )

      case TrademarkType.IMAGE:
      case TrademarkType.TEXT_AND_IMAGE:
        return (
          <Box>
            <Text variant="eyebrow" as="div" color="purple400" marginBottom={2}>
              {formatMessage(ipMessages.image)}
            </Text>
            <Image
              url={mediaUrl}
              title={mediaText}
              height="352px"
              width="352px"
              isRemoteUrl
            />
          </Box>
        )
      case TrademarkType.AUDIO:
        return (
          <Box>
            <Text
              variant="eyebrow"
              as="div"
              paddingBottom={2}
              color="purple400"
            >
              {formatMessage(ipMessages.audio)}
            </Text>
            <AudioPlayer url={mediaUrl} title={mediaText} />
          </Box>
        )
    }
  }

  return (
    <>
      <Box marginBottom={[1, 1, 3]}>
        <IntroHeader
          title={id}
          serviceProviderSlug={HUGVERKASTOFAN_SLUG}
          serviceProviderTooltip={formatMessage(
            m.intellectualPropertiesTooltip,
          )}
        />
      </Box>
      {error && !loading && <Problem error={error} noBorder={false} />}
      {!error && !loading && !ip && (
        <Problem
          type="no_data"
          noBorder={false}
          title={formatMessage(ipMessages.notFound, {
            arg: formatMessage(ipMessages.trademark),
          })}
          message={formatMessage(ipMessages.notFoundText, {
            arg: formatMessage(ipMessages.trademark).toLowerCase(),
          })}
          imgSrc="./assets/images/sofa.svg"
        />
      )}
      {!error && (ip || loading) && (
        <Stack space="containerGutter">
          {ip?.type &&
            ip?.media?.mediaPath &&
            mapTrademarkToHero(ip.type, ip.media.mediaPath, ip?.text ?? '')}
          <Stack space="p2">
            <UserInfoLine
              title={formatMessage(ipMessages.baseInfo)}
              label={ipMessages.name}
              content={ip?.text ? ip.text : ip?.id ?? ''}
              loading={loading}
            />
            <Divider />
            <UserInfoLine
              label={ipMessages.type}
              content={ip?.typeReadable ?? ''}
              loading={loading}
            />
            <Divider />
            <UserInfoLine
              label={m.status}
              content={ip?.status ?? ''}
              loading={loading}
            />
            <Divider />
            <UserInfoLine
              label={ipMessages.make}
              content={ip?.subType ?? ''}
              loading={loading}
            />
            <Divider />
          </Stack>
          {!error && orderedDates.length > 0 && (
            <Box>
              <Timeline
                title={formatMessage(ipMessages.timeline)}
                maxDate={orderedDates[orderedDates.length - 1].date}
                minDate={orderedDates[0].date}
              >
                {orderedDates.map((datapoint) => (
                  <Stack key="list-item-application-date" space="smallGutter">
                    <Text variant="h5">{formatDate(datapoint.date)}</Text>
                    <Text>{datapoint.message}</Text>
                  </Stack>
                ))}
              </Timeline>
              <TableGrid
                title={formatMessage(ipMessages.information)}
                dataArray={chunk(extraInfoArray, 2)}
              />
            </Box>
          )}
          <Stack space="p2">
            <UserInfoLine
              title={formatMessage(ipMessages.owner)}
              label={formatMessage(ipMessages.name)}
              content={ip?.markOwners?.[0]?.name ?? ''}
              loading={loading}
            />
            <Divider />
            <UserInfoLine
              label={formatMessage(ipMessages.address)}
              content={ip?.markOwners?.[0]?.addressFull ?? ''}
              loading={loading}
            />
            <Divider />
          </Stack>
          {ip?.markAgent?.name && ip?.markAgent.addressFull && (
            <Stack space="p2">
              <UserInfoLine
                title={formatMessage(ipMessages.agent)}
                label={formatMessage(ipMessages.name)}
                content={ip?.markAgent?.name ?? ''}
                loading={loading}
              />
              <Divider />
              <UserInfoLine
                label={formatMessage(ipMessages.address)}
                content={ip?.markAgent?.addressFull ?? ''}
                loading={loading}
              />
              <Divider />
            </Stack>
          )}

          {!!categories?.length && (
            <Box>
              <Text variant="eyebrow" color="purple400">
                {formatMessage(ipMessages.productsAndServices)}
              </Text>
              <Accordion dividerOnTop={false} space={3}>
                {ip?.markCategories
                  ?.map((category, index) => {
                    if (!category.categoryNumber) {
                      return null
                    }

                    return (
                      <AccordionItem
                        key={`${category.categoryNumber}-${index}}`}
                        id={category.categoryNumber}
                        label={`${formatMessage(ipMessages.category)} ${
                          category.categoryNumber
                        }`}
                      >
                        <Text>{category.categoryDescription ?? ''}</Text>
                      </AccordionItem>
                    )
                  })
                  .filter(isDefined)}
              </Accordion>
            </Box>
          )}
        </Stack>
      )}
    </>
  )
}

export default IntellectualPropertiesTrademarkDetail
