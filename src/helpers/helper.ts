export function extractJwtPayload<T>(tokenString: string): T | null {
  const parts = tokenString.split('.')
  if (parts.length != 3) {
    return null
  }

  const decoded = atob(parts[1])

  return JSON.parse(decoded) as T
}
