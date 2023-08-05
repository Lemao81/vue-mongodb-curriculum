import { SkillModel, Skill } from '../../db/schemas/skill-schema'
import { GetListResult } from '../types'

class SkillService {
  async getSkills(startsWith?: string): Promise<GetListResult<Skill>> {
    try {
      const filter = startsWith
        ? {
            label: {
              $regex: '^' + startsWith,
              $options: 'i'
            }
          }
        : undefined
      const skills = await SkillModel.find(filter).exec()

      return { data: skills }
    } catch (error) {
      return { error: error?.message || 'Error during skill list query' }
    }
  }
}

const skillService = new SkillService()
export default skillService
