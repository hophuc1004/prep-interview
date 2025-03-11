import classNames from 'classnames'
import { IconButton } from 'components/IconButton'
import { Tooltip as ReactTooltip, TooltipRefProps } from 'react-tooltip'
import { ThreeDotsIcon } from '~/shared/icons/ThreeDotsIcon'
import ReactDOM from 'react-dom'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'

type Props = {
  index?: number
  dataset?: any
  disabled?: boolean
  updateStatus?: (dataset: any) => void
  onRowClick?: (taskId: number) => void
  taskIdSelected?: number
  totalDatasets?: number
  updateStateModal?: (payload: any) => void
  updateData?: (payload: any) => void
}

const RowDataSet = ({ index, dataset, disabled, onRowClick, totalDatasets, updateStateModal, updateData }: Props) => {
  const getTaskStatusLabel = () => {
    if (!dataset.is_locked) {
      return {
        text: 'Active',
        className: 'text-[#389e0d]'
      }
    } else {
      return {
        text: 'Locked',
        className: 'text-red-600'
      }
    }
  }

  const getTag = (text: string) => {
    return {
      text,
      className: 'text-gray-400'
    }
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        if (disabled) return
        document.body.click()

        onRowClick(dataset?.id)
      }}
      className={classNames('inline-flex px-6 py-4 max-h-[56px] w-full justify-between items-center hover:bg-gray-50', {
        ['border-b']: index !== totalDatasets - 1,
        ['rounded-b-3xl']: index === totalDatasets - 1,
        'cursor-not-allowed': disabled,
        'cursor-pointer': !disabled,
        'bg-white': true
      })}
    >
      <div className='w-[35%]'>
        <p className='typography-body-md font-medium'>{`${index + 1}. ${dataset.name}`}</p>
      </div>
      <div
        className='truncate w-[24%]'
        onClick={() => {
          if (disabled) return
          document.body.click()

          onRowClick(dataset?.id)
        }}
      >
        <p className='typography-body-md font-normal'>{`${dataset?.data?.length || 0} child data`}</p>
      </div>

      <div
        className='truncate w-[10%]'
        onClick={() => {
          if (disabled) return
          document.body.click()
        }}
      >
        <div
          className={`px-2 py-0.5 rounded border justify-center items-center flex ${
            dataset.is_locked ? 'border-red-300 bg-red-50' : 'border-[#b7eb8f] bg-[#f6ffed]'
          }`}
        >
          <div className={`text-sm font-semibold leading-tight tracking-tight ${getTaskStatusLabel().className}`}>
            {t(getTaskStatusLabel().text)}
          </div>
        </div>
      </div>
      <div
        className='truncate w-[6%]'
        onClick={() => {
          if (disabled) return
          document.body.click()
        }}
      >
        {dataset?.tag ? (
          <div className={`px-2 py-0.5 rounded border bg-gray-50 border-gray-300 justify-center items-center flex`}>
            <div className={`text-sm font-normal leading-tight tracking-tight ${getTag(dataset?.tag).className}`}>
              {t(getTag(dataset?.tag).text)}
            </div>
          </div>
        ) : null}
      </div>
      <div
        className={classNames({
          'cursor-not-allowed': disabled
        })}
        style={{ opacity: !disabled ? 1 : 0, zIndex: 9999 }}
      >
        {disabled ? (
          <div className='h-[24px] w-[24px]' />
        ) : (
          <ActionButtonTaskOnboarding
            onEdit={() => {
              if (disabled) return

              document.body.click()
            }}
            // onDelete={() => handleSetEmLifeCycleState({ taskIdDelete: dataset?.id })}
            updateStateModal={updateStateModal}
            taskId={dataset?.id}
            isLocked={dataset?.is_locked}
            dataset={dataset}
            updateData={updateData}
          />
        )}
      </div>
    </div>
  )
}

export const ActionButtonTaskOnboarding = ({
  updateStateModal,
  taskId,
  isLocked,
  updateData,
  dataset
}: {
  onEdit?: () => void
  updateStateModal?: (payload: any) => void
  updateData?: (payload: any) => void
  taskId?: number
  isLocked?: boolean
  dataset?: any
}) => {
  const ref = useRef()
  const [statePortal, setStatePortal] = useState(null)

  const key = `actionTooltipDataset` + taskId

  const hideAllTooltips = async () => {
    document.getElementById('root').click()
  }

  useEffect(() => {
    const portalTarget = document.getElementById('project-detail')
    setStatePortal(portalTarget)
    return () => {}
  }, [])

  // const portalTarget = document.getElementById('project-detail')

  return (
    <div className='h-[24px] flex items-center' id={key}>
      <IconButton
        className='h-[24px] w-[24px]'
        onClick={(e) => {
          e.stopPropagation()
          if (ref?.current) {
            const tooltip = ref.current as TooltipRefProps
            if (tooltip?.isOpen) {
              tooltip.close()
            } else {
              hideAllTooltips()
              tooltip.open()
            }
          }
        }}
      >
        <div data-tooltip-id={key} className='h-[24px]'>
          <ThreeDotsIcon width={24} height={24} />
        </div>
      </IconButton>
      {statePortal &&
        ReactDOM.createPortal(
          <ReactTooltip
            clickable
            openOnClick
            //   role='dialog'
            ref={ref}
            id={key}
            place='bottom-end'
            arrowColor='transparent'
            // data-tooltip-key={key}
            opacity={1}
            className='
        !bg-white font-light !text-gray-800  !p-0 !rounded-lg !overflow-hidden'
            style={{
              boxShadow: '1px 2px 1px 0px #dbdada85',
              zIndex: 99999999
            }}
          >
            <div
              className='flex items-center hover:bg-gray-100 w-full p-2 gap-2 h-[40px] min-w-[100px] overflow-hidden cursor-pointer'
              onClick={(e) => {
                e.stopPropagation()
                updateStateModal({ edit_tag: true })
              }}
            >
              {/* <EditIcon width={24} height={24} /> */}
              <span className='text-[16px] leading-[24px]'>{t('Edit Tag')}</span>
            </div>
            <div
              className='flex items-center hover:bg-gray-100 w-full p-2 gap-2 h-[40px] min-w-[100px] overflow-hidden cursor-pointer'
              onClick={(e) => {
                e.stopPropagation()
                updateStateModal({ view: true })
                updateData(dataset?.data)
              }}
            >
              {/* <EditIcon width={24} height={24} /> */}
              <span className='text-[16px] leading-[24px]'>{t('View')}</span>
            </div>
            <div
              className='flex items-center hover:bg-gray-100 w-full p-2 gap-2 h-[40px] min-w-[100px] overflow-hidden cursor-pointer'
              onClick={(e) => {
                e.stopPropagation()
                updateStateModal({ unlock: true })
              }}
            >
              {/* <TrashIcon className='text-red-600' width={24} height={24} /> */}
              <span className='text-[16px] leading-[24px] text-red-600'>{isLocked ? t('Unlocked') : t('Locked')}</span>
            </div>
          </ReactTooltip>,
          document.getElementById('project-detail')
        )}
    </div>
  )
}

export default RowDataSet
