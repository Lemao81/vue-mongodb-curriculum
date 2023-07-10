import * as dotenv from 'dotenv'
import startWebServer from './web/start-web-server'
import connectDb from './db/connect-db'
import User from './db/schemas/users'
import { ENV_SA_PASSWORD } from './consts/env-variables.const'

dotenv.config()

main().catch((error) => console.log(error))

async function main() {
  const isConnected = await connectDb()
  if (isConnected) {
    const saUser = await User.findOne({ username: 'sa' })
    if (!saUser) {
      await User.create({
        username: 'sa',
        passwordHash: process.env[ENV_SA_PASSWORD]
      })
    }
  }

  await startWebServer()
}
