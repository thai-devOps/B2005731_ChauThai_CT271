import React from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import classNames from 'classnames'
interface InputProps {
  types?: React.HTMLInputTypeAttribute
  name: string
  placeholder: string
  labelName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerFC: UseFormRegister<any>
  rules_form?: RegisterOptions | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error_type?: any
  classnames?: string | ''
  error_message?: string | undefined
  auto_complete?: string
  selected?: boolean
  disable?: boolean
  requireLable?: boolean
}

const Input: React.FC<InputProps> = ({
  auto_complete,
  error_type,
  labelName,
  error_message,
  name,
  placeholder,
  registerFC,
  rules_form,
  classnames,
  types,
  disable,
  selected,
  requireLable
}) => {
  return (
    <div className={`mb-6 ${classnames as string}`}>
      <label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {labelName}
        {requireLable ? <span className='text-red-500 text-sm'> *</span> : ''}
      </label>
      {!selected && (
        <input
          type={types}
          disabled={disable}
          id={name}
          autoComplete={auto_complete}
          {...registerFC(name, rules_form)}
          className={classNames({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            'block w-full rounded-lg border animate__animated animate__headShake border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500':
              error_type,
            'block w-full rounded-lg border-[2px] shadow-sm border-slate-300 p-2.5 text-sm text-gray-900 focus:border-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500':
              !error_type,
            'cursor-not-allowed bg-gray-200': disable
          })}
          placeholder={placeholder}
        />
      )}
      {selected && (
        <select
          defaultValue={'Chưa cập nhật'}
          {...registerFC(name, rules_form)}
          className={classNames({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            'block w-full rounded-lg border animate__animated animate__headShake border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500':
              error_type,
            'block w-full rounded-lg border-[2px] shadow-sm border-slate-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500':
              !error_type
          })}
        >
          <option value='Chưa cập nhật'>Chọn giới tính</option>
          <option value='Nam'>Nam</option>
          <option value='Nữ'>Nữ</option>
          <option value='Khác'>Khác</option>
        </select>
      )}
      {error_type && <span className='text-red-600 text-xs py-5 font-normal'>{error_message}</span>}
    </div>
  )
}

export default Input
