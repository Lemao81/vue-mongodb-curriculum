import { CurriculumModel, CurriculumDocument } from '../../db/schemas/curriculum-schema'
import { SkillModel, SkillDocument } from '../../db/schemas/skill-schema'
import { Types } from 'mongoose'
import { CreateResult } from '../types'
import { CurriculumResult } from '../interfaces/curriculum-result'

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
}

const curriculumService = new CurriculumService()
export default curriculumService
