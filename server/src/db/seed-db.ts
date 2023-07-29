import UserModel, { UserDocument } from './schemas/users'
import { ENV_SA_PASSWORD } from '../consts/env-variables.const'
import SkillModel, { Skill } from './schemas/skills'
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
