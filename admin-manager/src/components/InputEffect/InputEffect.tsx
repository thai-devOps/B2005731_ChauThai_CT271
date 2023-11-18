import React from 'react'
import { Button, Label, Modal, Select, TextInput, Datepicker } from 'flowbite-react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import classNames from 'classnames'
interface InputEffectProps {
  type_input?: React.HTMLInputTypeAttribute
  name: string
  placeholder: string
  labelName: string
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

const InputEffect: React.FC<InputEffectProps> = ({
  auto_complete,
  error_type,
  labelName,
  error_message,
  name,
  placeholder,
  registerFC,
  rules_form,
  classnames,
  type_input,
  disable,
  selected,
  requireLable
}) => {
  return (
    <div>
      <div className={`${classnames as string} mb-4 block`}>
        <Label htmlFor={name} color={error_type && 'failure'} value={labelName}></Label>
        <TextInput
          color={error_type && 'failure'}
          autoComplete={auto_complete}
          disabled={disable}
          type={type_input}
          id={name}
          required={requireLable}
          placeholder={placeholder}
          {...registerFC(name, rules_form)}
        />
        {error_type && <span className='text-red-600 text-xs py-5 font-normal'>{error_message}</span>}
      </div>
    </div>
  )
}

export default InputEffect
