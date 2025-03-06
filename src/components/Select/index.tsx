import classNames from 'classnames'
import ScrollBar from 'components/Scrollbar'
import React, { useEffect, useRef, useState } from 'react'
import CheckedActiveIcon from '~/shared/icons/CheckedActiveIcon'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import InfoNoBgIcon from '~/shared/icons/InfoNoBgIcon'

interface OptionProps {
  id?: number
  name?: string
  isDisabled?: boolean
  key?: string
}
interface CustomSelectProps {
  options?: Array<OptionProps>
  defaultChecked?: any
  handleChange?: (value: any) => void
  isCustomDefault?: boolean
  value?: OptionProps
  className?: string
  error?: boolean
  placeholder?: string
  helperText?: string
  onFocus?: any
  onBlur?: any
  disabled?: boolean
  icon?: React.ReactNode
  isDisabledOption?: boolean
  isFixed?: boolean
  isBorderDropdown?: boolean // style for border select dropdown
  styleValue?: string // style for fontsize item dropdown
  styleDropdown?: string // style for fontsize item dropdown
  widthDropdown?: string // style for width of dropdown
  widthInput?: string // style for width of input dropdown
  heightInput?: string // style for height of input dropdown
  contentTooltipDisabled?: string // content in tooltip
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultChecked,
  handleChange,
  isCustomDefault = false,
  value,
  className,
  error,
  helperText = '',
  placeholder = 'Please select',
  onFocus,
  onBlur,
  disabled,
  icon,
  isDisabledOption,
  isFixed,
  isBorderDropdown = true,
  styleValue,
  styleDropdown,
  widthDropdown,
  widthInput,
  heightInput,
  contentTooltipDisabled
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [, setSelectedOption] = useState(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation()

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    if (disabled) {
      return
    }
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option?: any) => {
    // if (value?.name !== 'Project Manager') {
    //   return
    // }

    if (handleChange) {
      handleChange(option)
      setIsOpen(false)
      return
    } else {
      setSelectedOption(option)
      setIsOpen(false)
    }
  }

  const renderValue = () => {
    if (value) {
      return (
        <span
          className={classNames('items-start typography-body-md text-[14px]', className, {
            'text-gray-400': disabled,
            'text-gray-800': !disabled,
            [`${styleValue}`]: !!styleValue
          })}
        >
          {value.name}
        </span>
      )
    } else if (defaultChecked) {
      return (
        <span
          className={classNames('items-start typography-body-md text-gray-800 text-[14px]', className, {
            [`${styleValue}`]: !!styleValue
          })}
        >
          {defaultChecked.name}
        </span>
      )
    } else {
      return (
        <span className='items-start typography-body-md font-normal text-gray-400 text-[14px]'>{t(placeholder)}</span>
      )
    }
  }

  return (
    <>
      <div
        onFocus={onFocus}
        onBlur={onBlur}
        className={classNames('relative inline-block w-full rounded-md', {
          // 'focus-within:outline-primary-100 focus-within:outline hover:border-primary-500 focus-within:outline-[3px]':
          //   !isCustomDefault && !disabled
        })}
        ref={dropdownRef}
      >
        <div
          tabIndex={2}
          className={classNames(
            'inline-flex items-center justify-between rounded-md text-sm text-gray-700 overflow-y-hidden no-scrollbar',
            className,
            {
              'focus-within:outline-primary-100 focus-within:outline hover:border-primary-500 focus-within:outline-[3px] focus-within:border-primary-500':
                !isCustomDefault && !disabled,
              'bg-gray-100 cursor-not-allowed': disabled,
              ['border-[1.5px]']: !isCustomDefault,
              ['py-2']: !isCustomDefault && !heightInput,
              ['h-[40px]']: !isCustomDefault && !heightInput,
              ['px-3']: !isCustomDefault && !heightInput,
              ['border-red-500 border-[1.5px']: error,
              ['hover:border-primary-500 ']: !disabled,
              'w-full': !widthInput,
              [`${widthInput} px-[10px]`]: !!widthInput,
              [`${heightInput}`]: !!heightInput
            }
          )}
          onClick={toggleDropdown}
        >
          {renderValue()}

          {icon}
        </div>
        {isOpen && (
          <ul
            className={classNames(
              'z-10 bg-white  rounded-md shadow-depth02',
              {
                ['top-8 w-full']: isCustomDefault,
                'absolute w-full': !isFixed,
                'fixed w-[336px]': isFixed,
                ['border border-gray-300']: isBorderDropdown,
                [`${widthDropdown}`]: !!widthDropdown
              },
              className
            )}
          >
            <ScrollBar style={{ maxHeight: '20vh' }} className='flex-[1_1_auto] max-h-[80%]'>
              {(options || [])?.map((option) => {
                const isChecked = value ? option.id === value.id : option.id === defaultChecked?.id

                return (
                  <li
                    key={option?.id}
                    data-tooltip-id={`isDisabledOption-${option?.id}`}
                    className={classNames(
                      'px-4 py-2 last:rounded-b-md first:rounded-t-md hover:bg-gray-100 flex justify-between items-center cursor-pointer',
                      {
                        '!cursor-not-allowed':
                          isDisabledOption && (option?.name === 'Project Manager' || option?.isDisabled)
                      }
                    )}
                    onClick={() => {
                      if (isDisabledOption && (option?.name === 'Project Manager' || option?.isDisabled)) {
                        return
                      } else {
                        handleOptionClick(option)
                        return
                      }
                    }}
                  >
                    <p
                      className={classNames('typography-body-md font-light', {
                        [`${styleDropdown}`]: !!styleDropdown && !option?.isDisabled,
                        'typography-body-sm font-normal !text-gray-400': option?.isDisabled,
                        '!text-gray-400': option?.name === 'Project Manager'
                      })}
                    >
                      {t(option.name)}
                    </p>
                    {isChecked && <CheckedActiveIcon width={16} height={16} className='text-primary-600' />}
                    {isDisabledOption && (option?.name === 'Project Manager' || option?.isDisabled) && (
                      <InfoNoBgIcon className='cursor-not-allowed' width={20} height={20} />
                    )}
                    {isDisabledOption && (option?.name === 'Project Manager' || option?.isDisabled) && (
                      <ReactTooltip
                        id={`isDisabledOption-${option?.id}`}
                        place='bottom'
                        className='bg-gray-800 font-light z-[51000] w-8/12 !rounded-xl'
                        style={{ position: 'fixed', width: '60%' }}
                      >
                        {t(contentTooltipDisabled)}
                      </ReactTooltip>
                    )}
                  </li>
                )
              })}
            </ScrollBar>
          </ul>
        )}
        {error && helperText && (
          <div
            className={twMerge(
              classNames('text-sm font-normal text-gray-600 mt-[2px]', {
                'text-red-500': error
              })
            )}
          >
            {helperText}
          </div>
        )}
      </div>
    </>
  )
}
