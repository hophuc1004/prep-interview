import classNames from 'classnames'
import CloseIcon from '~/shared/icons/CloseIcon'
interface InfoUserProps {
  email?: string
  role?: string
  disabled?: boolean
  updateStateModal?: (payload: any) => void
}

const InfoUser = ({ email, role, disabled, updateStateModal }: InfoUserProps) => {
  return (
    <div
      className={classNames('flex items-center justify-between flex-1 relative gap-3 p-2', {
        'hover:cursor-pointer hover:bg-gray-100 hover:rounded-lg': !disabled,
        'hover:cursor-not-allowed': disabled
      })}
    >
      <div className='flex gap-3 items-center'>
        <div className='flex items-center gap-1'>
          <span className='typography-body-md font-normal text-gray-800'>{email}</span>
          <span className='typography-body-md font-normal text-gray-800'>({role})</span>
        </div>
      </div>
      {disabled ? null : (
        <div className='cursor-pointer' onClick={() => updateStateModal({ remove_user: true })}>
          <CloseIcon className='text-gray-800' width={24} height={24} />
        </div>
      )}
    </div>
  )
}

export default InfoUser
