import { UserModel, UserDocument } from './schemas/user-schema'
import { ENV_SA_PASSWORD } from '../consts/env-variable-consts'
import { SkillModel, Skill } from './schemas/skill-schema'
import { skills } from './skills-seed'

export default async function seedDb(): Promise<void> {
  await seedUsers()
  await seedSkills()
}

async function seedUsers() {
  const saUser: UserDocument = await UserModel.findOne({ username: 'sa' })
  if (!saUser) {
    await UserModel.create({
      username: 'sa',
      passwordHash: process.env[ENV_SA_PASSWORD]
    })
  }
}

async function seedSkills() {
  const skillCount = await SkillModel.countDocuments().exec()
  if (skillCount == 0) {
    for (const s of skills) {
      await SkillModel.create(s)
    }
  }
}
