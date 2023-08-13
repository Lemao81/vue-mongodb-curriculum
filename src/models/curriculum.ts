import type { Skill } from '@/models/skill'
import type { Job } from '@/models/job'

export class Curriculum {
  skills: Skill[]
  jobs: Job[]

  constructor() {
    this.skills = []
    this.jobs = []
  }
}
