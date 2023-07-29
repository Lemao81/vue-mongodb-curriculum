import axios, { AxiosError, AxiosResponse } from 'axios'
import { USER_API_BASE_URL } from '@/consts/common.const'
import { RegisterUserRequest } from '@/interfaces/dtos/register-user-request'
import { RegisterUserResult } from '@/interfaces/register-user-result'
import { RegisterUserResponse } from '@/interfaces/dtos/register-user-response'

export class UserApiService {
  constructor() {}

  async registerUser(username: string, password: string): Promise<RegisterUserResult> {
    const request: RegisterUserRequest = {
      username,
      password
    }

    try {
      const response = await axios.post<RegisterUserResponse, AxiosResponse<RegisterUserResponse>>(USER_API_BASE_URL, request)

      return response?.data?.url ? { isSuccess: true } : { error: 'Registering failed' }
    } catch (error: AxiosError) {
      return { error: error.message || 'Error during API call' }
    }
  }
}

export const userApiService = new UserApiService()
