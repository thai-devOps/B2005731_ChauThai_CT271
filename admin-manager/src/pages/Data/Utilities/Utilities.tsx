import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, Table } from 'flowbite-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createUtility, getAllUtilities } from '~/apis/auth.api'
import UtilitiesItem from './UtilitiesItem'
import { ResponseSuccessAPI } from '~/types/utils.type'
import { UtilitiesResponse, Utility } from '~/types/utility.type'
import useQueryParams from '~/hooks/useQueryParams'
import Pagination from '~/components/Pagination'
import { usePath } from '~/constants/usePath'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUtilitySchema } from '~/utils/rules'
import { toast } from 'react-toastify'
import InputEffect from '~/components/InputEffect'
import { AppContext } from '~/context/app.context'
const LIMIT = '5'

const Utilities: React.FC = () => {
  const queryClient = useQueryClient()
  const { setIsLoading } = useContext(AppContext)
  const [openModalRevise, setOpenModalRevise] = useState<string | undefined>()
  const propsRevise = { openModalRevise, setOpenModalRevise }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Utility>({
    resolver: yupResolver(createUtilitySchema) as any
  })
  const createUtilityMutation = useMutation({
    mutationFn: (data: Utility) => createUtility(data)
  })
  const onSubmitCreate: SubmitHandler<Utility> = (value) => {
    propsRevise.setOpenModalRevise(undefined)
    createUtilityMutation.mutate(value, {
      onSuccess: async () => {
        toast.success('Thêm tiện ích thành công')
        await queryClient.invalidateQueries(['utilities'])
      },
      onError: () => {
        propsRevise.setOpenModalRevise(undefined)
      }
    })
  }
  useEffect(() => {
    setIsLoading(createUtilityMutation.isLoading)
    return () => {
      setIsLoading(false)
    }
  }, [createUtilityMutation.isLoading, setIsLoading])
  const queryParams = useQueryParams()
  const [limit, setLimit] = React.useState<string>(queryParams.limit || '5')
  const { data, isLoading } = useQuery({
    queryKey: ['utilities', queryParams],
    queryFn: () =>
      getAllUtilities({
        page: queryParams.page || '1',
        limit: queryParams.limit || LIMIT
      }),
    refetchOnWindowFocus: false,
    keepPreviousData: true
  })
  const navigate = useNavigate()
  const dataUtilities = data?.data as ResponseSuccessAPI<UtilitiesResponse>
  const handleLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(e.target.value)
    navigate({
      pathname: usePath.dataManagements.utilities,
      search: createSearchParams({
        page: queryParams.page || '1',
        limit: e.target.value
      }).toString()
    })
  }
  return (
    <div>
      <div className='relative mt-5 bg-white py-5 px-5 overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='flex items-center justify-between pb-4'>
          <div className='flex items-center justify-start gap-6 flex-wrap'>
            <Button onClick={() => propsRevise.setOpenModalRevise('form-elements')} gradientDuoTone='greenToBlue'>
              <span>Thêm tiện ích</span>
              <i className='bx bx-plus'></i>
            </Button>
            <div className='flex items-center gap- justify-end' aria-label='Table navigation'>
              <div className='flex flex-wrap justify-start gap-2 items-center'>
                <span>
                  <select
                    id='small'
                    value={limit}
                    onChange={(e) => handleLimit(e)}
                    className='p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 me-5 '
                  >
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='20'>20</option>
                  </select>
                </span>
                <Pagination
                  pageSize={dataUtilities?.data?.paginate?.page_size}
                  path={usePath.dataManagements.utilities}
                  queryConfig={queryParams}
                />
              </div>
            </div>
          </div>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Tên tiện ích</Table.HeadCell>
            <Table.HeadCell>Giá</Table.HeadCell>
            <Table.HeadCell>Đơn vị</Table.HeadCell>
            <Table.HeadCell>Ngày tạo</Table.HeadCell>
            <Table.HeadCell>Ngày cập nhật</Table.HeadCell>
            <Table.HeadCell className='text-center'>
              <span>Thao tác</span>
            </Table.HeadCell>
          </Table.Head>
          {!isLoading && (
            <Table.Body className='divide-y'>
              {dataUtilities?.data?.utilities?.map((utility: Utility) => (
                <UtilitiesItem key={utility._id} utility={utility} />
              ))}
            </Table.Body>
          )}
          {isLoading && (
            <Table.Body className='divide-y'>
              <Table.Row>
                <Table.Cell colSpan={6}>
                  <div
                    role='status'
                    className='max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700'
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
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </Table>
      </div>
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
            <h3 className='text-2xl font-medium text-gray-900 dark:text-white'>Thêm tiện ích</h3>
            <form noValidate onSubmit={handleSubmit(onSubmitCreate)}>
              <InputEffect
                labelName='Tên tiện ích'
                name='name'
                placeholder='Nhập tên tiện ích'
                registerFC={register}
                error_type={errors.name}
                error_message={errors.name?.message}
              />
              <InputEffect
                labelName='Giá tiện ích'
                name='price'
                placeholder='Nhập giá tiện ích'
                registerFC={register}
                type_input='number'
                error_type={errors.price}
                error_message={errors.price?.message}
              />
              <InputEffect
                labelName='Đơn vị (nếu có)'
                name='unit'
                placeholder='Nhập đơn vị tiện ích'
                registerFC={register}
                error_type={errors.unit}
                error_message={errors.unit?.message}
              />
              <div className='w-full flex justify-center'>
                <Button type='submit'>Thêm</Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default Utilities
