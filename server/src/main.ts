import * as dotenv from 'dotenv'
import startWebServer from './web/start-web-server'
import connectDb from './db/connect-db'
import User from './db/users'

dotenv.config()

main().catch((error) => console.log(error))

async function main() {
  const isConnected = await connectDb()
  if (isConnected) {
    const saUser = await User.findOne({ username: 'sa' })
    if (!saUser) {
      await User.create({
        username: 'sa',
        passwordHash: '4cf6829aa93728e8f3c97df913fb1bfa95fe5810e2933a05943f8312a98d9cf2'
      })
    }
  }

  await startWebServer()
}
