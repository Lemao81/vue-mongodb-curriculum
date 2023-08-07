import { CurriculumModel, CurriculumDocument } from '../../db/schemas/curriculum-schema'
import { AddSectionResult } from '../interfaces/add-section-result'
import { SkillModel, SkillDocument } from '../../db/schemas/skill-schema'
import { Types } from 'mongoose'
import { CreateResult } from '../types'
import { GetCurriculumResult } from '../interfaces/get-curriculum-result'

class CurriculumService {
  async createCurriculum(userId: Types.ObjectId): Promise<CreateResult> {
    try {
      return await CurriculumModel.create({ userId })
    } catch (error) {
      return { error: error?.message || 'Error during curriculum creation' }
    }
  }

  async getCurriculum(userIdString: string): Promise<GetCurriculumResult> {
    try {
      const userId = new Types.ObjectId(userIdString)
      const curriculum: CurriculumDocument = await CurriculumModel.findOne({ userId: userId })
      if (!curriculum) {
        return { notFound: true }
      }

      return { curriculum: curriculum }
    } catch (error) {
      return { error: error?.message || 'Error during curriculum query' }
    }
  }

  async addSkill(userIdString: string, key: string): Promise<AddSectionResult> {
    try {
      const curriculumResult = await this.getCurriculum(userIdString)
      if (curriculumResult.error) {
        return { error: curriculumResult.error }
      }

      if (curriculumResult.notFound) {
        return { notFound: true }
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

      return { curriculum: curriculum }
    } catch (error) {
      return { error: error?.message || 'Error during skill addition' }
    }
  }
}

const curriculumService = new CurriculumService()
export default curriculumService
