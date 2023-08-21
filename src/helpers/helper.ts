import type { MonthYear } from '@/interfaces/month-year'

export function extractJwtPayload<T>(tokenString: string): T | null {
  const parts = tokenString.split('.')
  if (parts.length != 3) {
    return null
  }

  const decoded = atob(parts[1])

  return JSON.parse(decoded) as T
}

export function createDate(monthYear: MonthYear): Date {
  return new Date(Number(monthYear.year), Number(monthYear.month))
}
