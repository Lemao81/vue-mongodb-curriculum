import mongoose from 'mongoose'
import { ENV_DB_PASSWORD, ENV_DB_USER } from '../consts/env-variables.const'

export default async function connectDb(): Promise<boolean> {
  const dbUser = process.env[ENV_DB_USER]
  const dbPassword = process.env[ENV_DB_PASSWORD]
  const mongoDbUrl = `mongodb://${dbUser}:${dbPassword}@localhost:27017/curriculumDB`
  try {
    await mongoose.connect(mongoDbUrl)
    console.log('Db connected')

    return true
  } catch (error) {
    console.error(`Db connection failed: ${JSON.stringify(error)}`)

    return false
  }
}
