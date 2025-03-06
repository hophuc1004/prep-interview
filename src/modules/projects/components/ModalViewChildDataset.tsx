import classNames from 'classnames'
import { Button } from 'components/Button'
import { Chip } from 'components/Chip'
import { Modal } from 'components/Modal'

import React from 'react'
import { useTranslation } from 'react-i18next'

interface ModalViewChildDatasetProps {
  visible: boolean
  onApply?: () => void
  onCancel?: () => void
  title?: string
  data?: any[]
}

const ModalViewChildDataset: React.FC<React.PropsWithChildren<ModalViewChildDatasetProps>> = ({
  visible,
  onCancel,
  data
}) => {
  const { t } = useTranslation()

  const renderHeaderModal = () => {
    return (
      <div className='w-full'>
        <h2 className='typography-title-md font-bold text-gray-800'>{`List data of Dataset`}</h2>
      </div>
    )
  }

  const renderFooterModal = () => {
    return (
      <div className='flex justify-end space-x-2'>
        <Button style='outline' onClick={onCancel && onCancel}>
          {t('Cancel')}
        </Button>
      </div>
    )
  }

  const getTag = (text: string) => {
    return {
      text,
      className: 'text-gray-400'
    }
  }

  const renderSingleData = (data: any) => {
    return data?.map((item) => {
      return (
        <div
          key={item?.id}
          className={classNames('flex w-full items-center justify-between flex-1 relative gap-3 p-2 rounded-3xl', {
            'bg-gray-100': true
          })}
        >
          <div className='flex gap-5 items-center justify-between w-full'>
            <span className='typography-body-md font-normal text-gray-800'>{item?.value?.text}</span>
            <div className={`px-2 py-0.5 rounded border bg-gray-50 border-gray-300 justify-center items-center flex`}>
              <div className={`text-sm font-normal leading-tight tracking-tight ${getTag(item?.tag).className}`}>
                {t(getTag(item?.value?.label).text)}
              </div>
            </div>
            <Chip type={item?.status}>{item?.status}</Chip>
          </div>
        </div>
      )
    })
  }

  return (
    <Modal
      visible={visible}
      header={renderHeaderModal()}
      footer={renderFooterModal()}
      modalWrapperClassName='w-[600px]'
      closeable={false}
    >
      <div className='flex flex-col gap-3'>{renderSingleData(data)}</div>
    </Modal>
  )
}

export default ModalViewChildDataset
