import { UserApiService } from '@/apis/user-api-service'
import { AuthApiService } from '@/apis/auth-api-service'

export {}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $userApi: UserApiService
    $authApi: AuthApiService
  }
}
