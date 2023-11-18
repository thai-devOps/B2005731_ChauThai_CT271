import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateProfile } from '~/apis/auth.api'
import Button from '~/components/Button/Button'
import Input from '~/components/Input'
import { AppContext } from '~/context/app.context'
import { User } from '~/types/user.type'
import { setUserToLocalStorage } from '~/utils/auth'
import { ProfileType, profileSchema } from '~/utils/rules'
// Define props interface used
interface IUpdateProfileProps {}
const UpdateProfile: React.FC<IUpdateProfileProps> = (_props: IUpdateProfileProps) => {
  const { user, setUser } = useContext(AppContext)
  const defaut_value: ProfileType = {
    avatar: user.avatar || '',
    email: user.email,
    name: user.name,
    phone_number: user.phone_number,
    cccd: user.cccd || '',
    address: user.address || '',
    date_of_birth: user.date_of_birth || '',
    gender: user.gender || '',
    _id: user._id || '',
    role: user.role
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileType>({
    resolver: yupResolver(profileSchema) as any,
    defaultValues: defaut_value
  })
  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileType) => updateProfile(data)
  })
  const navigate = useNavigate()
  const handleUpdateProfile: SubmitHandler<ProfileType> = (data) => {
    updateProfileMutation.mutate(data, {
      onSuccess: (res) => {
        toast.success(res.data.message as string)
        const result = res.data
        setUserToLocalStorage(result.data as User)
        setUser(result.data as User)
        navigate('/profile')
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }
  return (
    <div className='max-w-screen-lg mx-auto  py-8 px-0 md:px-52'>
      {!updateProfileMutation.isLoading && (
        <form noValidate onSubmit={handleSubmit(handleUpdateProfile)}>
          <Input
            labelName='Link avatar'
            name='avatar'
            placeholder=''
            registerFC={register}
            types='text'
            error_message={errors.avatar?.message}
            error_type={errors.avatar}
          />
          <div className='gap-5 grid grid-cols-1 md:grid-cols-2'>
            <Input
              labelName='Họ tên'
              name='name'
              placeholder=''
              registerFC={register}
              types='text'
              error_message={errors.name?.message}
              error_type={errors.name}
              auto_complete='on'
            />
            <Input
              labelName='Ngày sinh'
              name='date_of_birth'
              placeholder=''
              registerFC={register}
              types='date'
              error_message={errors.date_of_birth?.message}
              error_type={errors.date_of_birth}
              auto_complete='on'
            />
          </div>
          <Input
            labelName='Địa chỉ email'
            name='email'
            placeholder=''
            disable={true}
            registerFC={register}
            types='email'
            error_message={errors.email?.message}
            error_type={errors.email}
            auto_complete='on'
          />
          <div className='gap-5 grid grid-cols-1 md:grid-cols-2'>
            <Input
              labelName='Số điện thoại'
              name='phone_number'
              placeholder=''
              registerFC={register}
              types='tel'
              error_message={errors.phone_number?.message}
              error_type={errors.phone_number}
              auto_complete='on'
            />
            <Input
              labelName='Giới tính'
              name='gender'
              selected={true}
              placeholder=''
              registerFC={register}
              error_message={errors.gender?.message}
              error_type={errors.gender}
              auto_complete='on'
            />
          </div>
          <div className='gap-5 grid grid-cols-1 md:grid-cols-2'>
            <Input
              labelName='CMNN/CCCD'
              name='cccd'
              placeholder=''
              registerFC={register}
              types='text'
              error_message={errors.cccd?.message}
              error_type={errors.cccd}
              auto_complete='on'
            />
            <Input
              labelName='Địa chỉ'
              name='address'
              placeholder=''
              registerFC={register}
              types='text'
              error_message={errors.address?.message}
              error_type={errors.address}
              auto_complete='on'
            />
          </div>
          <div className='text-center mb-6'>
            <Button
              type='submit'
              className='flex gap-3 justify-center items-center h-10 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 w-full md:w-1/4 md:mx-auto text-white bg-primary-800 hover:bg-primary-700 focus:ring-primary-600'
            >
              {
                <svg
                  className='w-6 h-6'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 19'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3m-5.5 0V1.07M5.5 5l4-4 4 4'
                  />
                </svg>
              }
              <span>Cập nhật</span>
            </Button>
          </div>
        </form>
      )}
      {updateProfileMutation.isLoading && (
        <div role='status' className='max-w-sm animate-pulse'>
          <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4' />
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5' />
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5' />
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5' />
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5' />
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]' />
          <span className='sr-only'>Loading...</span>
          <div className='h-2.5 bg-gray-200 rounded-full mt-10 dark:bg-gray-700 w-48 mb-4' />
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5' />
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5' />
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5' />
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5' />
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]' />
          <span className='sr-only'>Loading...</span>
        </div>
      )}
    </div>
  )
}
export default UpdateProfile
