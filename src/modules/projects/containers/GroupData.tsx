import { useEffect, useState } from 'react'
import ArrowExpandVertical from '~/shared/icons/ArrowExpandVertical'
import ArrowCollapseVertical from '~/shared/icons/ArrowCollapseVertical'
import classNames from 'classnames'
import RowDataSet from './RowDataSet'
import ModalViewChildDataset from '../components/ModalViewChildDataset'

type Props = {
  groupLabel?: string
  arrDataset?: any
  roleName?: string
  disabled?: boolean
  stateModal?: any
  updateStateModal?: (payload: any) => void
  resetControls?: () => void
  updateDataSetChild?: (payload: any) => void
}

const GroupData = ({ groupLabel, arrDataset, disabled, updateStateModal, updateDataSetChild }: Props) => {
  const [expand, setExpand] = useState(true)

  useEffect(() => {
    return () => {
      setExpand(true)
    }
  }, [])

  const renderExpandIcon = (expand) => {
    if (expand) {
      return <ArrowExpandVertical width={24} height={24} />
    } else {
      return <ArrowCollapseVertical width={24} height={24} />
    }
  }

  return (
    <>
      <div className={classNames('flex flex-col rounded-3xl border', {})}>
        <div
          className={classNames('header-group inline-flex px-6 py-4 justify-between bg-secondary-50 rounded-t-3xl', {
            ['rounded-b-3xl']: arrDataset?.length === 0
          })}
        >
          <div className='inline-flex gap-3 items-center justify-center'>
            <span className='typography-label-lg text-gray-900 font-semibold'>{`${groupLabel}.`}</span>
          </div>
          <div onClick={() => setExpand(!expand)}>{renderExpandIcon(expand)}</div>
        </div>
        {expand ? (
          <div className='body-group flex flex-col'>
            {arrDataset?.map((set, index) => {
              return (
                <RowDataSet
                  disabled={disabled || set.is_locked}
                  onRowClick={() => {}}
                  dataset={set}
                  index={index}
                  key={`data-set-${set?.id}`}
                  updateStatus={() => {}}
                  totalDatasets={arrDataset?.length}
                  updateStateModal={updateStateModal}
                  updateDataSetChild={updateDataSetChild}
                />
              )
            })}
          </div>
        ) : null}
      </div>
    </>
  )
}

export default GroupData
