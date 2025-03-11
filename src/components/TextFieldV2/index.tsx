import { forwardRef, memo } from 'react'
import InputBase, { InputBaseProps } from '../InputBase'
import TypographyV2 from '../TypographyV2'
import Icons from '../Icons'

interface TextFieldProps extends InputBaseProps {
  label?: string
  helpText?: string
  error?: boolean
  required?: boolean
  color?: 'primary' | 'error'
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, helpText, error, color, disabled, width, type, ...other }, ref) => {
    return (
      <div
        style={{
          width: width
        }}
      >
        {label && (
          <div>
            <TypographyV2 variants='label' size='medium' color={'default'}>
              {label}
            </TypographyV2>
            {other.required && (
              <TypographyV2 variants='label' size='medium' color='error'>
                *
              </TypographyV2>
            )}
          </div>
        )}
        <InputBase
          ref={ref}
          disabled={disabled}
          width={width}
          type={type}
          {...other}
          color={error ? 'error' : color || 'primary'}
        />

        {helpText && (
          <div className='flex items-center gap-1'>
            {error && <Icons icon='circle-warning' size='small' color='error' />}
            <TypographyV2 variants='paragraph' size='small' color={error ? 'error' : 'subtle'}>
              {helpText}
            </TypographyV2>
          </div>
        )}
      </div>
    )
  }
)

TextField.displayName = 'TextField'

export default memo(TextField)
