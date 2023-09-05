import { Router } from 'express'
const thoughtsRouter = Router()

import { getThoughts, createThought, getThought, updateThought, deleteThought } from '../../controllers/thoughtsController'

// /api/thoughts
thoughtsRouter.route('/').get(getThoughts).post(createThought)

// api/thoughts/:thoughtId
thoughtsRouter.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought)

export { thoughtsRouter }