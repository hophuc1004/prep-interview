import { isFunction } from 'lodash'
import TypographyV2 from '../TypographyV2'
import Icons, { IconProps } from '../Icons'
import { Option } from '.'
import { ReactNode, useState } from 'react'
import classNames from 'classnames'
import TextFieldV2 from '../TextFieldV2'
import CheckBox from 'components/Checkbox'
export interface SelectOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  label: string
  render?: (option: Omit<SelectOptions, 'render'>) => ReactNode
  disabled?: boolean
  checkBox?: boolean
  subLabel?: string
  icon?: IconProps['icon']
  tickIcon?: boolean
  renderLabel?: (option: Omit<SelectOptions, 'render' | 'renderLabel'>) => ReactNode
}
export interface SelectOptionProps {
  dropdownOpen: boolean
  options: SelectOptions[]
  selectedValue?: string[]
  onSelected?: (option: Option) => void
  shouldSearch?: boolean
  searchHeader?: string
  onSearch?: (value: string) => void
  containerClassname?: string
  emptyMessage?: ReactNode
}
const SelectOption = ({
  dropdownOpen,
  options,
  selectedValue,
  onSelected,
  shouldSearch,
  searchHeader,
  onSearch,
  containerClassname,
  emptyMessage
}: SelectOptionProps) => {
  const [internalOptions, setInternalOptions] = useState<SelectOptions[]>(options)

  if (!dropdownOpen) return null

  return (
    <div className={classNames('scroll-bar w-full overflow-y-auto', containerClassname)}>
      {shouldSearch && (
        <div className='px-4'>
          <div className='flex flex-col gap-2'>
            <TypographyV2 variants='label' size='medium'>
              {searchHeader || 'Search'}
            </TypographyV2>

            <TextFieldV2
              placeholder='Search'
              startAdornment={<Icons icon='search' size='medium' />}
              onChange={(e) => {
                if (isFunction(onSearch)) {
                  onSearch(e.target.value)
                }

                if (!e.target.value) {
                  setInternalOptions(options)
                } else {
                  setInternalOptions(
                    options.filter(
                      (option) =>
                        option.label.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        option.value.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                  )
                }
              }}
            />
          </div>
          <div className='my-3 h-[1px] bg-foreground-subtlest'></div>
        </div>
      )}
      {internalOptions.length === 0 && (
        <div className='flex w-auto items-center justify-center p-2'>
          {!emptyMessage ? (
            <TypographyV2 className='text-center' variants='label' size='medium'>
              No options available
            </TypographyV2>
          ) : (
            emptyMessage
          )}
        </div>
      )}
      {internalOptions.map((option) => {
        const selected = selectedValue && selectedValue?.includes(option.value)
        const disabled = option.disabled || false
        const color = disabled ? 'disabled' : 'default'

        return (
          <div
            key={option.value}
            className={classNames(
              'flex h-[56px] w-auto items-center truncate px-4 py-2 hover:bg-foreground-white-hover',
              {
                'hover:bg-foreground-white': disabled
              }
            )}
            onClick={() => {
              if (isFunction(onSelected) && !disabled) {
                onSelected(option)
              }
            }}
          >
            {option.render ? (
              option.render(option)
            ) : (
              <div className='flex w-full items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {option.checkBox && (
                    <CheckBox
                      checked={selected}
                      disabled={disabled}
                      defaultChecked={selected}
                      onChange={(e) => {
                        console.log(e.target.checked)
                      }}
                    />
                  )}
                  {option.icon && <Icons icon={option.icon} size='medium' color={color} />}

                  {option.renderLabel ? (
                    option.renderLabel(option)
                  ) : (
                    <TypographyV2 variants='paragraph' size='medium' color={color}>
                      {option.label}
                    </TypographyV2>
                  )}
                </div>

                <div>
                  {option.subLabel && (
                    <TypographyV2 variants='paragraph' size='small' color={color}>
                      {option.subLabel}
                    </TypographyV2>
                  )}
                  {option.tickIcon && selected && (
                    <Icons
                      icon='check-big'
                      className='ml-auto'
                      size='large'
                      color={disabled ? 'disabled' : 'default'}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default SelectOption
