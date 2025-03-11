import { VariantProps } from 'tailwind-variants'
import React, { forwardRef, ReactNode } from 'react'
import { typographyVariants } from './variants'

export type TypographyVariants = VariantProps<typeof typographyVariants>
export type TypographyColor =
  | 'brand'
  | 'default'
  | 'subtle'
  | 'subtlest'
  | 'inverse'
  | 'disabled'
  | 'error' // Note: This seems to be a typo, should it be 'error'?
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
export interface TypographyProps extends TypographyVariants, Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  children?: ReactNode
  size?: 'large' | 'medium' | 'l-small' | 'small' | 'x-small'
  variants?: 'display' | 'heading' | 'label' | 'paragraph'
  as?: 'h1' | 'h2' | 'label' | 'p' | 'div'
  htmlFor?: string
}
export type TypographyRef = HTMLHeadingElement & HTMLParagraphElement & HTMLLabelElement

const Typography = forwardRef<TypographyRef, TypographyProps>(
  ({ children, size, variants, className, color, as, ...other }: TypographyProps, ref) => {
    const getComponent = (variants: TypographyProps['variants']) => {
      if (as) {
        return as
      }
      switch (variants) {
        case 'display':
          return 'h1'
        case 'heading':
          return 'h2'
        case 'label':
          return 'label'
        case 'paragraph':
          return 'p'
        default:
          return 'p'
      }
    }

    const Component = getComponent(variants)

    return (
      <Component
        ref={ref}
        className={typographyVariants({ size: size, variants: variants, className, color })}
        {...other}
      >
        {children}
      </Component>
    )
  }
)

Typography.displayName = 'Typography'

export { Typography }

export default Typography
