/* eslint-disable react-hooks/rules-of-hooks */
import TableVirtualizer from 'components/Table/TableVirtualizer'
import { ColumnDef } from 'components/Table/types'
import TextField from 'components/TextField'
import Typography from 'components/Typography'
import debounce from 'lodash/debounce'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CloseIcon from '~/shared/icons/CloseIcon'
import { getFullName } from '~/shared/utils/util'
import { DatePickerV2 } from '~/modules/share/components'
import { fDate } from '~/shared/utils/format-time'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import NoProject from '../components/NoProject'
import { ROLE_USER, TABLE_DATA_PROJECT } from '~/shared/constants/project'
import { Button } from 'components/Button'
import SearchIcon from '~/shared/icons/SearchIcon'
import ListPagination from 'components/Pagination/ListPagination'

const ProjectList = ({ userProjects }: { userRole?: string; userProjects?: any[] }) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  const [originalData, setOriginalData] = useState<any[]>([]) // Store the unfiltered data
  const [dataState, setDataState] = useState<any[]>([]) // Store the filtered data
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate()

  const [text, setText] = useState('')

  const [dates, setDates] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
  })

  const handleChangePageSize = useCallback((pageSize: number) => {
    setPageSize(pageSize)
    setCurrentPage(1)
  }, [])

  // Fetch initial data when userRole or userProjects change
  useEffect(() => {
    if (userProjects) {
      setOriginalData(userProjects) // Set the unfiltered data
    }
  }, [userProjects])

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize // 0-based index
    const endIndex = Math.min(startIndex + pageSize, userProjects?.length) // Don’t exceed array length
    const paginatedData = userProjects.slice(startIndex, endIndex) // Slice the array
    setDataState(paginatedData)
  }, [currentPage, pageSize, userProjects])

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.trim().length > 0) {
        const data = [...originalData]
        const filteredData = data?.filter((project) => {
          const nameLower = project?.name?.toLowerCase()
          return project?.id === searchTerm || nameLower.includes(searchTerm.toLowerCase())
        })
        setDataState(filteredData)
      } else {
        const startIndex = (currentPage - 1) * pageSize // 0-based index
        const endIndex = Math.min(startIndex + pageSize, userProjects?.length) // Don’t exceed array length
        const paginatedData = userProjects.slice(startIndex, endIndex) // Slice the array

        setDataState(paginatedData) // Reset to original data when search is empty
      }
    }, 1000),
    [originalData] // Dependency on originalData
  )
  useEffect(() => {
    debouncedSearch(text)

    // Clean-up function to cancel debounced function on component unmount
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch, text])

  const applyFilters = useCallback(
    (startDate: Date, endDate: Date) => {
      const data = [...originalData]

      // Apply date range filter (assuming projects have a 'date' property)
      const filteredData = data.filter((project) => {
        const projectDate = new Date(project.created_at) // Adjust this based on your data structure
        return projectDate >= startDate && projectDate <= endDate
      })

      setDataState(filteredData)
    },
    [originalData]
  )

  const handleReset = useCallback(() => {
    setDates({
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date()
    })
    setDataState(originalData)

    return
  }, [])

  const estimateSize = 58
  const viewportHeight = document.documentElement.clientHeight
  const isFetching = false
  const isLoading = false
  const isRefetching = false

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: t('Project ID'),
        // size: 240,
        flex: 1.2,
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <Typography variants='body' size='medium' className='text-gray-800'>
              {row?.original?.id}
            </Typography>
          )
        }
      },
      {
        accessorKey: 'name',
        header: t('Project Name'),
        // size: 180,
        cell: ({ row }) => {
          return (
            <div className='flex gap-1'>
              <Typography title={row?.original?.name} variants='body' size='medium' className='text-gray-800 truncate'>
                {row?.original?.name}
              </Typography>

              <ReactTooltip
                id={row?.original?.name}
                place='right'
                content={row?.original?.name}
                className='bg-gray-800 font-light'
              />
            </div>
          )
        },
        flex: 1.2,
        enableSorting: false
      },
      {
        accessorKey: 'created_at',
        header: t('Created Date'),
        // size: 200,
        flex: 0.6,
        cell: ({ row }) => {
          return (
            <Typography variants='body' size='medium' className='text-gray-800'>
              {fDate(row?.original?.created_at)}
            </Typography>
          )
        },
        enableSorting: false
      },
      {
        accessorKey: 'datasets',
        header: t('Total Datasets'),
        flex: 0.6,
        cell: ({ row }) => {
          return (
            <Typography variants='body' size='medium' className='text-gray-800'>
              {row?.original?.datasets?.length}
            </Typography>
          )
        },
        enableSorting: false
      },
      {
        accessorKey: 'rawData',
        header: t('Total Data Raws'),
        flex: 0.6,
        cell: ({ row }) => {
          return (
            <Typography variants='body' size='medium' className='text-gray-800'>
              {row?.original?.rawData?.length}
            </Typography>
          )
        },
        enableSorting: false
      },
      {
        accessorKey: 'model',
        header: t('Total Models'),
        flex: 0.6,
        cell: ({ row }) => {
          return (
            <Typography variants='body' size='medium' className='text-gray-800'>
              {row?.original?.model?.length}
            </Typography>
          )
        },
        enableSorting: false
      }
    ],
    [searchValue, t]
  )

  const flatData = dataState

  const renderContent = () => {
    if (!flatData?.length && searchValue) {
      return (
        <NoProject
          type='search'
          emptyText={t('No projects match your search.')}
          className='h-[300px] mt-[174px]'
          isLoading={isFetching || isLoading}
        />
      )
    }

    if (!flatData?.length && !searchValue && !isLoading && !isRefetching) {
      return (
        <NoProject
          type='noEmployee'
          emptyText={t('No projects have been added yet.')}
          className='h-[300px] mt-[174px]'
        />
      )
    }

    return (
      <div className='px-smallNudge py-[12px] w-full'>
        <TableVirtualizer
          columns={columns}
          data={flatData?.map((item) => ({
            ...item,
            fullName: getFullName(item.firstName, item.middleName, item.lastName)
          }))}
          height={viewportHeight - 316}
          estimateSize={estimateSize}
          onRowClick={(row) => {
            const projectId = row?.id
            if (!projectId) {
              return null
            }
            navigate(`/project-management/project-list/detail/${projectId}`)
            return
          }}
          isLoadMore={isFetching}
          isLoading={isRefetching}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        />
      </div>
    )
  }

  return (
    <div className='w-full flex justify-center flex-col items-center'>
      {
        <div ref={ref} className='h-[86px] w-[100%] flex justify-between items-center bg-white  px-4 space-x-4'>
          <div className='w-[320px] '>
            <TextField
              onChange={(e) => setText(e.target.value)}
              label={''}
              value={text}
              placeholder={t('Search by Project Name or ID')}
              endIcon={
                text && (
                  <div className='cursor-pointer' onClick={() => setText('')}>
                    <CloseIcon className='fill-gray-600 mr-2 font-bold' width={24} height={24} />
                  </div>
                )
              }
              startIcon={<SearchIcon className='fill-gray-600' width={24} height={24} />}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Typography variants='body' className='font-medium min-w-[100px]' size='small'>
              Created Date
            </Typography>
            <div className='flex relative gap-3 flex-col lg:flex-row w-full'>
              <div className={'!w-full min-w-[242px]'}>
                <DatePickerV2
                  error={new Date(dates.startDate) > new Date(dates.endDate)}
                  val={dates.startDate}
                  onChange={(value) => setDates((prev) => ({ ...prev, startDate: value }))}
                  zIndex='z-10'
                  disabled={false}
                  helperText={'Invalid Date'}
                  classNameForCalendar='w-full'
                />
              </div>
              <div className={'!w-full min-w-[242px]'}>
                <DatePickerV2
                  error={new Date(dates.startDate) > new Date(dates.endDate)}
                  val={dates.endDate}
                  onChange={(value) => setDates((prev) => ({ ...prev, endDate: value }))}
                  zIndex='z-10'
                  disabled={false}
                  helperText={'Invalid Date'}
                  classNameForCalendar='w-full'
                />
              </div>
            </div>
            <Button onClick={() => applyFilters(dates.startDate, dates.endDate)}>Apply</Button>
            <Button style='outline' onClick={() => handleReset()}>
              {t('Reset')}
            </Button>
          </div>
        </div>
      }
      {dataState?.length > 0 ? (
        <div className='flex justify-end w-full px-6'>
          <ListPagination
            onChangePageSize={handleChangePageSize}
            recordName='project'
            totalItemPerPage={dataState?.length}
            pageSize={pageSize}
            isEmpty={dataState?.length === 0}
            currentPage={currentPage}
            totalPages={Math.ceil(originalData?.length / 10)}
            totalRecord={originalData?.length || 0}
            onPageChange={(page) => {
              setCurrentPage(page)
            }}
            isFetching={isFetching}
          />
        </div>
      ) : null}
      {renderContent()}
    </div>
  )
}

export default ProjectList
