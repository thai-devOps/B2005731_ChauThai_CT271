import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllRooms } from '~/apis/auth.api'
import { ResponseRooms } from '~/types/room.type'
import PlanItem from './PlanItem'

const RoomPlan: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['room/plan'],
    queryFn: () => getAllRooms()
  })
  const _data = data?.data as ResponseRooms
  const rooms = _data?.data || []
  console.log(rooms)
  return (
    <>
      <div className='header px-5 py-3 bg-white rounded-md mb-5'>
        <div className='left'>
          <h1>Sơ đồ phòng trọ</h1>
        </div>
      </div>
      {!isLoading && (
        <div className='p-5 grid grid-cols-1 gap-6 rounded-md bg-white md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-6'>
          {rooms.length > 0 && rooms.map((room) => <PlanItem room={room} key={room._id as string} />)}
          {rooms.length === 0 && <div className='text-center text-md text-yellow-300'>Không có phòng nào</div>}
        </div>
      )}
      {isLoading && (
        <div className='p-5 grid grid-cols-1 gap-6 rounded-md bg-white md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-6'>
          <div className='w-60 h-24 border-2 rounded-md'>
            <div className='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div className='w-12 bg-gray-300 h-12 rounded-full ' />
              <div className='flex flex-col space-y-3'>
                <div className='w-36 bg-gray-300 h-6 rounded-md ' />
                <div className='w-24 bg-gray-300 h-6 rounded-md ' />
              </div>
            </div>
          </div>
          <div className='w-60 h-24 border-2 rounded-md'>
            <div className='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div className='w-12 bg-gray-300 h-12 rounded-full ' />
              <div className='flex flex-col space-y-3'>
                <div className='w-36 bg-gray-300 h-6 rounded-md ' />
                <div className='w-24 bg-gray-300 h-6 rounded-md ' />
              </div>
            </div>
          </div>
          <div className='w-60 h-24 border-2 rounded-md'>
            <div className='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div className='w-12 bg-gray-300 h-12 rounded-full ' />
              <div className='flex flex-col space-y-3'>
                <div className='w-36 bg-gray-300 h-6 rounded-md ' />
                <div className='w-24 bg-gray-300 h-6 rounded-md ' />
              </div>
            </div>
          </div>
          <div className='w-60 h-24 border-2 rounded-md'>
            <div className='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div className='w-12 bg-gray-300 h-12 rounded-full ' />
              <div className='flex flex-col space-y-3'>
                <div className='w-36 bg-gray-300 h-6 rounded-md ' />
                <div className='w-24 bg-gray-300 h-6 rounded-md ' />
              </div>
            </div>
          </div>
          <div className='w-60 h-24 border-2 rounded-md'>
            <div className='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div className='w-12 bg-gray-300 h-12 rounded-full ' />
              <div className='flex flex-col space-y-3'>
                <div className='w-36 bg-gray-300 h-6 rounded-md ' />
                <div className='w-24 bg-gray-300 h-6 rounded-md ' />
              </div>
            </div>
          </div>
          <div className='w-60 h-24 border-2 rounded-md'>
            <div className='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div className='w-12 bg-gray-300 h-12 rounded-full ' />
              <div className='flex flex-col space-y-3'>
                <div className='w-36 bg-gray-300 h-6 rounded-md ' />
                <div className='w-24 bg-gray-300 h-6 rounded-md ' />
              </div>
            </div>
          </div>
          <div className='w-60 h-24 border-2 rounded-md'>
            <div className='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div className='w-12 bg-gray-300 h-12 rounded-full ' />
              <div className='flex flex-col space-y-3'>
                <div className='w-36 bg-gray-300 h-6 rounded-md ' />
                <div className='w-24 bg-gray-300 h-6 rounded-md ' />
              </div>
            </div>
          </div>
          <div className='w-60 h-24 border-2 rounded-md'>
            <div className='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div className='w-12 bg-gray-300 h-12 rounded-full ' />
              <div className='flex flex-col space-y-3'>
                <div className='w-36 bg-gray-300 h-6 rounded-md ' />
                <div className='w-24 bg-gray-300 h-6 rounded-md ' />
              </div>
            </div>
          </div>
          <div className='w-60 h-24 border-2 rounded-md'>
            <div className='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div className='w-12 bg-gray-300 h-12 rounded-full ' />
              <div className='flex flex-col space-y-3'>
                <div className='w-36 bg-gray-300 h-6 rounded-md ' />
                <div className='w-24 bg-gray-300 h-6 rounded-md ' />
              </div>
            </div>
          </div>
          <div className='w-60 h-24 border-2 rounded-md'>
            <div className='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div className='w-12 bg-gray-300 h-12 rounded-full ' />
              <div className='flex flex-col space-y-3'>
                <div className='w-36 bg-gray-300 h-6 rounded-md ' />
                <div className='w-24 bg-gray-300 h-6 rounded-md ' />
              </div>
            </div>
          </div>
          <div className='w-60 h-24 border-2 rounded-md'>
            <div className='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div className='w-12 bg-gray-300 h-12 rounded-full ' />
              <div className='flex flex-col space-y-3'>
                <div className='w-36 bg-gray-300 h-6 rounded-md ' />
                <div className='w-24 bg-gray-300 h-6 rounded-md ' />
              </div>
            </div>
          </div>
          <div className='w-60 h-24 border-2 rounded-md'>
            <div className='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div className='w-12 bg-gray-300 h-12 rounded-full ' />
              <div className='flex flex-col space-y-3'>
                <div className='w-36 bg-gray-300 h-6 rounded-md ' />
                <div className='w-24 bg-gray-300 h-6 rounded-md ' />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RoomPlan
