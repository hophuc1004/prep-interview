import { tv } from 'tailwind-variants'

export const typographyVariants = tv({
  variants: {
    variants: {
      display: 'font-bold',
      heading: 'font-semibold',
      label: 'font-medium',
      paragraph: 'font-regular'
    },
    size: {
      large: '',
      medium: '',
      'l-small': '',
      small: '',
      'x-small': ''
    },
    color: {
      brand: 'color-text-brand',
      default: 'color-text-default',
      subtle: 'color-text-subtle',
      subtlest: 'color-text-subtlest',
      inverse: 'color-text-inverse',
      disabled: 'color-text-disabled',
      error: 'color-text-error',
      warning: 'color-text-warning',
      success: 'color-text-success',
      info: 'color-text-info',
      'accent-red': 'color-text-accent-red',
      'accent-grayola': 'color-text-accent-grayola',
      'accent-orange': 'color-text-accent-orange',
      'accent-yellow': 'color-text-accent-yellow',
      'accent-green': 'color-text-accent-green',
      'accent-mint': 'color-text-accent-mint',
      'accent-teal': 'color-text-accent-teal',
      'accent-cyan': 'color-text-accent-cyan',
      'accent-blue': 'color-text-accent-blue',
      'accent-indigo': 'color-text-accent-indigo',
      'accent-purple': 'color-text-accent-purple',
      'accent-pink': 'color-text-accent-pink',
      'accent-brown': 'color-text-accent-brown',
      inherit: 'text-inherit'
    }
  },
  defaultVariants: {
    size: 'medium',
    variants: 'paragraph'
  },
  compoundVariants: [
    {
      variants: 'display',
      size: 'large',
      className: 'text-d-large leading-d-large tracking-d-large'
    },
    {
      variants: 'display',
      size: 'medium',
      className: 'text-d-medium leading-d-medium tracking-d-medium'
    },
    {
      variants: 'display',
      size: 'small',
      className: 'text-d-small leading-d-small tracking-d-small'
    },
    {
      variants: 'display',
      size: 'x-small',
      className: 'text-d-x-small leading-d-x-small tracking-d-x-small'
    },
    {
      variants: 'heading',
      size: 'large',
      className: 'text-h-large leading-h-large tracking-h-large'
    },
    {
      variants: 'heading',
      size: 'medium',
      className: 'text-h-medium leading-h-medium tracking-h-medium'
    },
    {
      variants: 'heading',
      size: 'small',
      className: 'text-h-small leading-h-small tracking-h-small'
    },
    {
      variants: 'heading',
      size: 'x-small',
      className: 'text-h-x-small leading-h-x-small tracking-h-x-small'
    },
    {
      variants: 'label',
      size: 'large',
      className: 'text-l-large leading-l-large tracking-l-large'
    },
    {
      variants: 'label',
      size: 'medium',
      className: 'text-l-medium leading-l-medium tracking-l-medium'
    },
    {
      variants: 'label',
      size: 'l-small',
      className: 'text-l-small leading-p-x-small tracking-l-small'
    },
    {
      variants: 'label',
      size: 'small',
      className: 'text-l-small leading-l-small tracking-l-small'
    },
    {
      variants: 'label',
      size: 'x-small',
      className: 'text-l-x-small leading-l-x-small tracking-l-x-small'
    },
    {
      variants: 'paragraph',
      size: 'large',
      className: 'text-p-large leading-p-large tracking-p-large'
    },
    {
      variants: 'paragraph',
      size: 'medium',
      className: 'text-p-medium leading-p-medium tracking-p-medium'
    },
    {
      variants: 'paragraph',
      size: 'small',
      className: 'text-p-small leading-p-small tracking-p-small'
    },
    {
      variants: 'paragraph',
      size: 'x-small',
      className: 'text-p-x-small leading-p-x-small tracking-p-x-small'
    }
  ]
})
