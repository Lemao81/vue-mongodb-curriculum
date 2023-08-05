import { CurriculumModel, CurriculumDocument } from '../../db/schemas/curriculum-schema'
import { AddSectionResult } from '../interfaces/add-section-result'
import { SkillModel, SkillDocument } from '../../db/schemas/skill-schema'
import { Types } from 'mongoose'
import { CreateResult } from '../types'

class CurriculumService {
  async createCurriculum(userId: Types.ObjectId): Promise<CreateResult> {
    try {
      return await CurriculumModel.create({ userId })
    } catch (error) {
      return { error: error?.message || 'Error during curriculum creation' }
    }
  }

  async addSkill(userIdString: string, key: string): Promise<AddSectionResult> {
    try {
      const userId = new Types.ObjectId(userIdString)
      let curriculum: CurriculumDocument = await CurriculumModel.findOne({ userId: userId })
      if (!curriculum) {
        return { notFound: true }
      }

      const skill: SkillDocument = await SkillModel.findOne({ key: key })
      if (!skill) {
        return { notFound: true }
      }

      curriculum.skills.push(skill)
      curriculum = await curriculum.save()

      return { curriculum: curriculum }
    } catch (error) {
      return { error: error?.message || 'Error during skill addition' }
    }
  }
}

const curriculumService = new CurriculumService()
export default curriculumService
