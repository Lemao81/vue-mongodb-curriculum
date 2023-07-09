import UserApiService from '@/apis/user-api.service'

export {}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $userApi: UserApiService
  }
}
