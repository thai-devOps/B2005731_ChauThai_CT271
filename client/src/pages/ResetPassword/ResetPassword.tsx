import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ResetFormType, resetPasswordSchema } from '~/utils/rules'
import Input from '~/components/Input'
import { useMutation } from '@tanstack/react-query'
import { changePassword } from '~/apis/auth.api'
import { toast } from 'react-toastify'
import { isAxiosError } from '~/utils/utils'
import { ResponseErrorAPI } from '~/types/utils.type'
const ResetPassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError
  } = useForm<ResetFormType>({
    resolver: yupResolver(resetPasswordSchema) as any
  })
  const changePasswordMutation = useMutation({
    mutationFn: ({ password, new_password }: { password: string; new_password: string }) =>
      changePassword({ password, new_password })
  })

  const handleResetPassword: SubmitHandler<ResetFormType> = (data) => {
    changePasswordMutation.mutate(
      {
        password: data.password,
        new_password: data.new_password
      },
      {
        onSuccess: () => {
          toast.success('Đổi mật khẩu thành công')
          reset()
        },
        onError: (err) => {
          if (isAxiosError<ResponseErrorAPI<ResetFormType>>(err)) {
            setError('password', {
              type: 'server',
              message: (err.response?.data as any)?.errors.password.msg.message
            })
          }
        }
      }
    )
  }
  return (
    <div className='max-w-lg mt-24 mb-6 mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300'>
      <h1 className='text-4xl font-medium'>Đổi mật khẩu</h1>
      <form onSubmit={handleSubmit(handleResetPassword)} className='my-3'>
        <div className='flex flex-col'>
          <Input
            registerFC={register}
            name='password'
            types='password'
            labelName='Mật khẩu cũ'
            error_message={errors.password?.message}
            error_type={errors.password}
            placeholder='Nhập mật khẩu cũ'
          />
          <Input
            registerFC={register}
            name='new_password'
            types='password'
            labelName='Mật khẩu mới'
            error_message={errors.new_password?.message}
            error_type={errors.new_password}
            placeholder='Nhập mật khẩu mới'
          />
          <Input
            registerFC={register}
            name='confirm_new_password'
            types='password'
            labelName='Xác nhận mật khẩu mới'
            error_message={errors.confirm_new_password?.message}
            error_type={errors.confirm_new_password}
            placeholder='Nhập lại mật khẩu mới'
          />

          <button className='w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z'
              />
            </svg>
            <span>Xác nhận</span>
          </button>
        </div>
      </form>
    </div>
  )
}
export default ResetPassword
