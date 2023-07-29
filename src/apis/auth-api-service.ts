import axios, { AxiosError, AxiosResponse } from 'axios'
import { AUTH_API_BASE_URL } from '@/consts/common.const'
import { LoginRequest } from '@/interfaces/dtos/login-request'
import { LoginResponse } from '@/interfaces/dtos/login-response'
import { LoginResult } from '@/interfaces/login-result'

export class AuthApiService {
  constructor() {}

  async login(username: string, password: string): Promise<LoginResult> {
    const request: LoginRequest = {
      username,
      password
    }

    try {
      const response = await axios.post<LoginResponse, AxiosResponse<LoginResponse>>(`${AUTH_API_BASE_URL}/login`, request)

      return response?.data?.accessToken ? { accessToken: response.data.accessToken } : { error: 'No access token returned' }
    } catch (error: AxiosError) {
      return { error: error.message || 'Error during API call' }
    }
  }
}

export const authApiService = new AuthApiService()
