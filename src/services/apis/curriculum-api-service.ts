import { Skill } from '@/models/skill'
import type { AddSkillRequest } from '@/interfaces/dtos/add-skill-request'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { CURRICULUM_API_BASE_URL } from '@/consts/base-url-consts'
import type { AddSkillResult } from '@/interfaces/add-skill-result'
import type { GetCurriculumResult } from '@/interfaces/get-curriculum-result'
import type { GetCurriculumParams } from '@/interfaces/dtos/get-curriculum-params'
import type { CurriculumDto } from '@/interfaces/dtos/curriculum-dto'
import { mapToCurriculum } from '@/mappers/curriculum-mapper'

export class CurriculumApiService {
  async getCurriculum(userId: string): Promise<GetCurriculumResult> {
    const params: GetCurriculumParams = {
      userId
    }

    try {
      const response = await axios.get<CurriculumDto, AxiosResponse<CurriculumDto>>(`${CURRICULUM_API_BASE_URL}`, { params })

      return { curriculum: mapToCurriculum(response.data) }
    } catch (error: any) {
      return { error: error.message || 'Error during API call' }
    }
  }

  async addSkill(userId: string, skill: Skill): Promise<AddSkillResult> {
    const request: AddSkillRequest = {
      userId,
      key: skill.key
    }

    try {
      const response = await axios.post<CurriculumDto, AxiosResponse<CurriculumDto>>(`${CURRICULUM_API_BASE_URL}/skills`, request)

      return { curriculum: mapToCurriculum(response.data) }
    } catch (error: any) {
      return { error: error.message || 'Error during API call' }
    }
  }
}

export const curriculumApiService = new CurriculumApiService()
