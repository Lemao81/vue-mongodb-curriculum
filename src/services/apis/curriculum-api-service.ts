import { Skill } from '@/models/skill'
import type { AddSkillRequest } from '@/interfaces/dtos/add-skill-request'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { CURRICULUM_API_BASE_URL } from '@/consts/base-url-consts'
import type { CurriculumCrudResult } from '@/interfaces/curriculum-crud-result'
import type { CurriculumDto } from '@/interfaces/dtos/curriculum-dto'
import { mapToCurriculum } from '@/mappers/curriculum-mapper'

export class CurriculumApiService {
  async getCurriculum(): Promise<CurriculumCrudResult> {
    try {
      const response = await axios.get<CurriculumDto, AxiosResponse<CurriculumDto>>(`${CURRICULUM_API_BASE_URL}`)

      return { curriculum: mapToCurriculum(response.data) }
    } catch (error: any) {
      return { error: error.message || 'Error during API call' }
    }
  }

  async addSkill(skill: Skill): Promise<CurriculumCrudResult> {
    const request: AddSkillRequest = {
      key: skill.key
    }

    try {
      const response = await axios.post<CurriculumDto, AxiosResponse<CurriculumDto>>(`${CURRICULUM_API_BASE_URL}/skills`, request)

      return { curriculum: mapToCurriculum(response.data) }
    } catch (error: any) {
      return { error: error.message || 'Error during API call' }
    }
  }

  async removeSkill(key: string): Promise<CurriculumCrudResult> {
    try {
      const response = await axios.delete<CurriculumDto, AxiosResponse<CurriculumDto>>(`${CURRICULUM_API_BASE_URL}/skills/${key}`)

      return { curriculum: mapToCurriculum(response.data) }
    } catch (error: any) {
      return { error: error.message || 'Error during API call' }
    }
  }
}

export const curriculumApiService = new CurriculumApiService()
