import axios from 'axios'
import { USER_API_BASE_URL } from '@/consts/common.const'

class UserApiService {
  async registerUser(username: string, password: string): Promise<void> {
    const body = {
      username,
      password
    }
    const response = await axios.post(`${USER_API_BASE_URL}`, body)
  }
}

export default UserApiService
