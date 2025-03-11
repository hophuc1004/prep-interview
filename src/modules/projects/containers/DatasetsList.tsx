/* eslint-disable react-hooks/rules-of-hooks */
import TableVirtualizer from 'components/Table/TableVirtualizer'
import { ColumnDef } from 'components/Table/types'
import Typography from 'components/Typography'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import NoProject from '../components/NoProject'
import MenuActionBtn from './MenuActionBtn'

interface Props {
  arrData?: any[]
  updateStateModal?: (payload: any) => void
  disabled?: boolean
  updateData?: (payload: any) => void
}

const DatasetsList = ({ arrData, updateStateModal, disabled, updateData }: Props) => {
  const { t } = useTranslation()
  const [dataState, setDataState] = useState<any[]>([]) // Store the filtered data

  useEffect(() => {
    if (arrData) {
      setDataState(arrData) // Set the unfiltered data
    }
  }, [arrData])

  const estimateSize = 58
  const viewportHeight = document.documentElement.clientHeight
  const isFetching = false
  const isLoading = false
  const isRefetching = false

  const getTaskStatusLabel = (is_locked) => {
    if (!is_locked) {
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

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        header: t('Dataset Name'),
        // size: 240,
        flex: 0.7,
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <Typography variants='body' size='medium' className='text-gray-800'>
              {row?.original?.name}
            </Typography>
          )
        }
      },
      {
        accessorKey: 'description',
        header: t('Dataset Description'),
        // size: 180,
        cell: ({ row }) => {
          return (
            <div className='flex gap-1'>
              <Typography
                title={row?.original?.description}
                variants='body'
                size='medium'
                className='text-gray-800 truncate'
              >
                {row?.original?.description}
              </Typography>

              <ReactTooltip
                id={row?.original?.description}
                place='right'
                content={row?.original?.description}
                className='bg-gray-800 font-light'
              />
            </div>
          )
        },
        flex: 1.2,
        enableSorting: false
      },
      {
        accessorKey: 'is_locked',
        header: t('Status'),
        // size: 200,
        flex: 0.3,
        cell: ({ row }) => {
          return (
            <div
              className={`px-2 py-0.5 rounded border justify-center items-center flex ${
                row?.original?.is_locked ? 'border-red-300 bg-red-50' : 'border-[#b7eb8f] bg-[#f6ffed]'
              }`}
            >
              <div
                className={`text-sm font-semibold leading-tight tracking-tight ${getTaskStatusLabel(row?.original?.is_locked).className}`}
              >
                {t(getTaskStatusLabel(row?.original?.is_locked).text)}
              </div>
            </div>
          )
        },
        enableSorting: false
      },
      {
        accessorKey: 'tags',
        header: t('Tags'),
        flex: 0.3,
        cell: ({ row }) => {
          if (row?.original?.tags) {
            return (
              <div
                className={`max-w-12 px-2 py-0.5 rounded border bg-gray-50 border-gray-300 justify-center items-center flex`}
              >
                <div
                  className={`text-sm font-normal leading-tight tracking-tight ${getTag(row?.original?.tags).className}`}
                >
                  {t(getTag(row?.original?.tags).text)}
                </div>
              </div>
            )
          }

          return null
        },
        enableSorting: false
      },
      {
        accessorKey: disabled ? null : 'action',
        header: t('Action'),
        // size: 180,
        flex: 0.2,
        cell: ({ row }) => {
          return (
            <MenuActionBtn
              id={row.original?.id}
              isDisabled={disabled}
              title={row.original?.is_locked ? 'Unlock' : 'Lock'}
              keyAction={`dataset`}
              onAction={(e) => {
                e.stopPropagation()
                updateData({ dataSetId: row?.original?.id })
                if (row?.original?.is_locked) {
                  updateStateModal({ unlock: true })
                  return
                } else {
                  updateStateModal({ lock: true })
                }
              }}
            />
          )
        },
        enableSorting: false
      }
    ],
    [t]
  )

  const flatData = dataState

  const renderContent = () => {
    if (!flatData?.length) {
      return (
        <NoProject
          type='search'
          emptyText={t('No projects match your search.')}
          className='h-[300px] mt-[174px]'
          isLoading={isFetching || isLoading}
        />
      )
    }

    if (!flatData?.length && !isLoading && !isRefetching) {
      return (
        <NoProject
          type='noEmployee'
          emptyText={t('No datasets have been added yet.')}
          className='h-[300px] mt-[174px]'
        />
      )
    }

    return (
      <div className='px-smallNudge py-[12px] w-full'>
        <TableVirtualizer
          columns={columns}
          data={flatData}
          height={viewportHeight - 316}
          estimateSize={estimateSize}
          isNotScroll={true}
          // onRowClick={(row) => {
          //   const projectId = row?.id
          //   if (!projectId) {
          //     return null
          //   }
          //   navigate(`/project-management/project-list/detail/${projectId}`)
          //   return
          // }}
          isLoadMore={isFetching}
          isLoading={isRefetching}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        />
      </div>
    )
  }

  return <div className='w-full flex justify-center flex-col items-center'>{renderContent()}</div>
}

export default DatasetsList
