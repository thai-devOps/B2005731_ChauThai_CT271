import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Modal, Table } from 'flowbite-react'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { deleteUtilityById, updateUtilityById } from '~/apis/auth.api'
import InputEffect from '~/components/InputEffect'
import { Utility } from '~/types/utility.type'
import { updateUtilitySchema } from '~/utils/rules'
import { formatDateTime } from '~/utils/utils'

interface Props {
  utility: Utility
}

const UtilitiesItem: React.FC<Props> = ({ utility }) => {
  const queryClient = useQueryClient()
  const [openModal, setOpenModal] = useState<string | undefined>()
  const [openModalRevise, setOpenModalRevise] = useState<string | undefined>()
  const props = { openModal, setOpenModal }
  const propsRevise = { openModalRevise, setOpenModalRevise }
  const deleteAccountMutation = useMutation({
    mutationFn: (id: string) => deleteUtilityById(id)
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Utility>({
    resolver: yupResolver(updateUtilitySchema) as any,
    defaultValues: {
      name: utility.name,
      price: utility.price,
      unit: utility.unit
    }
  })
  const handleDeleteUtility = (id: string) => {
    props.setOpenModal(undefined)
    deleteAccountMutation.mutate(id, {
      onSuccess: async () => {
        toast.success('Xóa tiện ích thành công')
        await queryClient.invalidateQueries(['utilities'])
      },
      onError: () => {
        props.setOpenModal(undefined)
        toast.success('Xóa tiện ích')
      }
    })
  }
  const updateUtilityMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Utility }) => updateUtilityById(id, payload)
  })
  const onSubmitEdit: SubmitHandler<Utility> = (data) => {
    propsRevise.setOpenModalRevise(undefined)
    updateUtilityMutation.mutate(
      {
        id: utility._id,
        payload: {
          _id: utility._id,
          name: data.name,
          price: data.price,
          unit: data.unit,
          created_at: utility.created_at
        }
      },
      {
        onSuccess: async () => {
          toast.success('Sửa tiện ích thành công')
          await queryClient.invalidateQueries(['utilities'])
        },
        onError: () => {
          toast.success('Sửa tiện ích thất bại')
        }
      }
    )
  }
  return (
    <>
      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
        <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{utility.name}</Table.Cell>
        <Table.Cell>{utility.price}</Table.Cell>
        <Table.Cell>{utility.unit}</Table.Cell>
        <Table.Cell>{formatDateTime(utility.created_at)}</Table.Cell>
        <Table.Cell>{formatDateTime(utility.updated_at as string)}</Table.Cell>
        <Table.Cell>
          <div className='flex justify-center gap-2 flex-wrap'>
            <Button color='warning' onClick={() => propsRevise.setOpenModalRevise('form-elements')}>
              Sửa
            </Button>
            <Button color='failure' onClick={() => props.setOpenModal('pop-up')}>
              Xóa
            </Button>
          </div>
        </Table.Cell>
      </Table.Row>
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
              Bạn có chắc chắn muốn xóa tiện ích này không?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='gray' onClick={() => props.setOpenModal(undefined)}>
                Hủy
              </Button>
              <Button color='failure' onClick={() => handleDeleteUtility(utility._id)}>
                Xóa
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
            <h3 className='text-2xl font-medium text-gray-900 dark:text-white'>Cập nhật tiện ích</h3>
            <form noValidate onSubmit={handleSubmit(onSubmitEdit)}>
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
                <Button type='submit'>Cập nhật</Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default UtilitiesItem
