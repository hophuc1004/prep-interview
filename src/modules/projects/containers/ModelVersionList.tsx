/* eslint-disable react-hooks/rules-of-hooks */
import TableVirtualizer from 'components/Table/TableVirtualizer'
import { ColumnDef } from 'components/Table/types'
import Typography from 'components/Typography'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import NoProject from '../components/NoProject'

const ModelVersionList = ({ arrData }: { arrData?: any[] }) => {
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
        header: t('Model Name'),
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
        accessorKey: 'version',
        header: t('Model Version'),
        // size: 180,
        cell: ({ row }) => {
          return (
            <div
              className={`max-w-[90px] px-2 py-0.5 rounded border bg-gray-50 border-gray-300 justify-center items-center flex`}
            >
              <div
                className={`text-sm font-normal leading-tight tracking-tight ${getTag(row?.original?.version).className}`}
              >
                {t(getTag(row?.original?.version).text)}
              </div>
            </div>
          )
        },
        flex: 0.6,
        enableSorting: false
      },
      {
        accessorKey: 'datasetIds',
        header: t('List DatasetIds'),
        // size: 240,
        flex: 0.7,
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <Typography variants='body' size='medium' className='text-gray-800'>
              {row?.original?.datasetIds?.join(',')}
            </Typography>
          )
        }
      }
    ],
    [t]
  )

  const flatData = dataState

  const renderContent = () => {
    if (!flatData?.length && !isLoading && !isRefetching) {
      return (
        <NoProject
          type='noEmployee'
          emptyText={t('No model version have been added yet.')}
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

export default ModelVersionList
