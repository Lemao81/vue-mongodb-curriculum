import axios, { AxiosError } from 'axios'
import { USER_API_BASE_URL } from '@/consts/common.const'
import { ToastPluginApi } from 'vue-toast-notification'

class UserApiService {
  constructor(private toast: ToastPluginApi) {}

  async registerUser(username: string, password: string): Promise<void> {
    const body = {
      username,
      password
    }
    try {
      await axios.post(`${USER_API_BASE_URL}`, body)
      this.toast.info('You have been registered')
    } catch (error: AxiosError) {
      this.toast.warning(`Registration failed: ${error.response.data.error}`)
    }
  }
}

export default UserApiService
