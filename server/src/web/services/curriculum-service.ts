import { CurriculumModel, CurriculumDocument } from '../../db/schemas/curriculum-schema'
import { SkillModel, SkillDocument } from '../../db/schemas/skill-schema'
import { Types } from 'mongoose'
import { CreateResult } from '../types'
import { CurriculumResult } from '../interfaces/curriculum-result'
import { UpsertJobRequest } from '../interfaces/dtos/upsert-job-request'

class CurriculumService {
  async createCurriculum(userId: Types.ObjectId): Promise<CreateResult> {
    try {
      return await CurriculumModel.create({ userId })
    } catch (error) {
      return { error: error?.message || 'Error during curriculum creation' }
    }
  }

  async getCurriculum(userIdString: string): Promise<CurriculumResult> {
    try {
      const userId = new Types.ObjectId(userIdString)
      const curriculum: CurriculumDocument = await CurriculumModel.findOne({ userId: userId })
      if (!curriculum) {
        return { notFound: true }
      }

      return { curriculum }
    } catch (error) {
      return { error: error?.message || 'Error during curriculum query' }
    }
  }

  async addSkill(userIdString: string, key: string): Promise<CurriculumResult> {
    try {
      const curriculumResult = await this.getCurriculum(userIdString)
      if (!curriculumResult.curriculum) {
        return curriculumResult
      }

      let curriculum = curriculumResult.curriculum

      const skill: SkillDocument = await SkillModel.findOne({ key: key })
      if (!skill) {
        return { notFound: true }
      }

      if (!curriculum.skills.some((s) => s.key === key)) {
        curriculum.skills.push(skill)
        curriculum = await curriculum.save()
      }

      return { curriculum }
    } catch (error) {
      return { error: error?.message || 'Error during skill addition' }
    }
  }

  async removeSkill(userIdString: string, key: string): Promise<CurriculumResult> {
    try {
      const curriculumResult = await this.getCurriculum(userIdString)
      if (!curriculumResult.curriculum) {
        return curriculumResult
      }

      let curriculum = curriculumResult.curriculum
      curriculum.skills = curriculum.skills.filter((s) => s.key !== key)
      curriculum = await curriculum.save()

      return { curriculum }
    } catch (error) {
      return { error: error?.message || 'Error during skill removal' }
    }
  }

  async addJob(userIdString: string, request: UpsertJobRequest): Promise<CurriculumResult> {
    try {
      const curriculumResult = await this.getCurriculum(userIdString)
      if (!curriculumResult.curriculum) {
        return curriculumResult
      }

      let curriculum = curriculumResult.curriculum
      curriculum.jobs.push({
        startDate: request.startDate,
        endDate: request.endDate,
        company: request.company,
        jobTitle: request.jobTitle,
        isCurrent: request.isCurrent,
        description: request.description
      })
      curriculum = await curriculum.save()

      return { curriculum }
    } catch (error) {
      return { error: error?.message || 'Error during job addition' }
    }
  }

  async updateJob(userIdString: string, jobIdString: string, request: UpsertJobRequest): Promise<CurriculumResult> {
    try {
      const curriculumResult = await this.getCurriculum(userIdString)
      if (!curriculumResult.curriculum) {
        return curriculumResult
      }

      let curriculum = curriculumResult.curriculum
      const job = curriculum.jobs.find((j) => j._id.toString() === jobIdString)
      if (job) {
        job.startDate = request.startDate
        job.endDate = request.endDate
        job.jobTitle = request.jobTitle
        job.company = request.company
        job.description = request.description
        job.isCurrent = request.isCurrent

        curriculum = await curriculum.save()
      }

      return { curriculum }
    } catch (error) {
      return { error: error?.message || 'Error during job update' }
    }
  }

  async removeJob(userIdString: string, jobIdString: string): Promise<CurriculumResult> {
    try {
      const curriculumResult = await this.getCurriculum(userIdString)
      if (!curriculumResult.curriculum) {
        return curriculumResult
      }

      let curriculum = curriculumResult.curriculum
      curriculum.jobs = curriculum.jobs.filter((j) => j._id.toString() !== jobIdString)
      curriculum = await curriculum.save()

      return { curriculum }
    } catch (error) {
      return { error: error?.message || 'Error during job removal' }
    }
  }
}

const curriculumService = new CurriculumService()
export default curriculumService
