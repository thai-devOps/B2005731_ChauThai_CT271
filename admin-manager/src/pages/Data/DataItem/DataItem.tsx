import { formatCurrency, handleConfigRoomStatus } from '~/utils/utils'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { deleteRoomById, updateRoomById } from '~/apis/auth.api'
import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllUtilitiesNopaginate } from '~/apis/auth.api'
import { Button, Modal } from 'flowbite-react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RoomTypeForm, roomSchema } from '~/utils/rules'
import Input from '~/components/Input'
import TextArea from '~/components/TextArea'
import { ResponseSuccessAPI } from '~/types/utils.type'
import { Utility } from '~/types/utility.type'
import { RoomStatus, RoomType, UpdateRoomBody } from '~/types/room.type'
import { toast } from 'react-toastify'
import { AppContext } from '~/context/app.context'
import classNames from 'classnames'

interface DataItemProps {
  item: RoomType
  index: number
}

const DataItem: React.FC<DataItemProps> = ({ item, index }) => {
  const queryClient = useQueryClient()
  const arrayIdUtilities = item.utilities.map((utility) => (utility as Utility)._id)
  const [selectedUtilities, setSelectedUtilities] = React.useState<string[]>(arrayIdUtilities)
  const [openModalEdit, setOpenModalEdit] = React.useState<string | undefined>(undefined)
  const [openModal, setOpenModal] = useState<string | undefined>()
  const props = { openModal, setOpenModal }
  const propsModalEdit = { openModalEdit, setOpenModalEdit }
  const { setIsLoading } = useContext(AppContext)
  // handle checkbox

  const handleUtilityChange = (idValue: string) => {
    // Hàm này được gọi khi người dùng thay đổi trạng thái checkbox của một tiện ích
    if (selectedUtilities.includes(idValue)) {
      setSelectedUtilities(selectedUtilities.filter((id) => id !== idValue))
    } else {
      setSelectedUtilities([...selectedUtilities, idValue])
    }
  }
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RoomTypeForm>({
    resolver: yupResolver(roomSchema) as any,
    defaultValues: {
      name: item.name,
      images: item.images[0].toString(),
      price: item.price,
      deposit: item.deposit,
      area: item.area,
      capacity: item.capacity,
      address: item.address,
      description: item.description,
      status: item.status
    }
  })
  const updateRoomMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RoomType }) => updateRoomById(id, payload)
  })
  const onEditRoom: SubmitHandler<RoomTypeForm> = (data) => {
    propsModalEdit.setOpenModalEdit(undefined)
    const dataForm: UpdateRoomBody = {
      name: data.name,
      images: data.images,
      price: data.price,
      deposit: data.deposit,
      area: data.area,
      capacity: data.capacity,
      address: data.address,
      description: data.description,
      status: data.status as RoomStatus,
      utilities: selectedUtilities,
      roomer: item.roomer as string,
      created_at: item.created_at as string
    }
    console.log(dataForm)
    updateRoomMutation.mutate(
      { id: item._id as string, payload: dataForm },
      {
        onSuccess: async () => {
          toast.success('Cập nhật phòng thành công')
          await queryClient.invalidateQueries(['rooms'])
          reset()
        },
        onError: () => {
          propsModalEdit.setOpenModalEdit('form-create-room')
        }
      }
    )
  }
  useEffect(() => {
    setIsLoading(updateRoomMutation.isLoading)
    return () => {
      setIsLoading(false)
    }
  }, [updateRoomMutation.isLoading, setIsLoading])
  const { data: utilitiesData } = useQuery({
    queryKey: ['utilities'],
    queryFn: () => getAllUtilitiesNopaginate().then((res) => res.data as ResponseSuccessAPI<Utility[]>)
  })
  // handle delete
  const deleteRoomMutation = useMutation({
    mutationFn: (id: string) => deleteRoomById(id)
  })
  const handleDeleteRoom = (id: string) => {
    props.setOpenModal(undefined)
    deleteRoomMutation.mutate(id, {
      onSuccess: async () => {
        toast.success('Xóa phòng thành công')
        await queryClient.invalidateQueries(['rooms'])
      },
      onError: () => {
        props.setOpenModal(undefined)
        // toast.success('Xóa phòng')
      }
    })
  }
  const configStatus = handleConfigRoomStatus(item.status)
  let labelStatus = null
  if (configStatus === 'Còn trống') {
    labelStatus = (
      <span className='bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'>
        {configStatus}
      </span>
    )
  } else if (configStatus === 'Đã đặt cọc') {
    labelStatus = (
      <span className='bg-blue-50 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
        {configStatus}
      </span>
    )
  } else if (configStatus === 'Đang sửa chữa') {
    labelStatus = (
      <span className='bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300'>
        {configStatus}
      </span>
    )
  } else if (configStatus === 'Đang ở') {
    labelStatus = (
      <span className='bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300'>
        {configStatus}
      </span>
    )
  } else if (configStatus === 'Sắp dọn ra') {
    labelStatus = (
      <span className='bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>
        {configStatus}
      </span>
    )
  } else {
    labelStatus = (
      <span className='bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'>
        {configStatus}
      </span>
    )
  }
  // convert utilities array to string to display in table cell ex: => 'wifi, parking'
  const utilities = item.utilities
    .map((utility) => (utility as Utility).name)
    .toString()
    .split(',')
    .join(', ')

  return (
    <>
      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <td className='w-4 p-4'>{index + 1}</td>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
          {item.name}
        </th>
        <td className='px-6 py-4 truncate'>
          <img className='w-14 h-14 object-cover' src={item.images.toString().split(', ')[0]} alt='' />
        </td>
        <td className='px-6 py-4 text-center'>{formatCurrency(item.price)}</td>
        <td className='px-6 py-4 text-center'>{formatCurrency(item.deposit)}</td>
        <td className='px-6 py-4 truncate '>{item.description}</td>
        <td className='px-6 py-4 truncate text-center'>{item.address}</td>
        <td className='px-6 py-4 text-center truncate'>{item.area}</td>
        <td className='px-6 py-4 text-center truncate'>{labelStatus}</td>
        <td className='px-6 py-4 truncate'>{utilities}</td>
        <td className='px-6 py-4 text-center'>{item.capacity}</td>
        <td className='px-6 py-4 flex items-center mt-3 gap-3'>
          {/* <button className='bg-yellow-100 cursor-pointer text-yellow-800 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-yellow-900 dark:text-yellow-300'>
              Sửa
            </button> */}
          <Button
            color='warning'
            onClick={() => {
              propsModalEdit.setOpenModalEdit('form-edit')
            }}
          >
            Sửa
          </Button>

          {/* <button
              onClick={() => handleDeleteUser(user._id || '')}
              className='bg-red-100 text-red-800 cursor-pointer text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-red-900 dark:text-red-300'
            >
              Xóa
            </button> */}
          <Button color='failure' onClick={() => props.setOpenModal('pop-up')}>
            Xóa
          </Button>
        </td>
      </tr>
      <Modal
        className='z-[99999]'
        show={props.openModal === 'pop-up'}
        size='md'
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Bạn có chắc chắn muốn xóa phòng này?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='gray' onClick={() => props.setOpenModal(undefined)}>
                No, cancel
              </Button>
              <Button color='failure' onClick={() => handleDeleteRoom(item._id as string)}>
                Delete
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className='z-[99999]'
        show={propsModalEdit.openModalEdit === 'form-edit'}
        size='2xl'
        popup
        onClose={() => {
          propsModalEdit.setOpenModalEdit(undefined)
          reset()
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-6'>
            <h3 className='text-2xl font-medium text-center text-gray-900 dark:text-white'>CẬP NHẬT PHÒNG TRỌ</h3>
            <form noValidate onSubmit={handleSubmit(onEditRoom)}>
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
                          checked={selectedUtilities.includes(utility._id)}
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
                <Button type='submit'>CẬP NHÂT</Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default DataItem
