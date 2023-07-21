import axios, { AxiosError } from 'axios'
import { AUTH_API_BASE_URL } from '@/consts/common.const'
import { LoginRequest } from '@/interfaces/dtos/login-request'
import { ToastPluginApi } from 'vue-toast-notification'

export class AuthApiService {
  constructor(private toast: ToastPluginApi) {}

  async login(username: string, password: string): Promise<boolean> {
    const request: LoginRequest = {
      username,
      password
    }

    try {
      await axios.post(`${AUTH_API_BASE_URL}/login`, request)

      return true
    } catch (error: AxiosError) {
      this.toast.warning(`Login failed: ${error.response.data.error}`)

      return false
    }
  }
}
