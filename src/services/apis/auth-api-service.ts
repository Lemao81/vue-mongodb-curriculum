import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { AUTH_API_BASE_URL } from '@/consts/base-url-consts'
import type { LoginRequest } from '@/interfaces/dtos/login-request'
import type { LoginResponse } from '@/interfaces/dtos/login-response'
import type { LoginResult } from '@/interfaces/login-result'

export class AuthApiService {
  async login(username: string, password: string): Promise<LoginResult> {
    const request: LoginRequest = {
      username,
      password
    }

    try {
      const response = await axios.post<LoginResponse, AxiosResponse<LoginResponse>>(`${AUTH_API_BASE_URL}/login`, request)

      return response?.data?.accessToken ? { accessToken: response.data.accessToken } : { error: 'No access token returned' }
    } catch (error: any) {
      return { error: error.message || 'Error during API call' }
    }
  }
}

export const authApiService = new AuthApiService()
