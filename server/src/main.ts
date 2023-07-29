import * as dotenv from 'dotenv'
import startWebServer from './web/start-web-server'
import connectDb from './db/connect-db'
import seedDb from './db/seed-db'

dotenv.config()

main().catch((error) => console.log(error))

async function main() {
  const isConnected = await connectDb()
  if (isConnected) {
    await seedDb()
  }

  await startWebServer()
}
