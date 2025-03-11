import TypographyV2 from 'components/TypographyV2'
import { useEffect, useState } from 'react'
import PaginationDropdown from './PaginationDropDown'
import Pagination from '.'
import InputNumber from 'components/InputNumber'
import ButtonV2 from 'components/ButtonV2'

interface ListPaginationProps {
  pageSize: number
  onChangePageSize: (pageSize: number) => void
  isEmpty?: boolean
  totalPages?: number
  currentPage?: number
  totalRecord?: number
  onPageChange?: (page: number) => void
  isFetching?: boolean
  recordName?: string
  totalItemPerPage: number
  pluralNouns?: string
}
const ListPagination = ({
  pageSize,
  isEmpty,
  totalPages = 1,
  currentPage = 1,
  totalRecord = 0,
  onPageChange,
  isFetching,
  recordName,
  totalItemPerPage
}: ListPaginationProps) => {
  const [pageData, setPageData] = useState<{ currentPage: number; totalPages: number; totalRecord: number }>({
    currentPage,
    totalPages,
    totalRecord
  })

  const [gotoPage, setGotoPage] = useState<number | ''>(currentPage)
  const firstIndex = (currentPage - 1) * pageSize + 1
  const lastIndex = firstIndex + totalItemPerPage - 1

  const renderRecordNumber = () => {
    if (isFetching && !totalItemPerPage) return null
    if (isFetching) return null
    const name = recordName || 'record'
    if (isEmpty) {
      return `0 ${recordName || 'record'}s`
    }
    // return `${pageData.currentPage}-${pageData.totalPages} of ${pageData.totalRecord} ${pageData.totalRecord > 1 ? `${name}s` : name}`;
    return `${firstIndex}-${lastIndex} of ${pageData.totalRecord} ${pageData.totalRecord > 1 ? `${name}s` : name}`
  }

  useEffect(() => {
    if (!isFetching) {
      setPageData({ currentPage, totalPages, totalRecord })
    }
  }, [isFetching, currentPage, totalPages, totalRecord])

  useEffect(() => {
    setGotoPage(currentPage)
  }, [currentPage])

  return (
    <div className='flex min-h-[48px] items-center justify-between py-100'>
      <TypographyV2 variants='label' size='small' color='default'>
        {renderRecordNumber()}
      </TypographyV2>

      {!isEmpty && (
        <div className='flex items-center gap-4'>
          {/* <PaginationDropdown
            width={176}
            onOptionChange={(option) => onChangePageSize(option.value)}
            value={pageSize || 10}
            options={[
              {
                value: 5
              },
              {
                value: 10
              },
              {
                value: 15
              }
            ]}
          /> */}
          <Pagination totalPages={pageData.totalPages} currentPage={currentPage} onPageChange={onPageChange} />
          <div className='flex gap-2'>
            <InputNumber
              // padding={0}
              width={62}
              value={gotoPage}
              onChange={(e) => {
                if (e.target.value === '') {
                  return setGotoPage('')
                }
                const value = parseInt(e.target.value)

                if (value < 1) {
                  return setGotoPage(1)
                }
                if (value > pageData.totalPages) {
                  setGotoPage(pageData.totalPages)
                } else {
                  setGotoPage(value)
                }
              }}
            />
            <ButtonV2
              variants='primary'
              size='medium'
              className='bg-orange-400 rounded-md'
              onClick={() => {
                if (gotoPage === '') {
                  return
                }
                if (onPageChange) {
                  onPageChange(gotoPage)
                }
              }}
            >
              Go
            </ButtonV2>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListPagination
