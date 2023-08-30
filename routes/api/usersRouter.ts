import { Router } from 'express'
const usersRouter = Router()

import { getUsers } from '../../controllers/usersController'
// import { getThoughts, createThought, getThought, updateThought, deleteThought } from '../../controllers/thoughtsController'

// /api/thoughts
usersRouter.route('/').get(getUsers)
// .post(createThought)

// api/thoughts/:thoughtId
// thoughtsRouter.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought)
// thoughtsRouter.route('/:thoughtId').get().put().delete()

export { usersRouter }