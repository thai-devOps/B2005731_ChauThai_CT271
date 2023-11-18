/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import './register.css'
import { schema, type FormRegisterType, FormLoginType } from '~/utils/rules'
import Input from '~/components/Input'
import { registerAccount } from '~/apis/auth.api'
import { isAxiosError } from '~/utils/utils'
import { ResponseErrorAPI, ResponseSuccessAPI } from '~/types/utils.type'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { User } from '~/types/user.type'
import { AppContext } from '~/context/app.context'
import { useEffect } from 'react'
// Define props interface used
interface IRegisterProps {}

const Register: React.FC<IRegisterProps> = (_props: IRegisterProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormRegisterType>({
    resolver: yupResolver(schema)
  })
  const navigate = useNavigate()
  const registerAccountMutation = useMutation({
    mutationFn: (body: FormLoginType) => registerAccount(body)
  })
  const { isLoading, setIsLoading } = useContext(AppContext)
  const onSubmit: SubmitHandler<FormRegisterType> = (data) => {
    const new_data = omit(data, ['accepted_condition'])
    registerAccountMutation.mutate(new_data, {
      onSuccess: (data) => {
        navigate('/login')
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // You can also use 'auto' for instant scrolling
        })
        toast.success((data.data as ResponseSuccessAPI<User>).message)
      },
      onError: (err) => {
        if (isAxiosError<ResponseErrorAPI<Omit<FormRegisterType, 'confirm_password' | 'accepted_condition'>>>(err)) {
          const errorForm = err.response?.data.data
          if (errorForm) {
            Object.keys(errorForm).forEach((key) => {
              setError(key as keyof Omit<FormRegisterType, 'confirm_password' | 'accepted_condition'>, {
                message: errorForm[key as keyof Omit<FormRegisterType, 'confirm_password' | 'accepted_condition'>],
                type: 'Server error'
              })
            })
          }
        }
      }
    })
  }
  useEffect(() => {
    setIsLoading(registerAccountMutation.isLoading)
    return () => {
      setIsLoading(false)
    }
  }, [registerAccountMutation.isLoading, setIsLoading])
  return (
    <div className='bg-[#EAEEF4] w-full'>
      <div className='max-w-screen-xl mx-auto md:px-10 lg:px-32 md:py-10'>
        <div className='grid md:grid-cols-2 justify-center lg:justify-normal py-10 md:py-0'>
          <div className='relative flex-1 lg:flex flex items-start justify-start pr-24'>
            <div data-metatip='true' className='hidden md:block'>
              <div className='space-y-16 max-w-md mt-32 relative'>
                <div className='absolute -right-[100px] -top-[220px]'>
                  <svg width={300} height={300} viewBox='0 0 300 300' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g clipPath='url(#clip0_1_30)'>
                      <path
                        d='M38.0754 218.925C109.171 232.487 309.453 98.9549 257.894 74.0052C206.335 49.0555 181.826 191.083 272.942 247.572'
                        stroke='#29DEC7'
                        strokeWidth={3}
                      />{' '}
                      <path d='M252.945 252.971L274.422 248.584L270.035 227.107' stroke='#29DEC7' strokeWidth={3} />{' '}
                      <path
                        d='M200.279 142.775L18.7197 183.177L30.7255 237.129L212.285 196.728L200.279 142.775Z'
                        fill='url(#paint0_linear_1_30)'
                      />
                    </g>{' '}
                    <defs>
                      <linearGradient
                        id='paint0_linear_1_30'
                        x1='92.2751'
                        y1='208.881'
                        x2='130.094'
                        y2='132.464'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stopColor='#EBEEF3' /> <stop offset={1} stopColor='#EBEEF3' stopOpacity={0} />
                      </linearGradient>{' '}
                      <clipPath id='clip0_1_30'>
                        <rect
                          width='246.425'
                          height='263.396'
                          fill='white'
                          transform='translate(0 222.504) rotate(-64.5454)'
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>{' '}
                <div
                  className='space-y-8 rounded-3xl text-white px-10 py-10 -rotate-[5deg] shadow-xl'
                  style={{ background: 'rgb(36, 69, 84)' }}
                >
                  <div>
                    <h3 className='tracking-wider italic font-medium text-lg lg:text-2xl max-w-sm leading-9'>
                      “Chào mừng đến với ứng dụng quản lý phòng trọ tiện lợi và đáng tin cậy!”
                    </h3>
                    {/* <h3 className='italic font-medium text-2xl max-w-sm leading-9'>
                      “Chào mừng đến với ứng dụng quản lý phòng trọ tiện lợi và đáng tin cậy! Chúng tôi cung cấp một nền
                      tảng dễ sử dụng để bạn tìm kiếm và thuê căn hộ, phòng trọ, và chỗ ở phù hợp với nhu cầu của bạn.”
                    </h3> */}
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='text-lg leading-tight'>
                      <p>Chau Thai</p> <p className='opacity-70'>Front-end developer.</p>
                    </div>{' '}
                    <div className='bg-white rounded-md w-16 h-16 p-1.5 flex items-center rotate-[10deg] shadow'>
                      <img src='https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/639b2e83-ee4c-44a6-8662-351304735cf7.png' />
                    </div>
                  </div>
                </div>{' '}
              </div>
            </div>
          </div>
          <div className='animate__animated animate__bounceInRight glass_form w-full lg:max-w-[450px]'>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className='text-center text-xl py-3 font-bold'>Đăng Ký Tài Khoản</div>
              <Input
                name='name'
                labelName='Họ tên'
                placeholder='Nhập họ tên...'
                registerFC={register}
                types='text'
                auto_complete='on'
                error_message={errors.name?.message}
                error_type={Boolean(errors.name)}
              />
              <Input
                name='phone_number'
                labelName='Số điện thoại'
                placeholder='Nhập số điện thoại...'
                registerFC={register}
                types='email'
                auto_complete='on'
                error_message={errors.phone_number?.message}
                error_type={Boolean(errors.phone_number)}
              />
              <Input
                name='email'
                labelName='Địa chỉ email'
                placeholder='Nhập địa chỉ email...'
                registerFC={register}
                types='email'
                auto_complete='on'
                error_message={errors.email?.message}
                error_type={Boolean(errors.email)}
              />
              <Input
                name='password'
                labelName='Mật khẩu'
                placeholder='Nhập mật khẩu...'
                registerFC={register}
                types='password'
                auto_complete='on'
                error_message={errors.password?.message}
                error_type={Boolean(errors.password)}
              />
              <Input
                name='confirm_password'
                labelName='Nhập lại mật khẩu'
                placeholder='Nhập lại mật khẩu...'
                registerFC={register}
                types='password'
                auto_complete='on'
                error_message={errors.confirm_password?.message}
                error_type={Boolean(errors.confirm_password)}
              />

              <div className='mb-6'>
                <div className='flex items-center'>
                  <input
                    id='link-checkbox'
                    type='checkbox'
                    {...register('accepted_condition')}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label htmlFor='link-checkbox' className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                    Tôi đồng ý với các{' '}
                    <a href='#' className='text-blue-600 dark:text-blue-500 hover:underline'>
                      điều khoản và điều kiện.
                    </a>
                  </label>
                </div>
                {errors.accepted_condition && (
                  <div className='mt-2 text-xs text-red-600 dark:text-red-400'>{errors.accepted_condition.message}</div>
                )}
              </div>
              <div className='text-center'>
                <button
                  type='submit'
                  className='flex gap-5 justify-center items-center h-10 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 w-full text-white bg-teal-800 hover:bg-teal-700 focus:ring-teal-600'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                    />
                  </svg>
                  <span>Tạo tài khoản</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register
