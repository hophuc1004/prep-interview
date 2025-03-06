import { Button } from 'components/Button'
import { Modal } from 'components/Modal'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface ModalWarningLockAndUnlockProps {
  visible: boolean
  onApply?: () => void
  onCancel?: () => void
  title?: string
  isLocked?: boolean
}

const ModalWarningLockAndUnlock: React.FC<React.PropsWithChildren<ModalWarningLockAndUnlockProps>> = ({
  visible,
  onApply,
  onCancel,
  title,
  isLocked
}) => {
  const { t } = useTranslation()

  const renderHeaderModal = () => {
    return (
      <div className='w-full'>
        <h2 className='typography-body-md text-gray-800'>{title}</h2>
      </div>
    )
  }

  const renderFooterModal = () => {
    return (
      <div className='flex justify-end space-x-2'>
        <Button style='outline' onClick={onCancel && onCancel}>
          {t('Cancel')}
        </Button>

        <Button style='filled' onClick={onApply && onApply}>
          {isLocked ? 'Unlocked' : 'Locked'}
        </Button>
      </div>
    )
  }

  return (
    <Modal
      visible={visible}
      header={renderHeaderModal()}
      footer={renderFooterModal()}
      modalWrapperClassName='w-[500px]'
      closeable={false}
    >
      <p className='typography-body-md text-gray-800'></p>
    </Modal>
  )
}

export default ModalWarningLockAndUnlock
