import SelectV4 from 'components/SelectV4'
import { HtmlHTMLAttributes, useState } from 'react'

interface PaginationProps {
  options: { value: number; label?: string }[]
  onOptionChange?: (option: { value: number; label?: string }) => void
  width?: number | string
  value?: number
}

const PaginationDropdown = ({ options, onOptionChange, width, value }: PaginationProps) => {
  const [selectedOption, setSelectedOption] = useState<{ value: number; label?: string }>(
    options.filter((option) => option.value === value)[0] ?? options[0]
  )

  const handleOptionClick = (option: { value: number; label?: string }) => {
    setSelectedOption(option)
  }

  return (
    <SelectV4
      width={width || 160}
      options={options.map((opt) => ({ ...opt, label: `${opt.value} items/page` }))}
      value={selectedOption.value as unknown as string}
      selectContainerProps={{} as HtmlHTMLAttributes<HTMLDivElement>}
      onChange={(value) => {
        const option = options.filter((opt) => opt.value === value)[0]
        handleOptionClick(option)
        if (onOptionChange) {
          onOptionChange(option)
        }
      }}
    />
  )
}

export default PaginationDropdown
