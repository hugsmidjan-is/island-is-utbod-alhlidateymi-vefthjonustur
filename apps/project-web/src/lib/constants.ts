import { RouteItem } from './types'

export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 10

export enum QueryParams {
  SEARCH = 'search',
  STATUS = 'status',
  TYPE = 'type',
  CATEGORY = 'category',
  PUBLICATION = 'publication',
  PAGE = 'page',
  PAGE_SIZE = 'pageSize',
  SORT_BY = 'sortBy',
  DIRECTION = 'direction',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export const DEFAULT_SORT_DIRECTION = SortDirection.ASC

export const FILTERS_TO_SHOW = [
  QueryParams.PUBLICATION,
  QueryParams.TYPE,
  QueryParams.CATEGORY,
]

export enum Route {
  INDEX = '/',
  SUBPAGE = '/subpage',
}

export const Routes: RouteItem[] = [
  {
    path: Route.INDEX,
    pathName: 'Forsíða',
    showInNavigation: true,
    children: [
      {
        path: Route.SUBPAGE,
        pathName: 'Undirsíða',
        showInNavigation: true,
      },
    ],
  },
]
