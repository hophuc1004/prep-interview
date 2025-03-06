/* eslint-disable react-hooks/rules-of-hooks */
import TableVirtualizer from 'components/Table/TableVirtualizer'
import { ColumnDef } from 'components/Table/types'
import TextField from 'components/TextField'
import Typography from 'components/Typography'
import debounce from 'lodash/debounce'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CloseIcon, SearchIcon } from '~/shared/icons'
import { getFullName } from '~/shared/utils/util'
import { DatePickerV2 } from '~/modules/share/components'
import { fDate } from '~/shared/utils/format-time'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import NoProject from '../components/NoProject'
import { ROLE_USER, TABLE_DATA_PROJECT } from '~/shared/constants/project'
import { Button } from 'components/Button'

const ProjectList = ({ userRole, userProjects }: { userRole?: string; userProjects?: any[] }) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  const [originalData, setOriginalData] = useState<any[]>([]) // Store the unfiltered data
  const [dataState, setDataState] = useState<any[]>([]) // Store the filtered data

  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate()

  const [text, setText] = useState('')

  const [dates, setDates] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date()
  })

  const handleGetDataWithRole = (userRole, userProjects) => {
    switch (userRole) {
      case ROLE_USER['ADMIN']:
        return TABLE_DATA_PROJECT

      case ROLE_USER['USER']:
        const matchingProjects = TABLE_DATA_PROJECT.map((project) => {
          const userProject = userProjects.find((up) => up.projectId === project.id)
          return {
            ...project,
            userRole: userProject ? userProject.role : null
          }
        }).filter((project) => project.userRole !== null)

        return matchingProjects

      default:
        return []
    }
  }

  // Fetch initial data when userRole or userProjects change
  useEffect(() => {
    const data = handleGetDataWithRole(userRole, userProjects)
    setOriginalData(data) // Set the unfiltered data
    setDataState(data) // Initially, filtered data is the same as original
  }, [userRole, userProjects])

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.trim().length > 0) {
        const filteredData = originalData.filter((project) => {
          const idLower = project.id.toLowerCase()
          const nameLower = project.name.toLowerCase()
          return idLower.includes(searchTerm.toLowerCase()) || nameLower.includes(searchTerm.toLowerCase())
        })
        setDataState(filteredData)
      } else {
        setDataState(originalData) // Reset to original data when search is empty
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

  const applyFilters = useCallback((startDate: Date, endDate: Date) => {
    const data = handleGetDataWithRole(userRole, userProjects)
    let filteredData = [...data]

    // Apply date range filter (assuming projects have a 'date' property)
    filteredData = filteredData.filter((project) => {
      const projectDate = new Date(project.created_at) // Adjust this based on your data structure
      return projectDate >= startDate && projectDate <= endDate
    })

    setDataState(filteredData)
  }, [])

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
  //  66 + 56 + 56 + 16 + 16 + 64
  const limit = 10000 //|| Math.ceil((viewportHeight - (66 + 56 + 48 + 16 + 16 + 64)) / estimateSize) + 1

  const data = null
  const isFetching = false
  const isLoading = false
  const isRefetching = false

  // const { data, isFetching, fetchNextPage, isLoading, isRefetching, refetch } = useEmployeeList({
  //   limit: limit,
  //   search: searchValue.trim(),
  //   // sortBy: sortBy.find((item) => item.isActive)?.field,
  //   // orderBy: !sortBy.find((item) => item.isActive)?.desc ? 'asc' : 'desc',
  //   disabled: !isCanSeeOnboarding
  // })

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
        // size: 180,
        flex: 0.8,
        // cell: ({}) => (
        //   <div className='flex items-center justify-center h-full gap-2'>
        //     <span className='text-[11px] text-gray-600 leading-[16px] font-normal mt-1'>
        //       {0}/{12}
        //     </span>
        //     <ProcessComplete />
        //   </div>
        // ),
        cell: ({ row }) => {
          return (
            <Typography variants='body' size='medium' className='text-gray-800'>
              {row?.original?.datasets?.length}
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
            navigate(`/project-management/project-list/detail/${projectId}`) // need to pass employeeId to view checklist of one employee
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
      {Number(dataState?.length) > 0 ? (
        <div className='flex justify-start w-full p-4 pb-0 typography-body-md text-gray-800'>
          {t('Projects', { count: 2 })} <span className='ml-1'>({dataState?.length})</span>
        </div>
      ) : null}
      {renderContent()}

      <ReactTooltip
        // clickable
        // openOnClick
        role='dialog'
        id='showPending'
        place='bottom'
        opacity={1}
        className='
          !bg-black-800 font-light !text-white shadow-2xl !rounded-lg max-w-[400px]'
      />
    </div>
  )
}

export default ProjectList
