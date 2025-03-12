import { CheckboxState, CheckboxV2 } from 'components/CheckboxV2'

interface SingleCheckboxProps {
  title?: string
  value?: string | boolean
  onChangeOption?: (v: string, s: number) => void
  showOrdinal?: boolean
  ordinal?: number
  disabled?: boolean
  isOnchangeFromLabel?: boolean
  keyCheckbox?: string
}

const SingleCheckbox: React.FC<SingleCheckboxProps> = ({
  title,
  value,
  onChangeOption,
  showOrdinal,
  ordinal,
  disabled,
  keyCheckbox
}) => {
  return (
    <div className='flex items-center'>
      {showOrdinal ? (
        <CheckboxV2
          // isOnchangeFromLabel={isOnchangeFromLabel}
          disabled={disabled}
          id={`option-${keyCheckbox}`}
          value={value}
          key={`option-${keyCheckbox}`}
          initState={value ? CheckboxState.CHECKED : CheckboxState.UNCHECK}
          showOrdinal={showOrdinal}
          onChange={onChangeOption}
        >
          {`${ordinal}. ${title}`}
        </CheckboxV2>
      ) : (
        <CheckboxV2
          // isOnchangeFromLabel={isOnchangeFromLabel}
          disabled={disabled}
          id={`option-${keyCheckbox}`}
          value={value}
          key={`option-${keyCheckbox}`}
          initState={value ? CheckboxState.CHECKED : CheckboxState.UNCHECK}
          onChange={onChangeOption}
        >
          {title}
        </CheckboxV2>
      )}
    </div>
  )
}

export default SingleCheckbox
