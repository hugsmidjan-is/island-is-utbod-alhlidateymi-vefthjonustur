/**
 * Temp mock data for notifications domain, to be replaced with real client.
 */
import { User } from '@island.is/auth-nest-tools'
import {
  Notification,
  NotificationsInput,
  NotificationsResponse,
} from './notifications.model'
// import { RenderedNotificationDtoStatusEnum } from '@island.is/clients/user-notification'
import { Locale } from '@island.is/shared/types'
import { faker } from '@island.is/shared/mocking'

type MockKey = string

const generated: Map<MockKey, Notification[]> = new Map()

const DEFAULT_MOCK_COUNT = 100
const PAGE_SIZE = 10

const toBase64 = (input: string) => Buffer.from(input).toString('base64')

const decodeBase64 = (input: string) =>
  Buffer.from(input, 'base64').toString('ascii')

function generateKey(user: User | null, locale: Locale): MockKey {
  const key = `${user?.nationalId ?? 'anon'}-${locale}`

  return key
}

export function generateMockNotification(user: User | null): Notification {
  const uuid = faker.datatype.uuid()
  const isRead = faker.datatype.boolean()
  const sent = faker.date.past()
  const num = faker.datatype.number(1000)
  const senderId = faker.datatype.string(10)

  return {
    id: num,
    notificationId: uuid,
    metadata: {
      sent,
      read: isRead,
      // status: isRead
      //   ? RenderedNotificationDtoStatusEnum.Read
      //   : RenderedNotificationDtoStatusEnum.Unread,
    },
    sender: {
      id: senderId,
    },
    recipient: {
      nationalId: user?.nationalId ?? '0000000000',
    },
    message: {
      title: faker.lorem.sentence(),
      body: faker.lorem.lines(2),
      link: {
        uri: `islandis://documents/${uuid}`,
      },
    },
  }
}

export function getMockNotifications(
  locale: Locale,
  user: User | null,
): Notification[] | null {
  const key: MockKey = generateKey(user, locale)

  const cached = generated.get(key)

  return cached ?? null
}

export function generateMockNotifications(
  locale: Locale,
  user: User | null,
  count: number = DEFAULT_MOCK_COUNT,
): Notification[] {
  const data = Array.from({ length: count }, () =>
    generateMockNotification(user),
  )

  const key = generateKey(user, locale)
  generated.set(key, data)

  return data
}

export function mockNotificationsResponse(
  notifications: Notification[],
  paging?: NotificationsInput,
): NotificationsResponse {
  const totalCount = notifications.length
  const unreadCount = 1 //notifications.filter(
  //   (notification) =>
  //     notification.metadata.status === RenderedNotificationDtoStatusEnum.Unread,
  // ).length

  const afterInt = paging?.after ? parseInt(paging?.after) : undefined
  const beforeInt = paging?.before ? parseInt(paging?.before) : undefined

  const after = afterInt ? decodeBase64(String(afterInt)) : undefined

  const indexOfAfterItem = after
    ? notifications.findIndex(
        (notification) => notification.notificationId === after,
      ) + 1
    : 0

  const pageSize = beforeInt ?? PAGE_SIZE

  const paginated = notifications.slice(
    indexOfAfterItem,
    indexOfAfterItem + pageSize,
  )

  const startCursor = paginated[0]?.notificationId
    ? toBase64(paginated[0].notificationId)
    : undefined
  const endCursor = paginated[paginated.length - 1]?.notificationId
    ? toBase64(paginated[paginated.length - 1].notificationId)
    : undefined
  const hasNextPage = indexOfAfterItem + pageSize < totalCount
  const hasPreviousPage = indexOfAfterItem > 0

  return {
    data: paginated,
    totalCount,
    unreadCount,
    pageInfo: {
      hasNextPage,
      hasPreviousPage,
      startCursor,
      endCursor,
    },
  }
}

export function getMockNotification(
  locale: Locale,
  user: User | null,
  id: number,
): Notification | null {
  const notifications = generated.get(generateKey(user, locale))

  return notifications?.find((notification) => notification.id === id) ?? null
}

export function markMockNotificationRead(
  locale: Locale,
  user: User | null,
  id: number,
): Notification | null {
  const key = generateKey(user, locale)

  const notifications = generated.get(key)

  if (!notifications) {
    return null
  }

  const notification = notifications?.find(
    (notification) => notification.id === id,
  )

  if (!notification) {
    return null
  }

  notification.metadata.read = true

  generated.set(key, notifications)

  return notification
}
