import { connect, connection } from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017'
connect(connectionString)

export { connection }
