import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getRoomsAvailable } from '~/apis/auth.api'
import { RoomResponse } from '~/types/auth.type'
import { RoomListConfig, RoomType } from '~/types/room.type'
import RoomItem from './RoomItem'
import RoomLoading from '~/components/RoomLoading'
import SortRoom from './SortRoom'
import Pagination from '~/components/Pagination'
import { usePath } from '~/constants/usePath'
import AsideFilter from './AsideFilter'
import useQueryConfig from '~/hooks/useQueryConfig'
// Define props interface used
interface IRoomProps {}
const Room: React.FC<IRoomProps> = (_props: IRoomProps) => {
  const queryConfig = useQueryConfig()
  const { data, isLoading } = useQuery({
    queryKey: ['rooms', queryConfig],
    queryFn: () => getRoomsAvailable(queryConfig as RoomListConfig),
    refetchOnWindowFocus: true,
    keepPreviousData: true
    // staleTime: 3 * 60 * 1000
  })
  const _data = data?.data as RoomResponse
  const rooms: RoomType[] = _data?.data?.rooms || []
  return (
    <>
      <div className='p-5 mt-16 bg-gray-200'>
        <div className='grid grid-cols-12 gap-10 container mx-auto'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9 bg-gray-50 py-5 px-5 rounded-md'>
            <div className='my-3 overflow-hidden'>
              <SortRoom
                limit={_data?.data?.paginate.limit}
                pageSize={_data?.data?.paginate.page_size}
                path={usePath.rooms}
                queryConfig={queryConfig}
                totalIems={_data?.data?.paginate.totalItems}
              />
            </div>
            {!isLoading && (
              <div>
                {rooms?.length > 0 ? (
                  <div className='grid grid-col-1 gap-3 md:grid-cols-2 lg:grid-cols-3 mb-5'>
                    {rooms?.map((room: RoomType) => <RoomItem key={room._id} room={room} />)}
                  </div>
                ) : (
                  <div className='grid place-items-center text-2xl font-bold'>
                    <span>Không tìm thấy phòng phù hợp</span>
                    <img src='img/not-found.png' className='w-80 h-w-80 object-cover' alt='' />
                  </div>
                )}
              </div>
            )}

            {isLoading && <RoomLoading />}
            <Pagination pageSize={_data?.data?.paginate.page_size} queryConfig={queryConfig} path={usePath.rooms} />
          </div>
        </div>
      </div>
    </>
  )
}
export default Room
