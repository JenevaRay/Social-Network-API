import { Router } from 'express'
import { thoughtsRouter } from './thoughtsRouter'
import { usersRouter } from './usersRouter'

const apiRouter = Router()

apiRouter.use('/thoughts', thoughtsRouter)
apiRouter.use('/users', usersRouter)

export { apiRouter }