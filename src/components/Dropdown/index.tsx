import classNames from 'classnames'
import React, { useCallback, useEffect } from 'react'

export interface DropdownProps {
  children: React.ReactNode
  anchor: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  arrow?: boolean
  center?: boolean
  width?: number | string
  threshold?: number
  className?: string
  arrowClassName?: string
  isOpen?: boolean
  onClose?: () => void
  onOpen?: () => void
  shouldControl?: boolean
  anchorHorizontal?: 'left' | 'right' | 'center'
}

const Dropdown = ({
  children,
  anchor,
  placement = 'top',
  arrow = false,
  center = true,
  width,
  threshold = 8,
  className,
  arrowClassName,
  isOpen,
  onClose,
  onOpen,
  shouldControl,
  anchorHorizontal = 'center'
}: DropdownProps) => {
  const [open, setOpen] = React.useState(false)
  const toggleOpen = () => {
    if (!shouldControl) {
      setOpen(!open)
    }
    if (open && onClose) {
      onClose()
    }
    if (!open && onOpen) {
      onOpen()
    }
  }
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const arrowRef = React.useRef<HTMLDivElement>(null)

  const adjustPosition = React.useCallback(() => {
    if (anchorRef.current && dropdownRef.current) {
      const anchorRect = anchorRef.current.getBoundingClientRect()
      const dropdownRect = dropdownRef.current.getBoundingClientRect()
      const top = anchorRect.top + window.scrollY
      const left = anchorRect.left + window.scrollX

      const isOutOfViewport = (rect: DOMRect, placement: DropdownProps['placement']) => {
        if (placement === 'top' || placement === 'bottom') {
          return rect.top < 0 || rect.bottom > (window.innerHeight || document.documentElement.clientHeight)
        }

        if (placement === 'left' || placement === 'right') {
          return rect.left < 0 || rect.right > (window.innerWidth || document.documentElement.clientWidth)
        }
      }

      const setPosition = (placement: 'top' | 'bottom' | 'left' | 'right') => {
        if (!dropdownRef.current) return
        switch (placement) {
          case 'top':
            dropdownRef.current.style.top = `${-(dropdownRect.height + threshold)}px`

            if (anchorHorizontal === 'left') {
              dropdownRef.current.style.left = '0'
            } else if (anchorHorizontal === 'right') {
              dropdownRef.current.style.left = `${anchorRect.width - dropdownRect.width}px`
            } else if (anchorHorizontal === 'center') {
              dropdownRef.current.style.left = `${anchorRect.width / 2 - dropdownRect.width / 2}px`
            }

            if (arrowRef.current) {
              arrowRef.current.style.top = 'calc(100% - 5px)'
              arrowRef.current.style.left = '50%'
              arrowRef.current.style.transform = 'translateX(-50%) rotate(45deg)'
            }
            break
          case 'bottom':
            dropdownRef.current.style.top = `${anchorRect.height + threshold}px`
            dropdownRef.current.style.left = `${center ? anchorRect.width / 2 - dropdownRect.width / 2 : 0}px`

            if (anchorHorizontal === 'left') {
              dropdownRef.current.style.left = '0'
            } else if (anchorHorizontal === 'right') {
              dropdownRef.current.style.left = `${anchorRect.width - dropdownRect.width}px`
            } else if (anchorHorizontal === 'center') {
              dropdownRef.current.style.left = `${anchorRect.width / 2 - dropdownRect.width / 2}px`
            }
            if (arrowRef.current) {
              arrowRef.current.style.top = '-5px'
              arrowRef.current.style.left = '50%'
              arrowRef.current.style.transform = 'translateX(-50%) rotate(45deg)'
            }
            break
          case 'left':
            dropdownRef.current.style.top = `${anchorRect.height / 2 - dropdownRect.height / 2}px`

            dropdownRef.current.style.left = `${-threshold}px`
            dropdownRef.current.style.transform = 'translateX(-100%)'
            if (arrowRef.current) {
              arrowRef.current.style.top = '50%'
              arrowRef.current.style.left = 'calc(100% - 5px)'
              arrowRef.current.style.transform = 'translateY(-50%) rotate(45deg)'
            }
            break
          case 'right':
            dropdownRef.current.style.top = `${anchorRect.height / 2 - dropdownRect.height / 2}px`
            dropdownRef.current.style.left = `${anchorRect.width + threshold}px`
            if (arrowRef.current) {
              arrowRef.current.style.top = '50%'
              arrowRef.current.style.left = '-4px'
              arrowRef.current.style.transform = 'translateY(-50%) rotate(45deg)'
            }
            break
          default:
            dropdownRef.current.style.top = `${top + anchorRect.height}px`
            dropdownRef.current.style.left = `${left}px`
            break
        }
      }

      setPosition(placement)

      if (isOutOfViewport(dropdownRef.current.getBoundingClientRect(), placement)) {
        switch (placement) {
          case 'top':
            setPosition('bottom')
            break
          case 'bottom':
            setPosition('top')
            break
          case 'left':
            setPosition('right')
            break
          case 'right':
            setPosition('left')
            break
          default:
            setPosition('bottom')
            break
        }
      }
    }
  }, [placement, center, threshold, anchorHorizontal])

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node) &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        setOpen(false)
        if (onClose) {
          onClose()
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    setOpen(isOpen || false)
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  useEffect(() => {
    window.addEventListener('scroll', adjustPosition)
    document.addEventListener('resize', adjustPosition)

    return () => {
      window.removeEventListener('scroll', adjustPosition)
      document.removeEventListener('resize', adjustPosition)
    }
  }, [adjustPosition])

  useEffect(() => {
    if (open) {
      adjustPosition()
    }
  }, [open, adjustPosition])

  return (
    <div className='relative'>
      <div
        ref={anchorRef}
        onClick={(e) => {
          e.stopPropagation()
          toggleOpen()
        }}
        className='h-auto w-auto cursor-pointer'
      >
        {anchor}
      </div>
      {open && (
        <div
          ref={dropdownRef}
          style={{
            maxWidth: width || 'auto',
            minWidth: width || 'auto',
            position: 'absolute',
            zIndex: 1000
          }}
          className={classNames('z-10 shadow-popover bg-background-white', className)}
        >
          {arrow && (
            <div ref={arrowRef} className={classNames('absolute z-0 h-2 w-2 bg-background-white', arrowClassName)} />
          )}
          {children}
        </div>
      )}
    </div>
  )
}

export default Dropdown
