import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { RoomListConfig } from '~/types/room.type'

export type QueryConfig = {
  [key in keyof RoomListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '6',
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      address: queryParams.address,
      price: queryParams.price,
      area: queryParams.area,
      capacity: queryParams.capacity,
      utilities: queryParams.utilities
    },
    isUndefined
  )
  return queryConfig
}
