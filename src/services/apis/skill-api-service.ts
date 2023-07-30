import type { GetSkillsResult } from '@/interfaces/get-skills-result'
import axios from 'axios'
import { SKILL_API_BASE_URL } from '@/consts/common-consts'
import type { GetSkillsParams } from '@/interfaces/dtos/get-skills-params'
import type { GetSkillsResponse } from '@/interfaces/dtos/get-skills-response'

export class SkillApiService {
  async getSkillsStartingWith(startsWith: string): Promise<GetSkillsResult> {
    const params: GetSkillsParams = {
      startsWith
    }

    try {
      const response = await axios.get<GetSkillsResponse>(SKILL_API_BASE_URL, { params })

      return response?.data?.data ? { skills: response.data.data } : { error: 'No skills returned' }
    } catch (error: any) {
      return { error: error.message || 'Error during API call' }
    }
  }
}

export const skillApiService = new SkillApiService()
