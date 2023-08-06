import { Skill } from '@/models/skill'
import type { ValidationFunc } from '@/functions/validations'

export interface SkillFormComponentData {
  skill: Skill | null
  skills: Skill[]
  rules: { required: ValidationFunc }
}
