import classNames from 'classnames'
import { FC, ReactNode } from 'react'
interface ChildCpnInsideProps {
  title?: string
  component?: ReactNode
  className?: string
  error?: boolean
  helperText?: string
  zIndex?: string
}

const FieldBody: FC<ChildCpnInsideProps> = ({
  title,
  component,
  // error,
  // helperText,
  zIndex
  // className
}) => {
  return (
    <div className=''>
      <div
        className={classNames('flex items-center justify-start space-x-2 w-full relative', {
          [`${zIndex}`]: zIndex
        })}
      >
        <div className='typography-label-md font-semibold text-gray-800 w-5/12 items-start'>{title}</div>
        {component}
      </div>
    </div>
  )
}

export default FieldBody
