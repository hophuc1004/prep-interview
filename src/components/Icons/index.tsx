import { forwardRef } from 'react'
import { iconVariants } from './variants'
import { svgIcons } from '~/shared/icons'

export type IconColor =
  | 'brand'
  | 'default'
  | 'subtle'
  | 'subtlest'
  | 'inverse'
  | 'disabled'
  | 'error'
  | 'warning'
  | 'success'
  | 'info'
  | 'accent-red'
  | 'accent-grayola'
  | 'accent-orange'
  | 'accent-yellow'
  | 'accent-green'
  | 'accent-mint'
  | 'accent-teal'
  | 'accent-cyan'
  | 'accent-blue'
  | 'accent-indigo'
  | 'accent-purple'
  | 'accent-pink'
  | 'accent-brown'
  | 'inherit'

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: keyof typeof svgIcons
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  color?: IconColor
  pointer?: boolean
}

const Icons = forwardRef<HTMLDivElement, IconProps>(
  ({ icon, size = 'medium', color = 'default', className, pointer, ...other }, ref) => {
    return (
      <div ref={ref} className={iconVariants({ size, color, className, pointer })} {...other}>
        {(icon && svgIcons[icon]) || icon}
      </div>
    )
  }
)

Icons.displayName = 'Icons'
export { Icons }
export default Icons
