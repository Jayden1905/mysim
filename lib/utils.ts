import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const twentyFourHours = 1000 * 60 * 60 * 24

export const iconClassNames = 'mr-4 h-5 w-5'

export function formatCompactNumber(number: number) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(number)
}
