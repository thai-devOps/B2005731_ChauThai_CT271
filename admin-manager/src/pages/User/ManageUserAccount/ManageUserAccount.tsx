import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { createUserAccount, getUserPaginate } from '~/apis/auth.api'
import { usePath } from '~/constants/usePath'
import useQueryParams from '~/hooks/useQueryParams'
import { UserResponse } from '~/types/auth.type'
import AccountItem from './AccountItem/AccountItem'
import { Button, Modal } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreateAccountType, createAccountSchema } from '~/utils/rules'
import InputEffect from '~/components/InputEffect'
import SelectionEffect from '~/components/Selection'
import { toast } from 'react-toastify'
import { AppContext } from '~/context/app.context'
import Pagination from '~/components/Pagination'
const LIMIT = '5'

const ManageUserAccount: React.FC = () => {
  const queryParams = useQueryParams()
  const queryClient = useQueryClient()
  const [limit, setLimit] = useState<string>(LIMIT)
  const [openModal, setOpenModal] = useState<string | undefined>()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const props = { openModal, setOpenModal }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateAccountType>({
    resolver: yupResolver(createAccountSchema) as any
  })
  const { setIsLoading } = useContext(AppContext)
  const createUserMutation = useMutation({
    mutationFn: (data: CreateAccountType) => createUserAccount(data)
  })
  const onSubmit: SubmitHandler<CreateAccountType> = (data) => {
    props.setOpenModal(undefined)
    createUserMutation.mutate(data, {
      onSuccess: async () => {
        toast.success('Tạo tài khoản thành công')
        await queryClient.invalidateQueries(['users'])
      },
      onError: () => props.setOpenModal('form-elements')
    })
  }
  const { data, isLoading: fetchUserAccount } = useQuery({
    queryKey: ['users', limit, queryParams.page],
    queryFn: () =>
      getUserPaginate({
        limit: limit,
        page: queryParams.page
      }),
    keepPreviousData: true,
    refetchOnWindowFocus: true
  })

  useEffect(() => {
    setIsLoading(createUserMutation.isLoading)

    return () => {
      setIsLoading(false)
    }
  }, [createUserMutation.isLoading, props, setIsLoading])

  const dataUser = data?.data as UserResponse
  const page_size = dataUser?.data?.pagination?.page_size ?? 1
  const users = dataUser?.data?.users ?? []
  return (
    <>
      <div className='relative mt-5 bg-white py-5 px-5 overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='flex items-center justify-between pb-4'>
          <div className='flex items-center flex-wrap md:flex-row md:gap-3'>
            <Button color='success' onClick={() => props.setOpenModal('form-elements')}>
              Thêm tài khoản
            </Button>
            <div className='flex items-center gap-10' aria-label='Table navigation'>
              <div className='flex gap-3 items-center'>
                <span>
                  <select
                    id='small'
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    className='p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  >
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='20'>20</option>
                  </select>
                </span>
                <Pagination path={usePath.dataManagements.account} queryConfig={queryParams} pageSize={page_size} />
              </div>
            </div>
            <Modal
              className='z-[99999]'
              show={props.openModal === 'form-elements'}
              size='2xl'
              popup
              onClose={() => props.setOpenModal(undefined)}
            >
              <Modal.Header />
              <Modal.Body>
                <div className='space-y-6'>
                  <h3 className='text-2xl font-medium text-gray-900 dark:text-white'>Nhập thông tin tài khoản</h3>
                  <form noValidate onSubmit={handleSubmit(onSubmit)}>
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

                    <InputEffect
                      labelName='Mật khẩu'
                      name='password'
                      placeholder='Nhập mật khẩu'
                      registerFC={register}
                      error_type={errors.password}
                      error_message={errors.password?.message}
                      type_input='password'
                    />

                    <div className='w-full flex justify-center'>
                      <Button type='submit'>Tạo tài khoản</Button>
                    </div>
                  </form>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='p-4'>
                STT
              </th>
              <th scope='col' className='px-6 py-3 truncate'>
                Avatar
              </th>
              <th scope='col' className='px-6 py-3 text-center truncate'>
                Họ tên
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                Email
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                ROLE
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                Số điện thoại
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                Giới tính
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                Ngày sinh
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                Địa chỉ
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                Căn cước CD
              </th>
              <th scope='col' className='px-6 py-3 truncate text-center'>
                Thao tác
              </th>
            </tr>
          </thead>
          {!fetchUserAccount && (
            <tbody>{users?.map((user, index) => <AccountItem index={index} key={user._id} user={user} />)}</tbody>
          )}
          {fetchUserAccount && (
            <tbody>
              <tr>
                <td colSpan={11}>
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
      </div>
    </>
  )
}

export default ManageUserAccount
