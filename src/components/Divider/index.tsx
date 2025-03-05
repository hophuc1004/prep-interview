import React from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const variants = tv({
  variants: {
    color: {
      brand: 'bg-background-brand',
      'brand-hover': 'bg-background-brand-hover',
      'brand-pressed': 'bg-background-brand-pressed',
      primary: 'bg-background-primary',
      'primary-hover': 'bg-background-primary-hover',
      'primary-pressed': 'bg-background-primary-pressed',
      secondary: 'bg-background-secondary',
      'secondary-hover': 'bg-background-secondary-hover',
      'secondary-pressed': 'bg-background-secondary-pressed',
      tertiary: 'bg-background-tertiary',
      'tertiary-hover': 'bg-background-tertiary-hover',
      'tertiary-pressed': 'bg-background-tertiary-pressed',
      danger: 'bg-background-danger',
      warning: 'bg-background-warning',
      success: 'bg-background-success',
      info: 'bg-background-info',
      'accent-red': 'bg-background-accent-red',
      'accent-grayola': 'bg-background-accent-grayola',
      'accent-orange': 'bg-background-accent-orange',
      'accent-yellow': 'bg-background-accent-yellow',
      'accent-green': 'bg-background-accent-green',
      'accent-mint': 'bg-background-accent-mint',
      'accent-teal': 'bg-background-accent-teal',
      'accent-cyan': 'bg-background-accent-cyan',
      'accent-blue': 'bg-background-accent-blue',
      'accent-indigo': 'bg-background-accent-indigo',
      'accent-purple': 'bg-background-accent-purple',
      'accent-pink': 'bg-background-accent-pink',
      'accent-brown': 'bg-background-accent-brown',
      'foreground-white': 'var(--color-base-white)',
      'foreground-white-hover': 'var(--color-zinc-100)',
      'foreground-brand': 'var(--color-grayola-600)',
      'foreground-brand-hover': 'var(--color-grayola-500)',
      'foreground-brand-active': 'var(--color-grayola-600)',
      'foreground-default': 'var(--color-zinc-950)',
      'foreground-subtle': 'var(--color-zinc-500)',
      'foreground-subtlest': 'var(--color-zinc-300)',
      'foreground-inverse': 'var(--color-base-white)',
      'foreground-errors': 'var(--color-red-600)',
      'foreground-warning': 'var(--color-orange-600)',
      'foreground-success': 'var(--color-green-600)',
      'foreground-info': 'var(--color-blue-600)',
      'foreground-accent-red': 'var(--color-red-600)',
      'foreground-accent-red-subtle': 'var(--color-red-100)',
      'foreground-accent-grayola': 'var(--color-grayola-600)',
      'foreground-accent-grayola-subtle': 'var(--color-grayola-100)',
      'foreground-accent-orange': 'var(--color-orange-600)',
      'foreground-accent-orange-subtle': 'var(--color-orange-100)',
      'foreground-accent-yellow': 'var(--color-yellow-600)',
      'foreground-accent-yellow-subtle': 'var(--color-yellow-100)',
      'foreground-accent-green': 'var(--color-green-600)',
      'foreground-accent-green-subtle': 'var(--color-green-100)',
      'foreground-accent-mint': 'var(--color-mint-600)',
      'foreground-accent-mint-subtle': 'var(--color-mint-100)',
      'foreground-accent-teal': 'var(--color-teal-600)',
      'foreground-accent-teal-subtle': 'var(--color-teal-100)',
      'foreground-accent-cyan': 'var(--color-cyan-600)',
      'foreground-accent-cyan-subtle': 'var(--color-cyan-100)',
      'foreground-accent-blue': 'var(--color-blue-600)',
      'foreground-accent-blue-subtle': 'var(--color-blue-100)',
      'foreground-accent-indigo': 'var(--color-indigo-600)',
      'foreground-accent-indigo-subtle': 'var(--color-indigo-100)',
      'foreground-accent-purple': 'var(--color-purple-600)',
      'foreground-accent-purple-subtle': 'var(--color-purple-100)',
      'foreground-accent-pink': 'var(--color-pink-600)',
      'foreground-accent-pink-subtle': 'var(--color-pink-100)',
      'foreground-accent-brown': 'var(--color-brown-600)',
      'foreground-accent-brown-subtle': 'var(--color-brown-100)',
      'foreground-disabled': 'var(--color-overlay-dark-200)',
      'foreground-disabled-subtle': 'var(--color-overlay-dark-100)',
      'foreground-disabled-subtlest': 'var(--color-overlay-dark-50)'
    },
    orientation: {
      horizontal: 'w-full',
      vertical: 'flex-shrink-0 border-l'
    }
  },
  defaultVariants: {
    color: 'tertiary',
    orientation: 'horizontal'
  }
})

type DividerVariant = VariantProps<typeof variants>

interface DividerProps extends DividerVariant {
  thickness?: string | number
  margin?: string
  height?: string | number
  className?: string
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  color = 'tertiary',
  thickness = '1px',
  height,
  className
}) => {
  return (
    <div
      style={{
        width: orientation === 'horizontal' ? '100%' : thickness,
        height: orientation === 'vertical' ? (height ?? '90%') : thickness
      }}
      className={variants({ color, orientation, className })}
    />
  )
}

export default Divider
