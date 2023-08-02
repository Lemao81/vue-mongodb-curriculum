import type { GetSkillsResult } from '@/interfaces/get-skills-result'
import axios from 'axios'
import { SKILL_API_BASE_URL } from '@/consts/base-url-consts'
import type { GetSkillsParams } from '@/interfaces/dtos/get-skills-params'
import type { SkillDto } from '@/interfaces/dtos/skill-dto'
import { Skill } from '@/models/skill'

export class SkillApiService {
  async getSkillsStartingWith(startsWith: string): Promise<GetSkillsResult> {
    const params: GetSkillsParams = {
      startsWith
    }

    try {
      const response = await axios.get<SkillDto[]>(SKILL_API_BASE_URL, { params })
      if (response?.data) {
        return {
          skills: response.data.map((d) => new Skill(d.key || '', d.label || ''))
        }
      }

      return { error: 'No skills returned' }
    } catch (error: any) {
      return { error: error.message || 'Error during API call' }
    }
  }
}

export const skillApiService = new SkillApiService()
