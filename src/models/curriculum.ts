import type { Skill } from '@/models/skill'

export class Curriculum {
  skills: Skill[]

  constructor() {
    this.skills = []
  }
}
