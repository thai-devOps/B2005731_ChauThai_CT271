import React from 'react'
import { RoomType } from '~/types/room.type'
import { formatCurrency } from '~/utils/utils'

interface DataItemProps {
  item: RoomType
  index: number
}

const DataItem: React.FC<DataItemProps> = ({ item, index }) => {
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
      <td className='w-4 p-4'>{index + 1}</td>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
        {item.name}
      </th>
      <td className='px-6 py-4 text-center'>{formatCurrency(item.price)}</td>
      <td className='px-6 py-4 text-center'>{formatCurrency(item.deposit)}</td>
      <td className='px-6 py-4 truncate '>{item.description}</td>
      <td className='px-6 py-4 truncate text-center'>{item.address}</td>
      <td className='px-6 py-4 text-center'>{item.area}</td>
      <td className='px-6 py-4 truncate'>{item.images}</td>
      <td className='px-6 py-4 text-center'>{item.status}</td>
      <td className='px-6 py-4 truncate'>{item.utilities?.toString()}</td>
      <td className='px-6 py-4 text-center'>{item.electric}</td>
      <td className='px-6 py-4 text-center'>{item.water}</td>
      <td className='px-6 py-4 text-center'>{item.max_guest}</td>
      <td className='px-6 py-4'>
        <span className='bg-yellow-100 cursor-pointer text-yellow-800 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-yellow-900 dark:text-yellow-300'>
          Sửa
        </span>
        <span className='bg-red-100 text-red-800 cursor-pointer text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-red-900 dark:text-red-300'>
          Xóa
        </span>
      </td>
    </tr>
  )
}
export default DataItem
