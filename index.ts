import * as express from 'express'
import { connection } from './config/connection'
import { router } from './routes'

const port = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

connection.once('open', () => {
  app.listen(port, () => {
    console.log(`API server running on port ${port}`)
  })
})
