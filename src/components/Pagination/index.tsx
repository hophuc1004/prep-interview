import classNames from 'classnames'
import Icons from '../Icons'
import React, { ReactNode } from 'react'
import TypographyV2 from '../TypographyV2'

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange?: (page: number) => void
  siblingCount?: number
  boundaryCount?: number
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1
}) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1
    return Array.from({ length }, (_, i) => start + i)
  }

  const startPages = range(1, Math.min(boundaryCount, totalPages))
  const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages)

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      currentPage - siblingCount,
      // Lower boundary when page is high
      totalPages - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  )

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      currentPage + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    totalPages - boundaryCount - 1
  )

  // Basic list of items to render
  // for example itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [
    ...startPages,

    ...(siblingsStart > boundaryCount + 2
      ? ['start-ellipsis']
      : boundaryCount + 1 < totalPages - boundaryCount
        ? [boundaryCount + 1]
        : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < totalPages - boundaryCount - 1
      ? ['end-ellipsis']
      : totalPages - boundaryCount > boundaryCount
        ? [totalPages - boundaryCount]
        : []),
    ...endPages
  ]

  return (
    <div className='flex gap-1'>
      <PaginationItem
        disable={currentPage === 1}
        onClick={() => {
          if (currentPage !== 1 && onPageChange) {
            onPageChange(currentPage - 1)
          }
        }}
      >
        <Icons icon='chevron-left' color='inherit' className='text-[12px]' />
      </PaginationItem>

      {itemList.map((page, index) => {
        if (typeof page === 'number') {
          return (
            <PaginationItem
              key={index}
              onClick={() => {
                if (currentPage !== page && onPageChange) {
                  onPageChange(page)
                }
              }}
              active={currentPage === page}
              disable={false}
            >
              <TypographyV2 variants='paragraph' size='small' color={currentPage === page ? 'brand' : 'default'}>
                {page}
              </TypographyV2>
            </PaginationItem>
          )
        }

        if (page === 'start-ellipsis' || page === 'end-ellipsis') {
          return (
            <div className={classNames('flex size-6 items-center justify-center')} key={index}>
              <Icons icon='ellipsis' color='inherit' className='text-[12px]' />
            </div>
          )
        }
        return (
          <div className={classNames('flex size-6 items-center justify-center')} key={index}>
            {page}
          </div>
        )
      })}

      <PaginationItem
        disable={currentPage === totalPages}
        onClick={() => {
          if (onPageChange) {
            onPageChange(currentPage + 1)
          }
        }}
      >
        <Icons icon='chevron-right' color='inherit' className='text-[12px]' />
      </PaginationItem>
    </div>
  )
}

const PaginationItem = ({
  disable,
  onClick,
  children,
  active
}: {
  disable: boolean
  onClick: () => void
  children: ReactNode
  active?: boolean
}) => {
  return (
    <button
      className={classNames(
        'flex size-6 items-center justify-center overflow-hidden rounded-[2px] color-icon-default',
        {
          'bg-background-brand color-text-brand': active
          // 'color-icon-disabled': disable,
        }
      )}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  )
}

export default Pagination
