import { Skill } from "@/models/skill";

export interface GetSkillsResult {
  skills?: Skill[]
  error?: string
}
