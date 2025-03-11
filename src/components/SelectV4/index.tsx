import { forwardRef, memo, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import TypographyV2 from '../TypographyV2'
import Icons from '../Icons'
import { isArray, isFunction } from 'lodash'
import SelectChip from './SelectChip'
import SelectOption, { SelectOptionProps, SelectOptions } from './SelectOption'
import classNames from 'classnames'
import Dropdown, { DropdownProps } from '../Dropdown'
import InputBase, { InputBaseProps } from 'components/InputBase'

export interface SelectProps extends Omit<InputBaseProps, 'onChange'> {
  label?: string
  helpText?: string
  error?: boolean
  required?: boolean
  color?: 'primary' | 'error'
  options: SelectOptions[]
  mode?: 'single' | 'multiple' | 'filter'
  value?: string[] | string
  fullWidth?: boolean
  renderValue?: (value: string[]) => ReactNode
  optionProps?: Pick<SelectOptionProps, 'shouldSearch' | 'searchHeader' | 'containerClassname'>
  onChange?: (value: number | number[] | string | string[] | null) => void
  customInput?: ReactNode
  dropdownProps?: Omit<DropdownProps, 'anchor' | 'children' | 'selectedValue' | 'onSelected'>
  shouldCloseOnSelect?: boolean
  selectContainerProps?: React.HTMLAttributes<HTMLDivElement>
  emptyMessage?: ReactNode
}

export interface Option {
  value: string
  label: string
}

type InputComponentProps = Omit<InputBaseProps, 'onChange'> & {
  dropdownOpen: boolean
  options: SelectProps['options']
  onClose?: () => void
  onSelected?: (option: Option) => void
  mode?: SelectProps['mode']
  selectedValue?: string[]
  containerRef?: React.RefObject<HTMLDivElement>
  containerWidth?: number | null
  renderValue?: (value: string[]) => ReactNode
  optionProps?: Pick<SelectOptionProps, 'shouldSearch' | 'searchHeader'>
}

const InputComponent = ({
  placeholder,
  className,
  options = [],
  onSelected,
  mode,
  selectedValue,
  containerWidth,
  renderValue,
  disabled
}: InputComponentProps) => {
  const [visibleSelectedValue, setVisibleSelectedValue] = useState<string[]>([])
  const [totalInvisibleValues, setTotalInvisibleValues] = useState<number>(0)

  const calculateVisibleSelectedValue = useCallback(
    (width: number | null) => {
      if (width) {
        const containerWidth = width - 86 // Subtract padding/margin
        let totalWidth = 0
        const visibleValues = []
        let totalInvisibleValues = 0

        for (const value of selectedValue || []) {
          const selectedOption = options.find((option) => option.value === value)
          const label = selectedOption?.label || value || ''
          let labelWidth = label.length * 10 // Approximate width calculation
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          if (context) {
            context.font = '14px Arial'
            const textWidth = context.measureText(label).width
            labelWidth = textWidth
          }

          totalWidth += labelWidth + 48 // Add padding/margin
          if (totalWidth < containerWidth) {
            visibleValues.push(value)
          } else {
            totalInvisibleValues++
          }
        }

        return {
          visibleValues,
          totalInvisibleValues
        }
      }
      return {
        visibleValues: [],
        totalInvisibleValues: 0
      }
    },
    [options, selectedValue]
  )

  useEffect(() => {
    if (containerWidth) {
      const visibleSelectedValue = calculateVisibleSelectedValue(containerWidth)
      setVisibleSelectedValue(visibleSelectedValue.visibleValues)
      setTotalInvisibleValues(visibleSelectedValue.totalInvisibleValues)
    }
  }, [options, selectedValue, containerWidth, calculateVisibleSelectedValue])

  const renderValueInternal = () => {
    if (selectedValue && selectedValue.length > 0) {
      if (isFunction(renderValue)) {
        return renderValue(selectedValue)
      }
      if (mode === 'single') {
        const selectedOption = options.find((option) => option.value === selectedValue[0])
        return (
          <div style={{}} className='text-p-medium leading-p-medium tracking-p-medium text-zinc-950'>
            {selectedOption?.label}
          </div>
        )
      } else if (mode === 'multiple') {
        return (
          <div
            className='flex gap-[6px]'
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {visibleSelectedValue.map((value) => {
              const selectedOption = options.find((option) => option.value === value)
              return (
                <SelectChip
                  key={value}
                  label={selectedOption?.label || value || ''}
                  shouldDelete
                  disabled={disabled}
                  onDelete={() => {
                    if (isFunction(onSelected) && !disabled) {
                      const option = selectedOption || ({ value: value, label: '' } as Option)
                      onSelected(option)
                    }
                  }}
                />
              )
            })}
            {totalInvisibleValues > 0 && <SelectChip label={`+ ${totalInvisibleValues}`} />}
          </div>
        )
      } else if (mode === 'filter') {
        return (
          <div className='flex gap-[6px]'>
            <TypographyV2 variants='paragraph' size='medium' color='inherit'>
              {placeholder}
            </TypographyV2>
            <TypographyV2
              variants='paragraph'
              size='medium'
              color={disabled ? 'disabled' : 'brand'}
            >{`(${selectedValue.length})`}</TypographyV2>
          </div>
        )
      }
    }
    return <div className='text-p-medium leading-p-medium tracking-p-medium'>{placeholder}</div>
  }

  return (
    <div
      className={classNames(`${className} flex w-full items-center`, {
        'color-text-default hover:color-text-subtle': mode === 'filter' && !disabled,
        'color-text-disabled': mode === 'filter' && disabled
      })}
    >
      <input className='hidden' />
      {renderValueInternal()}
      {/* <SelectOption
        dropdownOpen={dropdownOpen}
        options={options}
        selectedValue={selectedValue}
        onSelected={onSelected}
        {...optionProps}
      /> */}
    </div>
  )
}

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      label,
      helpText,
      error,
      color,
      options = [],
      mode = 'single',
      value,
      fullWidth,
      renderValue,
      width,
      disabled,
      onChange,
      customInput,
      dropdownProps,
      shouldCloseOnSelect = true,
      selectContainerProps,
      emptyMessage,
      ...other
    },
    ref
  ) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState<string[]>([])

    const onSelected = useCallback(
      ({ value }: Option) => {
        if (mode === 'single') {
          setSelectedValue([value])
          if (onChange) onChange(value)
        } else {
          setSelectedValue((prev) => {
            if (prev.includes(value)) {
              const newValue = prev.filter((v) => v !== value)
              if (onChange) onChange(newValue)
              return newValue
            }

            if (onChange) onChange([...prev, value])
            return [...prev, value]
          })
        }

        if (shouldCloseOnSelect) {
          setDropdownOpen(false)
        }
      },
      [mode, onChange, shouldCloseOnSelect]
    )

    useEffect(() => {
      if (!value) return

      if (isArray(value)) {
        setSelectedValue(value)
      } else {
        setSelectedValue([value])
      }
    }, [value])

    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState<number | null>(null)

    useEffect(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth)
      }
    }, [])

    useEffect(() => {
      const handleResize = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.clientWidth)
        }
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    return (
      <div
        className={classNames('relative select-none', {
          'w-full': fullWidth,
          'min-w-60': !fullWidth && !width
        })}
        style={{ width: width }}
        {...selectContainerProps}
      >
        {label && (
          <div>
            <TypographyV2 variants='label' size='medium' color='default'>
              {label}
            </TypographyV2>
            {other.required && (
              <TypographyV2 variants='label' size='medium' color='error'>
                *
              </TypographyV2>
            )}
          </div>
        )}

        <Dropdown
          placement='bottom'
          width={'100%'}
          className='rounded-[5px] p-2'
          isOpen={dropdownOpen}
          shouldControl={true}
          onClose={() => {
            setDropdownOpen(false)
          }}
          {...dropdownProps}
          anchor={
            customInput ? (
              customInput
            ) : (
              <InputBase
                ref={ref}
                {...other}
                disabled={disabled}
                color={error ? 'error' : color || 'primary'}
                endAdornment={<Icons icon={!dropdownOpen ? 'caret-down-md' : 'caret-up-md-sm'} size='large' />}
                containerRef={containerRef}
                className='w-full'
                width={width}
                containerProps={{
                  onClick: (e) => {
                    e.stopPropagation()
                    if (disabled) return
                    setDropdownOpen((prev) => !prev)
                  }
                }}
                InputComponent={
                  <InputComponent
                    dropdownOpen={dropdownOpen}
                    onClose={() => {
                      setDropdownOpen(false)
                    }}
                    onSelected={onSelected}
                    selectedValue={selectedValue}
                    mode={mode}
                    options={options}
                    containerWidth={containerWidth}
                    renderValue={renderValue}
                    disabled={disabled}
                    width={width}
                  />
                }
              />
            )
          }
        >
          <SelectOption
            dropdownOpen={true}
            options={options}
            selectedValue={selectedValue}
            onSelected={onSelected}
            shouldSearch={other.optionProps?.shouldSearch}
            searchHeader={other.optionProps?.searchHeader}
            containerClassname={other.optionProps?.containerClassname}
            emptyMessage={emptyMessage}
          />
        </Dropdown>

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

Select.displayName = 'Select'

export default memo(Select)
