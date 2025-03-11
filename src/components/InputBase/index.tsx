import React, { forwardRef, memo } from 'react'
import classNames from 'classnames'
import { inputBaseVariants } from './variants'

export interface InputBaseProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean
  endAdornment?: React.ReactNode
  color?: 'primary' | 'error'
  startAdornment?: React.ReactNode
  containerProps?: React.HTMLAttributes<HTMLDivElement>
  InputComponent?: React.ReactNode
  containerRef?: React.RefObject<HTMLDivElement>
}

const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      disabled,
      endAdornment,
      className,
      color,
      startAdornment,
      InputComponent,
      containerProps,
      containerRef,
      width,
      ...other
    },
    ref
  ) => {
    return (
      <div>
        <div
          ref={containerRef}
          {...containerProps}
          className={inputBaseVariants({
            disabled: !!disabled,
            className: className,
            color
          })}
          style={{ minWidth: width ?? '100%' }}
        >
          {startAdornment && (
            <div
              className={classNames('flex cursor-pointer items-center justify-center p-[4px]', {
                'color-icon-disabled': disabled
              })}
            >
              {React.cloneElement(startAdornment as React.ReactElement, {
                color: disabled ? 'disabled' : 'default',
                size: 'large'
              })}
            </div>
          )}

          {!InputComponent ? (
            <input
              className={`min-h-8 w-full appearance-none bg-transparent px-2 py-1 font-sans outline-none ${startAdornment ? '' : ''} ${endAdornment ? '' : ''}`}
              ref={ref}
              disabled={disabled}
              {...other}
            />
          ) : (
            React.cloneElement(InputComponent as React.ReactElement, {
              className: `min-h-8 appearance-none bg-transparent py-1 px-2 outline-none`,
              ref: ref,
              disabled: disabled,
              ...other
            })
          )}

          {endAdornment && (
            <div
              className={classNames('flex items-center justify-center p-[4px]', {
                'color-icon-disabled': disabled,
                'cursor-pointer': !disabled
              })}
            >
              {React.cloneElement(endAdornment as React.ReactElement, {
                // color: disabled ? 'disabled' : 'default',
                size: 'large'
              })}
            </div>
          )}
        </div>
      </div>
    )
  }
)

InputBase.displayName = 'InputBase'

export default memo(InputBase)
