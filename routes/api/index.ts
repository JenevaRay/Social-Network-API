import { Router } from 'express'
import { thoughtsRouter } from './thoughtsRouter'
import { usersRouter } from './usersRouter'
import { reactionsRouter } from './reactionsRouter'

const apiRouter = Router()

apiRouter.use('/thoughts', thoughtsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/reactions', reactionsRouter)

export { apiRouter }