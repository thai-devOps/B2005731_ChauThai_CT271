import React from 'react'
import { Select } from 'flowbite-react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
interface SelectionEffectProps {
  type_input?: React.HTMLInputTypeAttribute
  name: string
  placeholder?: string
  labelName: string
  registerFC: UseFormRegister<any>
  rules_form?: RegisterOptions | undefined
  error_type?: any
  classnames?: string | ''
  error_message?: string | undefined
  auto_complete?: string
  disable?: boolean
  requireLable?: boolean
  props: React.ReactNode
}

const SelectionEffect: React.FC<SelectionEffectProps> = ({
  auto_complete,
  error_type,
  labelName,
  error_message,
  name,
  placeholder,
  registerFC,
  rules_form,
  classnames,
  disable,
  props,
  requireLable
}) => {
  return (
    <div>
      <div className={`${classnames as string} mb-4 block`}>
        <label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          {labelName}
          {requireLable ? <span className='text-red-500 text-sm'> *</span> : ''}
        </label>
        {/* <Label htmlFor={name} color={error_type && 'failure'} value={labelName}></Label> */}
        <Select
          color={error_type && 'failure'}
          autoComplete={auto_complete}
          disabled={disable}
          id={name}
          required={requireLable}
          placeholder={placeholder}
          {...registerFC(name, rules_form)}
        >
          {props}
        </Select>
        {error_type && <span className='text-red-600 text-xs py-5 font-normal'>{error_message}</span>}
      </div>
    </div>
  )
}

export default SelectionEffect
