import { Skill } from '@/models/skill'
import type { AddSkillRequest } from '@/interfaces/dtos/add-skill-request'
import axios from 'axios'
import { CURRICULUM_API_BASE_URL } from '@/consts/base-url-consts'
import type { AddSkillResult } from '@/interfaces/add-skill-result'

export class CurriculumApiService {
  async addSkill(userId: string, skill: Skill): Promise<AddSkillResult> {
    const request: AddSkillRequest = {
      userId,
      key: skill.key
    }

    try {
      await axios.post(`${CURRICULUM_API_BASE_URL}/skills`, request)

      return { isSuccess: true }
    } catch (error: any) {
      return { error: error.message || 'Error during API call' }
    }
  }
}

export const curriculumApiService = new CurriculumApiService()
