import type { InternalAxiosRequestConfig } from 'axios'
import { useUserAuthStore } from '@/stores/user-auth-store'

export default function appendRequestAuthorization(request: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> {
  const userAuthStore = useUserAuthStore()
  if (userAuthStore.isAuthenticated) {
    request.headers.setAuthorization(`Bearer ${userAuthStore.accessToken}`)
  }

  return request
}
