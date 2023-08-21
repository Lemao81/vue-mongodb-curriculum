import { Skill } from '@/models/skill'
import type { AddSkillRequest } from '@/interfaces/dtos/add-skill-request'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { CURRICULUM_API_BASE_URL } from '@/consts/base-url-consts'
import type { CurriculumCrudResult } from '@/interfaces/curriculum-crud-result'
import type { CurriculumDto } from '@/interfaces/dtos/curriculum-dto'
import { mapToCurriculum } from '@/mappers/curriculum-mapper'
import type { Job } from '@/models/job'
import type { AddJobRequest } from '@/interfaces/dtos/add-job-request'
import { createDate } from '@/helpers/helper'

export class CurriculumApiService {
  async getCurriculum(): Promise<CurriculumCrudResult> {
    try {
      const response = await axios.get<CurriculumDto, AxiosResponse<CurriculumDto>>(`${CURRICULUM_API_BASE_URL}`)

      return { curriculum: mapToCurriculum(response.data) }
    } catch (error: any) {
      return this.handleApiError(error)
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
      return this.handleApiError(error)
    }
  }

  async removeSkill(key: string): Promise<CurriculumCrudResult> {
    try {
      const response = await axios.delete<CurriculumDto, AxiosResponse<CurriculumDto>>(`${CURRICULUM_API_BASE_URL}/skills/${key}`)

      return { curriculum: mapToCurriculum(response.data) }
    } catch (error: any) {
      return this.handleApiError(error)
    }
  }

  async addJob(job: Job): Promise<CurriculumCrudResult> {
    if (!job.startDate) {
      throw new Error('Start date required when adding job')
    }

    const request: AddJobRequest = {
      startDate: createDate(job.startDate),
      endDate: job.endDate ? createDate(job.endDate) : undefined,
      jobTitle: job.jobTitle,
      company: job.company,
      isCurrent: job.isCurrent,
      description: job.description
    }

    try {
      const response = await axios.post<CurriculumDto, AxiosResponse<CurriculumDto>>(`${CURRICULUM_API_BASE_URL}/jobs`, request)

      return { curriculum: mapToCurriculum(response.data) }
    } catch (error: any) {
      return this.handleApiError(error)
    }
  }

  async removeJob(id: string): Promise<CurriculumCrudResult> {
    try {
      const response = await axios.delete<CurriculumDto, AxiosResponse<CurriculumDto>>(`${CURRICULUM_API_BASE_URL}/jobs/${id}`)

      return { curriculum: mapToCurriculum(response.data) }
    } catch (error: any) {
      return this.handleApiError(error)
    }
  }

  private handleApiError(error: any): CurriculumCrudResult {
    const message = error?.message || 'Error during API call'
    console.error(message)

    return { error: message }
  }
}

export const curriculumApiService = new CurriculumApiService()
