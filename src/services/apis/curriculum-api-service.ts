import { Skill } from '@/models/skill'
import type { AddSkillRequest } from '@/interfaces/dtos/add-skill-request'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { CURRICULUM_API_BASE_URL } from '@/consts/base-url-consts'
import type { CurriculumCrudResult } from '@/interfaces/curriculum-crud-result'
import type { CurriculumDto } from '@/interfaces/dtos/curriculum-dto'
import { mapToCurriculum } from '@/mappers/curriculum-mapper'
import type { Job } from '@/models/job'
import type { UpsertJobRequest } from '@/interfaces/dtos/upsert-job-request'
import { createDate } from '@/helpers/helper'
import type { Education } from '@/models/education'
import type { UpsertEducationRequest } from '@/interfaces/dtos/upsert-education-request'

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

    const request: UpsertJobRequest = {
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

  async updateJob(job: Job): Promise<CurriculumCrudResult> {
    if (!job.id) {
      throw new Error('Id required when updating job')
    }

    if (!job.startDate) {
      throw new Error('Start date required when updating job')
    }

    const request: UpsertJobRequest = {
      startDate: createDate(job.startDate),
      endDate: job.endDate ? createDate(job.endDate) : undefined,
      jobTitle: job.jobTitle,
      company: job.company,
      isCurrent: job.isCurrent,
      description: job.description
    }

    try {
      const response = await axios.put<CurriculumDto, AxiosResponse<CurriculumDto>>(`${CURRICULUM_API_BASE_URL}/jobs/${job.id}`, request)

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

  async addEducation(education: Education): Promise<CurriculumCrudResult> {
    if (!education.startDate) {
      throw new Error('Start date required when adding education')
    }

    const request: UpsertEducationRequest = {
      startDate: createDate(education.startDate),
      endDate: education.endDate ? createDate(education.endDate) : undefined,
      isCurrent: education.isCurrent,
      institute: education.institute,
      degree: education.degree,
      grade: education.grade
    }

    try {
      const response = await axios.post<CurriculumDto, AxiosResponse<CurriculumDto>>(`${CURRICULUM_API_BASE_URL}/educations`, request)

      return { curriculum: mapToCurriculum(response.data) }
    } catch (error: any) {
      return this.handleApiError(error)
    }
  }

  async updateEducation(education: Education): Promise<CurriculumCrudResult> {
    if (!education.id) {
      throw new Error('Id required when updating education')
    }

    if (!education.startDate) {
      throw new Error('Start date required when adding education')
    }

    const request: UpsertEducationRequest = {
      startDate: createDate(education.startDate),
      endDate: education.endDate ? createDate(education.endDate) : undefined,
      isCurrent: education.isCurrent,
      institute: education.institute,
      degree: education.degree,
      grade: education.grade
    }

    try {
      const response = await axios.put<CurriculumDto, AxiosResponse<CurriculumDto>>(`${CURRICULUM_API_BASE_URL}/educations/${education.id}`, request)

      return { curriculum: mapToCurriculum(response.data) }
    } catch (error: any) {
      return this.handleApiError(error)
    }
  }

  async removeEducation(id: string): Promise<CurriculumCrudResult> {
    try {
      const response = await axios.delete<CurriculumDto, AxiosResponse<CurriculumDto>>(`${CURRICULUM_API_BASE_URL}/educations/${id}`)

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
