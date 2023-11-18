import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createRoom, getAllRooms } from '~/apis/auth.api'
import Input from '~/components/Input'
import TextArea from '~/components/TextArea'
import { Auth } from '~/types/auth.type'
import { RoomType } from '~/types/room.type'
import { ResponseErrorAPI, ResponseSuccessAPI } from '~/types/utils.type'
import { RoomTypeForm, roomSchema } from '~/utils/rules'
import DataItem from './DataItem'
// Define props interface used
interface IDataProps {}
const Data: React.FC<IDataProps> = (_props: IDataProps) => {
  const [showForm, setShowForm] = React.useState<boolean>(false)
  const {
    formState: { errors },
    setError,
    handleSubmit,
    register
  } = useForm<RoomTypeForm>({
    resolver: yupResolver(roomSchema)
  })
  const handleCreateRoom: SubmitHandler<RoomTypeForm> = (data) => {
    if (!parseInt(data.deposit)) {
      setError('deposit', {
        message: 'Tiền đặt cọc phải là số',
        type: 'Server error'
      })
      return
    }
    if (!parseInt(data.price)) {
      setError('price', {
        message: 'Giá phòng phải là số',
        type: 'Server error'
      })
      return
    }
    if (!parseInt(data.electric)) {
      setError('electric', {
        message: 'Tiền điện phải là số',
        type: 'Server error'
      })
      return
    }
    if (!parseInt(data.water)) {
      setError('water', {
        message: 'Tiền nước phải là số',
        type: 'Server error'
      })
      return
    }
    if (!parseInt(data.max_guest)) {
      setError('max_guest', {
        message: 'Số người phải là số',
        type: 'Server error'
      })
      return
    }
    if (!parseInt(data.area)) {
      setError('area', {
        message: 'Diện tích phải là số',
        type: 'Server error'
      })
      return
    }
    const new_data: RoomType = {
      address: data.address,
      area: parseInt(data.area),
      deposit: parseInt(data.deposit),
      electric: parseInt(data.electric),
      images: data.images,
      max_guest: parseInt(data.max_guest),
      name: data.name,
      price: parseInt(data.price),
      description: data.description,
      utilities: data.utilities.split(', '),
      water: parseInt(data.water)
    }
    console.log(new_data)
    createRoomMutation.mutate(new_data, {
      onSuccess: (res) => {
        toast.success(res.data.message as string)
      },
      onError: (err) => {
        if (isAxiosError<ResponseErrorAPI<RoomTypeForm>>(err)) {
          const errorForm = err.response?.data.data
          if (errorForm) {
            Object.keys(errorForm).forEach((key) => {
              setError(key as keyof RoomTypeForm, {
                message: errorForm[key as keyof RoomTypeForm],
                type: 'Server error'
              })
            })
          }
        }
      }
    })
  }
  const createRoomMutation = useMutation({
    mutationFn: (data: RoomType) => createRoom(data)
  })
  const { data } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => getAllRooms()
  })
  const dataRooms = data?.data as ResponseSuccessAPI<RoomType[]>
  const rooms = dataRooms?.data
  return (
    <>
      <div className='header'>
        <div className='left'>
          <h1>Danh mục dữ liệu</h1>
        </div>
        <button
          type='button'
          onClick={() => setShowForm(!showForm)}
          className='text-white flex items-center gap-5 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          {showForm ? <span>Đóng </span> : <span>Thêm phòng</span>}
          <i className='bx bx-category'></i>
        </button>
      </div>
      {showForm && (
        <div className='animate__animated '>
          <form noValidate onSubmit={handleSubmit(handleCreateRoom)} className='md:px-20 md:py-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6 '>
              <Input
                labelName='Ảnh'
                requireLable={true}
                name='images'
                placeholder='Nhập ảnh...'
                registerFC={register}
                auto_complete='on'
                types='text'
                error_message={errors.images?.message}
                error_type={errors.images}
              />
              <Input
                labelName='Tên phòng'
                requireLable={true}
                name='name'
                placeholder='Nhập tên phòng...'
                registerFC={register}
                auto_complete='on'
                types='text'
                error_message={errors.name?.message}
                error_type={errors.name}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6 '>
              <Input
                labelName='Địa chỉ'
                requireLable={true}
                name='address'
                placeholder='Nhập địa chỉ...'
                registerFC={register}
                auto_complete='on'
                types='text'
                error_message={errors.address?.message}
                error_type={errors.address}
              />
              <Input
                labelName='Giá phòng'
                requireLable={true}
                name='price'
                placeholder='Nhập giá phòng...'
                registerFC={register}
                auto_complete='on'
                types='number'
                error_message={errors.price?.message}
                error_type={errors.price}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
              <Input
                labelName='Số người'
                name='max_guest'
                requireLable={true}
                placeholder='Nhập số người...'
                registerFC={register}
                auto_complete='on'
                types='number'
                error_message={errors.max_guest?.message}
                error_type={errors.max_guest}
              />
              <Input
                labelName='Diện tích'
                name='area'
                requireLable={true}
                placeholder='Nhập diện tích...'
                registerFC={register}
                auto_complete='on'
                types='text'
                error_message={errors.area?.message}
                error_type={errors.area}
              />

              <Input
                labelName='Trạng thái'
                name='status'
                requireLable={true}
                placeholder='Nhập trạng thái...'
                registerFC={register}
                auto_complete='on'
                types='text'
                error_message={errors.status?.message}
                error_type={errors.status}
              />
            </div>
            <Input
              labelName='Tiện ích'
              name='utilities'
              requireLable={true}
              placeholder='Nhập các tiện ích...'
              registerFC={register}
              auto_complete='on'
              types='text'
              error_message={errors.utilities?.message}
              error_type={errors.utilities}
            ></Input>
            <TextArea
              labelName='Mô tả'
              name='description'
              requireLable={true}
              placeholder='Nhập mô tả...'
              registerFC={register}
              auto_complete='on'
              row={4}
              error_message={errors.description?.message}
              error_type={errors.description}
            />
            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
              <Input
                labelName='Tiền điện/kW'
                name='electric'
                requireLable={true}
                placeholder='Nhập tiền điện vnđ...'
                registerFC={register}
                auto_complete='on'
                types='number'
                error_message={errors.electric?.message}
                error_type={errors.electric}
              />
              <Input
                labelName='Tiền nước/m3'
                name='water'
                requireLable={true}
                placeholder='Nhập tiền nước vnđ...'
                registerFC={register}
                auto_complete='on'
                types='number'
                error_message={errors.water?.message}
                error_type={errors.water}
              />
              <Input
                labelName='Tiền đặt cọc'
                name='deposit'
                requireLable={true}
                placeholder='Nhập tiền đặt cọc vnđ...'
                registerFC={register}
                auto_complete='on'
                types='number'
                error_message={errors.deposit?.message}
                error_type={errors.deposit}
              />
            </div>

            <div className='grid place-items-center'>
              <button
                type='submit'
                className='text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2'
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      )}

      <div className='relative bg-white py-5 px-5 overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='flex items-center justify-between pb-4'>
          <div>
            <button
              id='dropdownRadioButton'
              data-dropdown-toggle='dropdownRadio'
              className='inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
              type='button'
            >
              <svg
                className='w-3 h-3 text-gray-500 dark:text-gray-400 mr-2.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z' />
              </svg>
              Last 30 days
              <svg
                className='w-2.5 h-2.5 ml-2.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 10 6'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m1 1 4 4 4-4'
                />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div
              id='dropdownRadio'
              className='z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
              data-popper-reference-hidden
              data-popper-escaped
              data-popper-placement='top'
              style={{
                position: 'absolute',
                inset: 'auto auto 0px 0px',
                margin: 0,
                transform: 'translate3d(522.5px, 3847.5px, 0px)'
              }}
            >
              <ul
                className='p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200'
                aria-labelledby='dropdownRadioButton'
              >
                <li>
                  <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                    <input
                      id='filter-radio-example-1'
                      type='radio'
                      name='filter-radio'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='filter-radio-example-1'
                      className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                    >
                      Last day
                    </label>
                  </div>
                </li>
                <li>
                  <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                    <input
                      defaultChecked
                      id='filter-radio-example-2'
                      type='radio'
                      name='filter-radio'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='filter-radio-example-2'
                      className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                    >
                      Last 7 days
                    </label>
                  </div>
                </li>
                <li>
                  <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                    <input
                      id='filter-radio-example-3'
                      type='radio'
                      name='filter-radio'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='filter-radio-example-3'
                      className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                    >
                      Last 30 days
                    </label>
                  </div>
                </li>
                <li>
                  <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                    <input
                      id='filter-radio-example-4'
                      type='radio'
                      name='filter-radio'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='filter-radio-example-4'
                      className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                    >
                      Last month
                    </label>
                  </div>
                </li>
                <li>
                  <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
                    <input
                      id='filter-radio-example-5'
                      type='radio'
                      name='filter-radio'
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='filter-radio-example-5'
                      className='w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'
                    >
                      Last year
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <label htmlFor='table-search' className='sr-only'>
            Search
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <input
              type='text'
              id='table-search'
              className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search for items'
            />
          </div>
        </div>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='p-4'>
                STT
              </th>
              <th scope='col' className='px-6 py-3 truncate'>
                Tên phòng
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                GIÁ PHÒNG
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                ĐẶT CỌC
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                MÔ TẢ
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                ĐỊA CHỈ
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                DIỆN TÍCH
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                HÌNH ẢNH
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                TRẠNG THÁI
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                TIỆN ÍCH
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                TIỀN ĐIỆN
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                TIỀN NƯỚC
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                NGƯỜI
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>{rooms?.map((room, index) => <DataItem item={room} index={index} key={room._id} />)}</tbody>
        </table>
      </div>
    </>
  )
}
export default Data
