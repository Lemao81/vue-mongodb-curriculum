import { Skill } from '@/models/skill'

export interface AddSkillRequest {
  userId: string
  skill: Skill
}
