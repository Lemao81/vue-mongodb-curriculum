import type { Skill } from '@/models/skill'
import type { Job } from '@/models/job'
import type { Education } from '@/models/education'

export class Curriculum {
  skills: Skill[]
  jobs: Job[]
  educations: Education[]

  constructor() {
    this.skills = []
    this.jobs = []
    this.educations = []
  }
}
