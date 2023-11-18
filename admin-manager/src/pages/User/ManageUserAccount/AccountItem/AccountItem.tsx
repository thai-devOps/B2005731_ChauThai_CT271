import React, { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Button, Modal } from 'flowbite-react'
import { User } from '~/types/user.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser, updateProfile } from '~/apis/auth.api'
import { toast } from 'react-toastify'
import InputEffect from '~/components/InputEffect'
import SelectionEffect from '~/components/Selection'
import { useForm } from 'react-hook-form'
import { ProfileType, profileSchema } from '~/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler } from 'react-hook-form'

interface AccountItemProps {
  user: User
  index: number
}

const AccountItem: React.FC<AccountItemProps> = ({ user, index }) => {
  const queryClient = useQueryClient()
  const [openModal, setOpenModal] = useState<string | undefined>()
  const [openModalRevise, setOpenModalRevise] = useState<string | undefined>()
  const props = { openModal, setOpenModal }
  const propsRevise = { openModalRevise, setOpenModalRevise }
  const deleteAccountMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id)
  })
  const updateUserMutation = useMutation({
    mutationFn: (payload: ProfileType) => updateProfile(payload)
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileType>({
    resolver: yupResolver(profileSchema) as any,
    defaultValues: {
      _id: user._id,
      address: user.address,
      avatar: user.avatar,
      cccd: user.cccd,
      date_of_birth: user.date_of_birth,
      email: user.email,
      gender: user.gender?.toLocaleLowerCase(),
      name: user.name,
      phone_number: user.phone_number,
      role: user.role?.toLocaleLowerCase()
    }
  })
  const handleDeleteUser = (id: string) => {
    props.setOpenModal(undefined)
    deleteAccountMutation.mutate(id, {
      onSuccess: async () => {
        toast.success('Xóa tài khoản thành công')
        await queryClient.invalidateQueries(['users'])
      },
      onError: () => {
        props.setOpenModal(undefined)
        toast.success('Xóa tài khoản thất bại')
      }
    })
    props.setOpenModal(undefined)
  }
  const onSubmitEdit: SubmitHandler<ProfileType> = (data) => {
    updateUserMutation.mutate(data, {
      onSuccess: async () => {
        propsRevise.setOpenModalRevise(undefined)
        toast.success('Cập nhật tài khoản thành công')
        await queryClient.invalidateQueries(['users'])
      },
      onError: () => {
        propsRevise.setOpenModalRevise(undefined)
        toast.error('Lỗi cập nhật tài khoản')
      }
    })
  }
  const handleClickEdit = () => {
    propsRevise.setOpenModalRevise('form-elements')
  }
  return (
    <>
      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <td className='w-4 p-4'>{index + 1}</td>
        <td className='px-6 py-4 truncate'>
          <img
            className='w-14 h-14 object-cover'
            src={user.avatar === 'Chưa cập nhật' ? '../../../../../public/img/user.png' : user.avatar}
            alt=''
          />
        </td>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
          {user.name}
        </th>
        <td className='px-6 py-4 text-center'>{user.email}</td>
        <td className='px-6 py-4 text-center'>{user.role}</td>
        <td className='px-6 py-4 truncate '>{user.phone_number}</td>
        <td className='px-6 py-4 truncate text-center'>{user.gender}</td>
        <td className='px-6 py-4 text-center truncate'>{user.date_of_birth}</td>
        <td className='px-6 py-4 text-center truncate'>{user.address}</td>
        <td className='px-6 py-4 truncate'>{user.cccd}</td>
        <td className='px-6 py-4 flex items-center mt-3 gap-3'>
          {/* <button className='bg-yellow-100 cursor-pointer text-yellow-800 text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-yellow-900 dark:text-yellow-300'>
            Sửa
          </button> */}
          <Button disabled={user.role === 'admin'} color='warning' onClick={handleClickEdit}>
            Sửa
          </Button>

          {/* <button
            onClick={() => handleDeleteUser(user._id || '')}
            className='bg-red-100 text-red-800 cursor-pointer text-xs font-medium mr-2 px-2.5 py-2 rounded dark:bg-red-900 dark:text-red-300'
          >
            Xóa
          </button> */}
          <Button disabled={user.role === 'admin'} color='failure' onClick={() => props.setOpenModal('pop-up')}>
            Xóa
          </Button>
        </td>
      </tr>
      <Modal
        className='z-[99999]'
        show={propsRevise.openModalRevise === 'form-elements'}
        size='2xl'
        popup
        onClose={() => propsRevise.setOpenModalRevise(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-6'>
            <h3 className='text-2xl font-medium text-gray-900 dark:text-white'>Nhập thông tin tài khoản</h3>
            <form noValidate onSubmit={handleSubmit(onSubmitEdit)}>
              <InputEffect
                labelName='Link Avatar'
                name='avatar'
                placeholder='Nhập địa chỉ liên kết hình ảnh'
                registerFC={register}
                error_type={errors.avatar}
                error_message={errors.avatar?.message}
              />
              <InputEffect
                labelName='Họ tên'
                name='name'
                placeholder='Nhập họ tên'
                registerFC={register}
                error_type={errors.name}
                error_message={errors.name?.message}
                requireLable
              />
              <InputEffect
                labelName='Email'
                name='email'
                disable={true}
                placeholder='name@company.com'
                registerFC={register}
                error_type={errors.email}
                error_message={errors.email?.message}
                requireLable
              />
              <InputEffect
                labelName='Số điện thoại'
                name='phone_number'
                placeholder='0397706494'
                registerFC={register}
                error_type={errors.phone_number}
                error_message={errors.phone_number?.message}
                requireLable
              />
              <InputEffect
                labelName='Ngày sinh'
                name='date_of_birth'
                registerFC={register}
                type_input='date'
                placeholder='Chọn ngày sinh'
                error_type={errors.date_of_birth}
                auto_complete='on'
                error_message={errors.date_of_birth?.message}
              />
              <SelectionEffect
                labelName='Giới tính'
                name='gender'
                registerFC={register}
                error_type={errors.gender}
                error_message={errors.gender?.message}
                auto_complete='on'
                props={
                  <>
                    <option value='nam'>Nam</option>
                    <option value='nữ'>Nữ</option>
                    <option value='khac'>Khác</option>
                  </>
                }
              ></SelectionEffect>
              <InputEffect
                labelName='Địa chỉ'
                name='address'
                placeholder='Nhập địa chỉ'
                registerFC={register}
                error_type={errors.address}
                error_message={errors.address?.message}
              />
              <InputEffect
                labelName='Căn cước công dân'
                name='cccd'
                placeholder='Nhập số căn cước công dân'
                registerFC={register}
                error_type={errors.cccd}
                error_message={errors.cccd?.message}
              />
              <SelectionEffect
                labelName='Cấp quyền'
                name='role'
                registerFC={register}
                error_type={errors.role}
                error_message={errors.role?.message}
                auto_complete='on'
                props={
                  <>
                    <option value='admin'>Quản trị viên</option>
                    <option value='user'>Khách hàng</option>
                  </>
                }
              ></SelectionEffect>
              <div className='w-full flex justify-center'>
                <Button type='submit'>Cập nhật</Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
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
              Bạn có chắc chắn muốn xóa tài khoản này?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='gray' onClick={() => props.setOpenModal(undefined)}>
                Hủy
              </Button>
              <Button color='failure' onClick={() => handleDeleteUser(user._id || '')}>
                Xóa
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AccountItem
