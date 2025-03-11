import { tv } from 'tailwind-variants'

export const checkBoxInputContainerVariants = tv({
  base: 'relative flex items-center',
  variants: {
    size: {
      small: 'size-4',
      medium: 'size-5',
      large: 'size-6'
    }
  },
  defaultVariants: {
    size: 'medium'
  }
})

export const checkBoxVariants = tv({
  base: "before:content[''] hover:shadow-hover-stage peer cursor-pointer appearance-none rounded-[4px] border-2 transition-all transition-colors duration-0 border-foreground-subtle checked:border-none checked:bg-foreground-brand disabled:hover:shadow-none",
  variants: {
    size: {
      small: 'size-4',
      medium: 'size-5',
      large: 'size-6'
    },
    disabled: {
      true: 'cursor-default border-foreground-disabled bg-background-tertiary disabled:border-foreground-disabled disabled:bg-background-tertiary checked:disabled:bg-foreground-disabled'
    }
  },
  defaultVariants: {
    size: 'medium'
  }
})
