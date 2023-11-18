import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React, { useContext, useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginAccount } from '~/apis/auth.api'
import Button from '~/components/Button/Button'
import Input from '~/components/Input'
import { usePath } from '~/constants/usePath'
import { AppContext } from '~/context/app.context'
import { User } from '~/types/user.type'
import { ResponseErrorAPI, ResponseSuccessAPI } from '~/types/utils.type'
import { FormLoginType, LoginSchema } from '~/utils/rules'
import { isAxiosError } from '~/utils/utils'
import './Login.css'
import { Auth } from '~/types/auth.type'
// Define props interface used
interface ILoginProps {}
const Login: React.FC<ILoginProps> = (_props: ILoginProps) => {
  const { setAuthenticated, setUser, setIsLoading } = useContext(AppContext)
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormLoginType>({
    resolver: yupResolver(LoginSchema)
  })
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormLoginType) => loginAccount(body)
  })

  const handleLogin: SubmitHandler<FormLoginType> = (data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (res) => {
        const _data = res.data as Auth
        setUser(_data.data.user)
        const condition = _data.data.user.role === 'admin'
        if (condition) {
          setAuthenticated(true)
          toast.success((res.data as ResponseSuccessAPI<User>).message)
        } else {
          setAuthenticated(false)
          toast.error('Bạn không có quyền truy cập')
        }
      },
      onError: (err) => {
        if (isAxiosError<ResponseErrorAPI<FormLoginType>>(err)) {
          const errorForm = err.response?.data.data
          if (errorForm) {
            Object.keys(errorForm).forEach((key) => {
              setError(key as keyof FormLoginType, {
                message: errorForm[key as keyof FormLoginType],
                type: 'Server error'
              })
            })
          }
        }
      }
    })
  }
  useEffect(() => {
    setIsLoading(loginAccountMutation.isLoading)
    return () => {
      setIsLoading(false)
    }
  }, [loginAccountMutation.isLoading, setIsLoading])
  return (
    <>
      <div className='bg-[#EAEEF4] w-full'>
        <div className='max-w-screen-xl mx-auto md:px-10 lg:px-32 md:py-10'>
          <div className='grid md:grid-cols-2 justify-center lg:justify-normal py-10 md:py-0'>
            <div className='animate__animated animate__bounceInLeft relative flex-1 lg:flex flex items-start justify-start pr-24'>
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
              <form noValidate onSubmit={handleSubmit(handleLogin)}>
                <div className='text-center text-xl py-3 font-bold'>Đăng Nhập</div>
                <Input
                  labelName='Địa chỉ email'
                  name='email'
                  placeholder='Nhập địa chỉ email...'
                  registerFC={register}
                  types='email'
                  error_message={errors.email?.message}
                  error_type={errors.email}
                  auto_complete='on'
                />
                <Input
                  labelName='Mật khẩu'
                  name='password'
                  placeholder='Nhập mật khẩu...'
                  registerFC={register}
                  types='password'
                  error_message={errors.password?.message}
                  error_type={errors.password}
                  auto_complete='on'
                />
                <div className='mb-6 flex justify-between items-center w-full'>
                  <div className='w-48 flex items-center'>
                    <input
                      id='terms'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                      required
                    />
                    <label htmlFor='terms' className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Ghi nhớ tôi
                    </label>
                  </div>
                  <div>
                    <NavLink
                      className='text-sm font-medium text-teal-700 hover:text-teal-500'
                      to={usePath.forgotPassword}
                    >
                      Quên mật khẩu?
                    </NavLink>
                  </div>
                </div>
                <div className='text-center mb-6'>
                  <Button
                    type='submit'
                    disabled={loginAccountMutation.isLoading}
                    className='flex gap-3 justify-center items-center h-10 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 w-full text-white bg-teal-800 hover:bg-teal-700 focus:ring-teal-600'
                  >
                    {loginAccountMutation.isLoading && (
                      <svg
                        aria-hidden='true'
                        className='w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                    )}
                    {!loginAccountMutation.isLoading && (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
                        />
                      </svg>
                    )}
                    <span>Đăng nhập</span>
                  </Button>
                </div>
                <div className='relative w-1/2 mx-auto mb-6 h-[1px] bg-gray-500'>
                  <span
                    className='px-5 bg-white'
                    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                  >
                    Hoặc
                  </span>
                </div>
                <div className='grid md:grid-cols-3 items-center gap-2'>
                  <button
                    type='button'
                    className='py-2.5 px-5 flex items-center justify-center gap-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                  >
                    <img src='img/fb.png' alt='fb' className='w-6 h-6 object-cover' />
                    <span>Facebook</span>
                  </button>
                  <button
                    type='button'
                    className='py-2.5 px-5 flex items-center justify-center gap-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                  >
                    <img src='img/gg.png' alt='fb' className='w-6 h-6 object-cover' />
                    <span>Google</span>
                  </button>
                  <button
                    type='button'
                    className='py-2.5 px-5 flex items-center justify-center gap-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                  >
                    <img src='img/gh.png' alt='fb' className='w-6 h-6 object-cover' />
                    <span>Github</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login
