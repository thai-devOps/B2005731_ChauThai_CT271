import React, { ButtonHTMLAttributes } from 'react'
// Define props interface used
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}
const Button: React.FC<IButtonProps> = (_props: IButtonProps) => {
  const { isLoading, className, disabled, children, ...rest } = _props
  const newClassName = disabled ? (className as string) + ' cursor-not-allowed' : className
  return (
    <button className={newClassName} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
export default Button
