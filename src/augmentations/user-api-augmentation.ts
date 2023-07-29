import { UserApiService } from '@/services/apis/user-api-service'
import { AuthApiService } from '@/services/apis/auth-api-service'

export {}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $userApi: UserApiService
    $authApi: AuthApiService
  }
}
