import { Button } from 'components/Button'
import { Modal } from 'components/Modal'
import TextField from 'components/TextField/CustomTextField'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface ModalEditTagProps {
  visible?: boolean
  onCancel?: () => void
  headerTitle?: string
  btnName?: string
  description?: string
  isLoading?: boolean
  onConfirm?: ({ tag }) => void
  data: {
    tag: string
  }
}

const ModalEditTag: React.FC<React.PropsWithChildren<ModalEditTagProps>> = ({
  visible,
  onCancel,
  headerTitle,
  onConfirm,
  data,
  isLoading
}) => {
  const { t } = useTranslation()

  const [tagState, setTagState] = React.useState<string>('')
  const [isTagFocused, setIsTagFocused] = React.useState(false)

  useEffect(() => {
    if (visible) {
      if (data.tag) {
        setTagState(data.tag)
      }
    } else {
      setTagState('')
    }
  }, [data.tag])

  const renderHeaderModal = () => {
    return (
      <div className='w-full'>
        <h2 className='typography-title-md font-bold text-gray-800'>{headerTitle}</h2>
      </div>
    )
  }

  const renderFooterModal = () => {
    return (
      <div className='flex justify-end space-x-2'>
        <Button style='outline' onClick={onCancel && onCancel} disabled={isLoading}>
          {t('common.cancel')}
        </Button>
        <Button
          style='filled'
          disabled={isLoading}
          onClick={() =>
            onConfirm({
              tag: tagState || null
            })
          }
        >
          {t('common.save')}
        </Button>
      </div>
    )
  }

  return (
    <Modal
      visible={visible}
      header={renderHeaderModal()}
      footer={renderFooterModal()}
      modalWrapperClassName='w-[600px]'
      closeable={false}
    >
      <div className='pb-2'>
        <div className='flex flex-col gap-[24px] pb-2'>
          <div className='group-input flex flex-col items-start relative'>
            <p className='font-[600] text-gray-800 text-[14px] leading-[20px]'>{t('Tag')}</p>
            <TextField
              onChange={(e) => setTagState(e.target.value)}
              value={tagState}
              placeholder={t('Enter tag')}
              disabled={isLoading}
              maxLength={500}
              onFocus={() => setIsTagFocused(true)}
              onBlur={() => setIsTagFocused(false)}
            />
            {isTagFocused && (
              <p className='absolute -bottom-5 right-0 text-[11px] text-gray-500'>{`${tagState?.length || 0}/500`}</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalEditTag
