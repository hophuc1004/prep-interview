import { tv } from 'tailwind-variants'

export const inputBaseVariants = tv({
  base: 'outline- flex min-h-10 items-center rounded-lg px-2 py-1 text-p-medium leading-p-medium tracking-p-medium outline outline-1 outline-foreground-subtlest color-text-subtle placeholder:text-p-medium placeholder:leading-p-medium placeholder:tracking-p-medium',
  variants: {
    disabled: {
      true: 'cursor-default bg-foreground-disabled-subtlest outline-foreground-subtlest color-text-disabled placeholder:color-text-disabled hover:outline-none hover:outline-offset-0'
    },
    color: {
      primary: 'outline-foreground-subtlest focus-within:outline-foreground-subtle',
      error: 'outline-foreground-errors hover:shadow-hover-error'
    }
  },

  defaultVariants: {
    color: 'primary',
    disabled: false
  },
  compoundVariants: [
    {
      color: 'primary',
      disabled: false,
      className: 'hover:shadow-hover-stage hover:outline-foreground-subtle'
    },
    {
      color: 'error',
      disabled: false,
      className: 'hover:outline-red-300'
    }
  ]
})
