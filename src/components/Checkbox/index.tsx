import React from 'react'
import { checkBoxInputContainerVariants, checkBoxVariants } from './variants'
import Icons from '../Icons'
import TypographyV2 from '../TypographyV2'

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean
  label?: string
  helpText?: string
  id?: string
}

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ disabled, label, helpText, id, checked, onChange, ...other }: CheckBoxProps, ref) => {
    return (
      <div className='flex items-start gap-2'>
        <div className={checkBoxInputContainerVariants({})}>
          <input
            {...other}
            ref={ref}
            defaultChecked={checked}
            id={id}
            value={checked ? 'on' : 'off'}
            checked={onChange ? checked : undefined}
            className={checkBoxVariants({ disabled })}
            type='checkbox'
            disabled={disabled}
            onChange={onChange}
          />
          <Icons
            className='pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity peer-checked:opacity-100'
            icon='check-big'
            size='medium'
            color='inverse'
          />
        </div>
        {label && (
          <div className='flex flex-col'>
            <TypographyV2
              htmlFor={id}
              as={'label'}
              variants='paragraph'
              size='small'
              color={disabled ? 'disabled' : 'default'}
            >
              {label}
            </TypographyV2>
            {helpText && (
              <TypographyV2 variants='paragraph' size='x-small' color={disabled ? 'disabled' : 'subtle'}>
                {helpText}
              </TypographyV2>
            )}
          </div>
        )}
      </div>
    )
  }
)

CheckBox.displayName = 'CheckBox'

export default CheckBox
