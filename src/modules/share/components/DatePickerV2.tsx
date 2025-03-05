import classNames from 'classnames'
import TextField from 'components/TextField'
import { format } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'
import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker'
import ArrowLeftIcon from '~/shared/icons/ArrowLeftIcon'
import ArrowRightIcon from '~/shared/icons/ArrowRightIcon'
import { CalendarMonthIcon } from '~/shared/icons/CalendarMonth'
import { fDate } from '~/shared/utils/format-time'
import { Button } from 'components/Button'
import { t } from 'i18next'
import ChervonDown from '~/shared/icons/ChervonDown'

export const css = `
.rdp {
  --rdp-cell-size: 36px;
  --rdp-accent-color: #3b82f6;
  --rdp-background-color: #e5e7eb;
  --rdp-accent-color-dark: #2563eb;
  --rdp-background-color-dark: #1f2937;
  margin: 0;
}

.rdp-cell {
  text-align: center;
  padding: 4px
}

.rdp-button.rdp-day {
  padding: 2px 4px;
  border-radius: 50%;
}

.rdp-table {
  width: 100%
}

.rdp-tbody .rdp-row .rdp-cell {
    padding: 2px;
}
.rdp-months {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}
.rdp-month {
  background: white;
}
.rdp-caption {
  position: relative;
  height: 32px;
}
.rdp-caption_label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  position: relative;
  z-index: 50;
  padding: 4px 8px;
  background-color: #fff;
  border-radius: 8px;
  
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #F4F4F5;
  }

  &.active {
    background-color: red !important;
    // background-color: #E4E4E7 !important;
  }
}
.rdp-head_cell {
  font-weight: 600;
  color: #374151;
    padding-left: 2px;
    padding-right: 2px;
}
  .rdp-head {
    margin-bottom: 8px !important;
    max-height: 24px !important
  }

  .rdp-tbody {
    padding-bottom: 8px !important;
  }
.rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
  background-color: #e5e7eb;
}
.rdp-day_selected {
  background-color: var(--rdp-accent-color);
  color: white;
}
.rdp-day_selected:hover {
  background-color: var(--rdp-accent-color-dark);
}
.rdp-button[disabled]:not(.rdp-day_selected) {
  color : #A1A1AA !important;
}

.rdp-button_reset.rdp-button.rdp-day.rdp-day_disabled:hover {
  background-color: white !important;
}

.today-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.today-button:hover {
  background-color: #f3f4f6;
}

.dropdown-container {
  position: absolute;
  top: 95%;
  // left: 50%;
  // transform: translateX(-50%);
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  display: grid;
  grid-template-columns: auto auto;
  margin-top: 0.25rem;
  z-index: 50;
  border: 1px solid #e5e7eb;
  min-width: 240px;
}
.dropdown-list {
//   padding: 0.5rem;
  max-height: 280px;
  overflow-y: auto;
  scrollbar-width: thin;
}
.dropdown-list:first-child {
  border-right: 1px solid #e5e7eb;
}
.dropdown-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #374151;
  font-size: 16px;
}
.dropdown-item:hover {
  background-color: #F4F4F5;
}
.dropdown-item.selected {
  background-color: #F4F4F5;
  font-weight: 500;
}
.rdp-nav-buttons {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 0.5rem;
}
.rdp-nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: white;
  cursor: pointer;
  color: #374151;
}
.rdp-nav-button:hover {
  background-color: #f3f4f6;
}
.rdp-nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.rdp-nav-button-prev {
  left: 0;
}
.rdp-nav-button-next {
  right: 0;
}

.rdp-button_reset.rdp-button.rdp-day.rdp-day_today.rdp-day_today {
  background-color: #346EC1 !important;
    font-weight:400 !important;
      font-size:14px !important;
  color: white !important;


}

.rdp-button_reset.rdp-button.rdp-day.rdp-day_today.rdp-day_today:hover {
  background-color: #5185D0 !important;
    font-weight:400 !important;
  font-size:14px !important;
  color: white !important;
}

.rdp-button_reset.rdp-button.rdp-day.rdp-day_today.rdp-day_today:active {
  background-color: #275391 !important;
  font-weight:400 !important;
  font-size:14px !important;
  color: white !important;
}

.rdp-button_reset.rdp-button.rdp-day.rdp-day_selected {
  background-color: #EBF1FA !important;
    font-weight:400 !important;
  font-size:14px !important;
    color: #275391 !important;

}

.rdp-button_reset.rdp-button.rdp-day.rdp-day_selected:hover {
  background-color: #CFDDF2 !important;
    font-weight:400 !important;
  font-size:14px !important;
    color: #275391 !important;

}

.rdp-button_reset.rdp-button.rdp-day.rdp-day_selected:active {
  background-color: #A6C1E7 !important;
    font-weight:400 !important;
  font-size:14px !important;
  color: #275391 !important;
}

.rdp-button_reset.rdp-button.rdp-day{
  font-weight:400 !important;
  font-size:14px !important;
}


.rdp-button_reset.rdp-button.rdp-day:hover{
  font-weight:400 !important;
  font-size:14px !important;
  background-color:#E4E4E7 !important;
}

.rdp-button_reset.rdp-button.rdp-day:active{
  font-weight:400 !important;
  font-size:14px !important;
  background-color:#D4D4D8 !important;
}
`

const CustomCaption = (props: CaptionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const selectedYearRef = useRef<HTMLDivElement>(null)
  const selectedMonthRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
        return
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Scroll both month and year into view when dropdown opens
      if (selectedMonthRef.current) {
        selectedMonthRef.current.scrollIntoView({
          block: 'center',
          behavior: 'auto'
        })
      }
      if (selectedYearRef.current) {
        selectedYearRef.current.scrollIntoView({
          block: 'center',
          behavior: 'auto'
        })
      }
    }
  }, [isOpen])

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const { goToMonth } = useNavigation()

  const years = Array.from({ length: 101 }, (_, i) => 1950 + i)
  const currentMonth = props.displayMonth.getMonth()
  const currentYear = props.displayMonth.getFullYear()

  const handleMonthSelect = (monthIndex: number) => {
    goToMonth(new Date(currentYear, monthIndex, 1))
    // setIsOpen(false);
  }

  const handleYearSelect = (year: number) => {
    goToMonth(new Date(year, currentMonth, 1))
    // setIsOpen(false);
  }

  const handlePreviousMonth = (e: React.MouseEvent) => {
    const prevMonth = new Date(props.displayMonth)
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    goToMonth(prevMonth)

    e.preventDefault()
    e.stopPropagation()
  }

  const handleNextMonth = (e: React.MouseEvent) => {
    const nextMonth = new Date(props.displayMonth)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    goToMonth(nextMonth)

    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className='rdp-caption flex items-center'>
      <button
        ref={buttonRef}
        className={classNames(
          'active:bg-[#00000033] hover:bg-[#F4F4F5] text-[0.875rem] text-[#3F3F46] relative py-[4px] pl-[8px] pr-[4px] rounded-[8px] cursor-pointer flex items-center z-[1000]',
          isOpen && 'bg-[#00000033]'
        )}
        onClick={(e) => {
          setIsOpen(!isOpen)

          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <span className='text-[16px] font-[600]'>{format(props.displayMonth, 'MMM yyyy')}</span>
        {isOpen ? <ChervonDown /> : <ChervonDown />}
      </button>

      <div className='flex gap-1'>
        <button
          onClick={handlePreviousMonth}
          className='cursor-pointer justify-center rounded-full active:bg-[#00000033] overflow-hidden hover:bg-[#0000001A] w-[32px] h-[32px] transition-all duration-30 flex items-center'
        >
          <ArrowLeftIcon width={18} height={18} className='text-gray-500' />
        </button>

        <button
          onClick={handleNextMonth}
          className='cursor-pointer justify-center rounded-full active:bg-[#00000033] overflow-hidden hover:bg-[#0000001A] w-[32px] h-[32px] transition-all duration-30 flex items-center'
        >
          <ArrowRightIcon width={18} height={18} className='text-gray-500' />
        </button>
      </div>

      {isOpen && (
        <div className='dropdown-container' ref={dropdownRef}>
          <div className='dropdown-list'>
            {months.map((month, index) => (
              <div
                key={month}
                ref={index === currentMonth ? selectedMonthRef : null}
                className={classNames('dropdown-item', {
                  selected: index === currentMonth
                })}
                onClick={() => handleMonthSelect(index)}
              >
                <span>{month}</span>
                {index === currentMonth && (
                  <div className='w-[24px] h-[24px] flex items-center justify-center'>
                    <svg width='16' height='12' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M5.54963 11.5749C5.4163 11.5749 5.2913 11.5539 5.17463 11.5119C5.05797 11.4706 4.94963 11.3999 4.84963 11.2999L0.549635 6.9999C0.366301 6.81657 0.278635 6.5789 0.286635 6.2869C0.295301 5.99557 0.391301 5.75824 0.574634 5.5749C0.757968 5.39157 0.991301 5.2999 1.27463 5.2999C1.55797 5.2999 1.7913 5.39157 1.97463 5.5749L5.54963 9.1499L14.0246 0.674902C14.208 0.491569 14.4456 0.399902 14.7376 0.399902C15.029 0.399902 15.2663 0.491569 15.4496 0.674902C15.633 0.858236 15.7246 1.09557 15.7246 1.3869C15.7246 1.6789 15.633 1.91657 15.4496 2.0999L6.24963 11.2999C6.14963 11.3999 6.0413 11.4706 5.92463 11.5119C5.80797 11.5539 5.68297 11.5749 5.54963 11.5749Z'
                        fill='#275391'
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className='dropdown-list'>
            {years.map((year) => (
              <div
                key={year}
                ref={year === currentYear ? selectedYearRef : null}
                className={classNames('dropdown-item', {
                  selected: year === currentYear
                })}
                onClick={() => handleYearSelect(year)}
              >
                <span>{year}</span>
                {year === currentYear && (
                  <div className='w-[24px] h-[24px] flex items-center justify-center'>
                    <svg width='16' height='12' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M5.54963 11.5749C5.4163 11.5749 5.2913 11.5539 5.17463 11.5119C5.05797 11.4706 4.94963 11.3999 4.84963 11.2999L0.549635 6.9999C0.366301 6.81657 0.278635 6.5789 0.286635 6.2869C0.295301 5.99557 0.391301 5.75824 0.574634 5.5749C0.757968 5.39157 0.991301 5.2999 1.27463 5.2999C1.55797 5.2999 1.7913 5.39157 1.97463 5.5749L5.54963 9.1499L14.0246 0.674902C14.208 0.491569 14.4456 0.399902 14.7376 0.399902C15.029 0.399902 15.2663 0.491569 15.4496 0.674902C15.633 0.858236 15.7246 1.09557 15.7246 1.3869C15.7246 1.6789 15.633 1.91657 15.4496 2.0999L6.24963 11.2999C6.14963 11.3999 6.0413 11.4706 5.92463 11.5119C5.80797 11.5539 5.68297 11.5749 5.54963 11.5749Z'
                        fill='#275391'
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface DatePickerProps {
  val?: Date
  onChange?: (value: any) => void
  zIndex?: string
  disabled: boolean
  disabledDays?: any
  error?: boolean
  helperText?: string
  defaultTimeMonth?: Date
  onBlur?: () => void
  onFocus?: () => void
  isCustomHeight?: boolean
  classNameForCalendar?: string
  classNameCalendarIcon?: string
}

const DatePickerV2: React.FC<DatePickerProps> = ({
  val,
  onChange,
  zIndex,
  disabled,
  disabledDays = null,
  error,
  helperText,
  defaultTimeMonth,
  onBlur,
  onFocus,
  isCustomHeight = false,
  classNameForCalendar = 'top-[45px]',
  classNameCalendarIcon
}) => {
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(null)
  const datePickerRef = useRef(null)

  useEffect(() => {
    if (val) {
      setMonth(new Date(val))
    } else {
      const defaultMonthValue = defaultTimeMonth ?? new Date()
      setMonth(defaultMonthValue)
    }

    return () => {}
  }, [val, defaultTimeMonth])

  const onChangeMonth = (value) => {
    setMonth(value)
  }

  const handleOutsideClick = (event) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
      setOpen(false)
      return
    }
  }

  useEffect(() => {
    return () => {
      setOpen(false)
      setMonth(null)
      datePickerRef.current = null
    }
  }, [])
  const handleSelect = (day: any) => {
    if (!day) return
    onChange(day)
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [open])

  return (
    <div
      className={classNames('relative max-h-[40px]', {
        '!cursor-not-allowed': disabled
      })}
    >
      <TextField
        // className={classNames(
        //   'font-normal text-[14px] leading-5 text-gray-800 rounded-md border-none px-2 py-1 outline-none max-w-[132px]',
        //   {
        //     // height: height
        //   }
        // )}
        error={error}
        helperText={helperText}
        isCustomHeight={isCustomHeight}
        disabled={disabled}
        onKeyDown={(e) => e.preventDefault()}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder='DD/MM/YYYY'
        value={val ? fDate(val) : null}
        onClick={() => !disabled && setOpen(true)}
        endIcon={
          <CalendarMonthIcon
            height={24}
            width={24}
            className={classNames('mr-3', {
              classNameCalendarIcon
            })}
          />
        }
      />
      <style>{css}</style>

      {open && (
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className={classNames(
            'border-none bg-white shadow-depth02 rounded-smallNudge absolute',
            classNameForCalendar,
            {
              [`${zIndex}`]: zIndex
            }
          )}
          ref={datePickerRef}
        >
          <DayPicker
            disabled={disabledDays ? [disabledDays] : []}
            mode='single'
            month={month}
            selected={val}
            components={{
              IconLeft: () => <ArrowLeftIcon className='h-4 w-4' />,
              IconRight: () => <ArrowRightIcon className='h-4 w-4' />,
              Caption: CustomCaption
            }}
            modifiersStyles={{
              selected: {
                backgroundColor: '#f12 !important',
                color: '#a12 !important'
              }
            }}
            onSelect={(e) => {
              handleSelect(e)
              setOpen(false)
            }}
            footer={
              <div className='w-full text-right'>
                <Button
                  style='outline'
                  onClick={() => {
                    handleSelect(new Date())
                    setOpen(false)
                  }}
                >
                  {t('today')}
                </Button>
              </div>
            }
            onMonthChange={onChangeMonth}
          />
        </div>
      )}
    </div>
  )
}

export default DatePickerV2
