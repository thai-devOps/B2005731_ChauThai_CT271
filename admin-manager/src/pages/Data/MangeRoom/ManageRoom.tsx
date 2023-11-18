import React, { useContext, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createRoom, getAllUtilitiesNopaginate, getRooms } from '~/apis/auth.api'
import useQueryParams from '~/hooks/useQueryParams'
import { RoomResponse } from '~/types/auth.type'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { Button, Modal } from 'flowbite-react'
import DataItem from '../DataItem'
import Pagination from '~/components/Pagination'
import { usePath } from '~/constants/usePath'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RoomTypeForm, roomSchema } from '~/utils/rules'
import Input from '~/components/Input'
import TextArea from '~/components/TextArea'
import { ResponseSuccessAPI } from '~/types/utils.type'
import { Utility } from '~/types/utility.type'
import { RoomType } from '~/types/room.type'
import { toast } from 'react-toastify'
import { AppContext } from '~/context/app.context'
import classNames from 'classnames'
const LIMIT = '5'
const ManageRoom: React.FC = () => {
  const queryParams = useQueryParams()
  const [limit, setLimit] = React.useState<string>(queryParams.limit || LIMIT)
  const [selectedUtilities, setSelectedUtilities] = React.useState<string[]>([])
  const handleUtilityChange = (idValue: string) => {
    // Hàm này được gọi khi người dùng thay đổi trạng thái checkbox của một tiện ích
    if (selectedUtilities.includes(idValue)) {
      setSelectedUtilities(selectedUtilities.filter((id) => id !== idValue))
    } else {
      setSelectedUtilities([...selectedUtilities, idValue])
    }
  }
  const navigate = useNavigate()
  const { data, isLoading: fetchRoomData } = useQuery({
    queryKey: ['rooms', queryParams],
    queryFn: () =>
      getRooms({
        limit: queryParams.limit || LIMIT,
        page: queryParams.page || '1'
      }),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  })
  const handleChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(e.target.value)
    navigate({
      pathname: usePath.dataManagements.room,
      search: createSearchParams({
        ...queryParams,
        limit: e.target.value
      }).toString()
    })
  }
  const [openModalCreate, setOpenModalCreate] = React.useState<string | undefined>(undefined)
  const propsModalCreate = { openModalCreate, setOpenModalCreate }
  const queryClient = useQueryClient()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RoomTypeForm>({
    resolver: yupResolver(roomSchema) as any
  })
  const createRoomMutation = useMutation({
    mutationFn: (payload: RoomType) => createRoom(payload)
  })
  const onCreateRoom: SubmitHandler<RoomTypeForm> = (data) => {
    propsModalCreate.setOpenModalCreate(undefined)
    const dataForm: RoomType = {
      ...data,
      utilities: selectedUtilities
    }
    createRoomMutation.mutate(dataForm, {
      onSuccess: async () => {
        toast.success('Tạo phòng thành công')
        await queryClient.invalidateQueries(['rooms'])
        reset()
      },
      onError: () => {
        propsModalCreate.setOpenModalCreate('form-create-room')
      }
    })
  }
  const { setIsLoading } = useContext(AppContext)
  useEffect(() => {
    setIsLoading(createRoomMutation.isLoading)
    return () => {
      setIsLoading(false)
    }
  }, [createRoomMutation.isLoading, setIsLoading])
  const { data: utilitiesData } = useQuery({
    queryKey: ['utilities'],
    queryFn: () => getAllUtilitiesNopaginate().then((res) => res.data as ResponseSuccessAPI<Utility[]>)
  })
  const dataRooms = data?.data as RoomResponse
  const rooms = dataRooms?.data?.rooms ?? []
  return (
    <div className='relative mt-5 bg-white py-5 px-5 overflow-x-auto shadow-md sm:rounded-lg'>
      <div className='flex items-center justify-between pb-4'>
        <div className='flex items-center justify-start gap-6 flex-wrap'>
          <Button gradientDuoTone='greenToBlue' onClick={() => propsModalCreate.setOpenModalCreate('form-create-room')}>
            <span>Thêm phòng</span>
            <i className='bx bx-plus'></i>
          </Button>
          <div className='flex items-center gap- justify-end' aria-label='Table navigation'>
            <div className='flex gap-4 items-center'>
              <span>
                <select
                  id='small'
                  value={limit}
                  onChange={(e) => handleChangeLimit(e)}
                  className='p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='15'>15</option>
                  <option value='20'>20</option>
                </select>
              </span>
              <Pagination
                pageSize={dataRooms?.data?.paginate?.page_size}
                queryConfig={queryParams}
                path={usePath.dataManagements.room}
              />
            </div>
          </div>
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
            <th scope='col' className='px-6 py-3 text-center truncate'>
              HÌNH ẢNH
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
              TRẠNG THÁI
            </th>
            <th scope='col' className='px-6 py-3 truncate text-center'>
              TIỆN ÍCH
            </th>
            <th scope='col' className='px-6 py-3 truncate text-center'>
              NGƯỜI
            </th>
            <th scope='col' className='px-6 py-3 truncate text-center'>
              Thao tác
            </th>
          </tr>
        </thead>
        {!fetchRoomData && (
          <tbody>{rooms?.map((room, index) => <DataItem item={room} index={index} key={room._id} />)}</tbody>
        )}
        {fetchRoomData && (
          <tbody>
            <tr>
              <td colSpan={12}>
                <div
                  role='status'
                  className='w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700'
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5' />
                      <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
                    </div>
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12' />
                  </div>
                  <div className='flex items-center justify-between pt-4'>
                    <div>
                      <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5' />
                      <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
                    </div>
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12' />
                  </div>
                  <div className='flex items-center justify-between pt-4'>
                    <div>
                      <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5' />
                      <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
                    </div>
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12' />
                  </div>
                  <div className='flex items-center justify-between pt-4'>
                    <div>
                      <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5' />
                      <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
                    </div>
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12' />
                  </div>
                  <div className='flex items-center justify-between pt-4'>
                    <div>
                      <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5' />
                      <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700' />
                    </div>
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12' />
                  </div>
                  <span className='sr-only'>Loading...</span>
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </table>
      <Modal
        className='z-[99999]'
        show={propsModalCreate.openModalCreate === 'form-create-room'}
        size='2xl'
        popup
        onClose={() => {
          propsModalCreate.setOpenModalCreate(undefined)
          reset()
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-6'>
            <h3 className='text-2xl font-medium text-gray-900 dark:text-white'>TẠO PHÒNG TRỌ</h3>
            <form noValidate onSubmit={handleSubmit(onCreateRoom)}>
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
              <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6 '>
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
              <div className='mb-5'>
                <label htmlFor='utilities' className='block mb-3 text-sm font-medium text-gray-900 dark:text-white'>
                  Tiện ích
                </label>
                <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 rounded-lg border-[2px] shadow-sm border-slate-300 p-2.5'>
                  {utilitiesData?.data?.map((utility) => (
                    <div key={utility._id}>
                      <label>
                        <input
                          type='checkbox'
                          id={utility._id}
                          name='utilities'
                          value={utility._id}
                          onChange={(e) => handleUtilityChange(e.target.value)}
                        />
                        <span className='ml-2 text-sm font-medium text-gray-900 dark:text-white'>{utility.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-3 md:gap-6'>
                <Input
                  labelName='Số người'
                  name='capacity'
                  requireLable={true}
                  placeholder='Nhập số người...'
                  registerFC={register}
                  auto_complete='on'
                  types='number'
                  error_message={errors.capacity?.message}
                  error_type={errors.capacity}
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
                <div>
                  <label htmlFor='status' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Trạng thái <span className='text-red-500 text-sm'> *</span>
                  </label>
                  <Controller
                    name='status'
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        id='status'
                        className={classNames({
                          'block w-full rounded-lg border animate__animated animate__headShake border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500':
                            errors?.status,
                          'block w-full rounded-lg border-[2px] shadow-sm border-slate-300 p-2.5 text-sm text-gray-900 focus:border-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500':
                            !errors?.status
                        })}
                      >
                        <option value=''>Chọn trạng thái</option>
                        <option value='available'>Còn trống</option>
                        <option value='rented'>Đã đặt cọc</option>
                        <option value='pending'>Đang chờ</option>
                        <option value='staying'>Đang ở</option>
                        <option value='repairing'>Đang sửa chữa</option>
                        <option value='moving_out'>Sắp dọn ra</option>
                      </select>
                    )}
                  />
                  {errors.status && (
                    <span className='text-red-600 text-xs py-5 font-normal'>{errors?.status?.message}</span>
                  )}
                </div>
              </div>
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
              <div className='w-full flex justify-center'>
                <Button type='submit'>Tạo</Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default ManageRoom
