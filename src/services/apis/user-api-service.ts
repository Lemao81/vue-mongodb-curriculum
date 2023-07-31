import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { USER_API_BASE_URL } from '@/consts/base-url-consts'
import type { RegisterUserRequest } from '@/interfaces/dtos/register-user-request'
import type { RegisterUserResult } from '@/interfaces/register-user-result'
import type { RegisterUserResponse } from '@/interfaces/dtos/register-user-response'

export class UserApiService {
  async registerUser(username: string, password: string): Promise<RegisterUserResult> {
    const request: RegisterUserRequest = {
      username,
      password
    }

    try {
      const response = await axios.post<RegisterUserResponse, AxiosResponse<RegisterUserResponse>>(USER_API_BASE_URL, request)

      return response?.data?.url ? { isSuccess: true } : { error: 'Registering failed' }
    } catch (error: any) {
      return { error: error.message || 'Error during API call' }
    }
  }
}

export const userApiService = new UserApiService()
