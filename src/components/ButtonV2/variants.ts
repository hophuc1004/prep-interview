import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: 'flex cursor-pointer items-center rounded-lg py-[6px]',
  variants: {
    size: {
      small: 'min-w-[60px] p-2',
      medium: 'min-w-[60px] p-2',
      large: 'min-w-[60px] p-2'
    },
    variants: {
      primary: 'bg-foreground-brand hover:bg-foreground-brand-hover active:bg-foreground-brand-active',
      secondary:
        'outline outline-1 outline-foreground-subtle hover:bg-foreground-white-hover active:bg-foreground-accent-grayola-subtle active:outline-foreground-accent-grayola',
      tertiary: 'hover:bg-foreground-white-hover active:bg-foreground-accent-grayola-subtle'
    },
    disabled: {
      true: 'cursor-default outline-none bg-foreground-disabled hover:bg-foreground-disabled active:bg-foreground-disabled'
    }
  }
})
