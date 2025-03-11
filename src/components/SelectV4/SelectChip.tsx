import classNames from 'classnames'
import Icons from '../Icons'
import Typography from '../Typography'

const SelectChip = ({
  label,
  disabled,
  shouldDelete,
  onDelete
}: {
  label: string
  disabled?: boolean
  shouldDelete?: boolean
  onDelete?: () => void
}) => {
  return (
    <div
      className={classNames('flex h-[22px] items-center gap-2 truncate rounded-[6px] border px-2 py-[2px]', {
        'bg-foreground-white border-foreground-subtlest': disabled,
        'bg-background-accent-grayola border-background-brand-pressed': !disabled
      })}
    >
      <Typography variants='label' size='small' color={disabled ? 'disabled' : 'default'}>
        {label}
      </Typography>

      {shouldDelete && (
        <Icons
          color={disabled ? 'disabled' : 'default'}
          icon='close'
          size='small'
          className={`${!disabled ? 'cursor-pointer' : ''}`}
          onClick={() => {
            if (onDelete && !disabled) onDelete()
          }}
        />
      )}
    </div>
  )
}

export default SelectChip
