import { tv } from 'tailwind-variants'

export const iconVariants = tv({
  base: 'flex items-center justify-center',
  variants: {
    size: {
      small: 'size-4 text-[16px]', // 16px
      medium: 'size-5 text-[20px]', // 20px
      large: 'size-6 text-[24px]', // 24px
      xlarge: 'size-8 text-[32px]' // 32px
    },
    color: {
      brand: 'color-icon-brand',
      default: 'color-icon-default',
      subtle: 'color-icon-subtle',
      subtlest: 'color-icon-subtlest',
      inverse: 'color-icon-inverse',
      disabled: 'color-icon-disabled',
      error: 'color-icon-error',
      warning: 'color-icon-warning',
      success: 'color-icon-success',
      info: 'color-icon-info',
      'accent-red': 'color-icon-accent-red',
      'accent-grayola': 'color-icon-accent-grayola',
      'accent-orange': 'color-icon-accent-orange',
      'accent-yellow': 'color-icon-accent-yellow',
      'accent-green': 'color-icon-accent-green',
      'accent-mint': 'color-icon-accent-mint',
      'accent-teal': 'color-icon-accent-teal',
      'accent-cyan': 'color-icon-accent-cyan',
      'accent-blue': 'color-icon-accent-blue',
      'accent-indigo': 'color-icon-accent-indigo',
      'accent-purple': 'color-icon-accent-purple',
      'accent-pink': 'color-icon-accent-pink',
      'accent-brown': 'color-icon-accent-brown',
      inherit: 'color-inherit'
    },
    pointer: {
      true: 'cursor-pointer'
    }
  }
})
