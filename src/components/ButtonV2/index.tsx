import { forwardRef } from 'react'
import TypographyV2 from '../TypographyV2'
import { buttonVariants } from './variants'
import Icons, { IconProps } from '../Icons'
import { svgIcons } from '~/shared/icons'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large'
  variants?: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
  startIcon?: IconProps['icon'] | JSX.Element
}
export type ButtonRef = HTMLButtonElement

const Button = forwardRef<ButtonRef, ButtonProps>(
  ({ size = 'medium', variants, disabled, children, startIcon, ...other }, ref) => {
    const renderIcon = () => {
      if (!startIcon) {
        return null
      }

      if (typeof startIcon === 'string' && Object.keys(svgIcons).includes(startIcon)) {
        return (
          <Icons
            icon={startIcon as IconProps['icon']}
            color={disabled || variants === 'primary' ? 'inverse' : 'default'}
          />
        )
      }
      return <div className='flex size-5 items-center justify-center overflow-hidden'>{startIcon}</div>
    }

    return (
      <button
        ref={ref}
        className={buttonVariants({ size, variants, disabled })}
        disabled={disabled}
        {...other}
        onClick={!disabled ? other.onClick : undefined}
        onMouseDown={!disabled ? other.onMouseDown : undefined}
        onMouseUp={!disabled ? other.onMouseUp : undefined}
        onKeyDown={!disabled ? other.onKeyDown : undefined}
        onKeyUp={!disabled ? other.onKeyUp : undefined}
        onFocus={!disabled ? other.onFocus : undefined}
        onBlur={!disabled ? other.onBlur : undefined}
      >
        {renderIcon()}
        <div className='flex w-full items-center justify-center px-2 py-0'>
          <TypographyV2
            as='p'
            variants='paragraph'
            size={'medium'}
            color={disabled || variants === 'primary' ? 'inverse' : 'default'}
            className='text-[0.875rem] leading-[24px]'
          >
            {children}
          </TypographyV2>
        </div>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
