import { Router } from 'express'
import { apiRouter } from './api'

const router = Router()

router.use('/api', apiRouter)

router.use((req, res) => res.send('Wrong route!'))

export { router }