import React from 'react'
import { Link } from 'react-router-dom'
import { usePath } from '~/constants/usePath'
import { RoomStatus, RoomType } from '~/types/room.type'
interface PlanItemProps {
  room: RoomType
}
const PlanItem: React.FC<PlanItemProps> = ({ room }) => {
  let renderStatus: React.ReactNode = <span>{room.status}</span>
  if (room.status === RoomStatus.available) {
    renderStatus = (
      <div className='flex flex-col border'>
        <div className='p-3 text-center bg-gray-500 text-white font-bold'>{room.name}</div>
        <hr />
        <div className='p-3 text-center'>Đang trống</div>
      </div>
    )
  }
  if (room.status === RoomStatus.rented) {
    renderStatus = (
      <div className='flex flex-col border'>
        <div className='p-3 text-center bg-blue-500 text-white font-bold'>{room.name}</div>
        <hr />
        <div className='p-3 text-center'>Đã đặt cọc</div>
      </div>
    )
  }
  if (room.status === RoomStatus.repairing) {
    renderStatus = (
      <div className='flex flex-col border'>
        <div className='p-3 text-center bg-red-500 text-white font-bold'>{room.name}</div>
        <hr />
        <div className=' p-3 text-center'>Đang sửa chữa</div>
      </div>
    )
  }
  if (room.status === RoomStatus.moving_out) {
    renderStatus = (
      <div className='flex flex-col border'>
        <div className='p-3 text-center bg-purple-500 text-white font-bold'>{room.name}</div>
        <hr />
        <div className=' p-3 text-center'>Sắp dọn ra</div>
      </div>
    )
  }
  if (room.status === RoomStatus.pending) {
    renderStatus = (
      <div className='flex flex-col border'>
        <div className='p-3 text-center bg-yellow-500 text-white font-bold'>{room.name}</div>
        <hr />
        <div className='p-3 text-center'>Đang xử lý</div>
      </div>
    )
  }
  if (room.status === RoomStatus.staying) {
    renderStatus = (
      <div className='flex flex-col border'>
        <div className='p-3 text-center bg-green-500 text-white font-bold'>{room.name}</div>
        <hr />
        <div className='p-3 text-center'>Đang ở</div>
      </div>
    )
  }
  return <Link to={usePath.roomPlan + `/${room._id as string}`}>{renderStatus}</Link>
}

export default PlanItem
