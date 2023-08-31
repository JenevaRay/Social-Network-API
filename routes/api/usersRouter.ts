import { Router } from 'express'
const usersRouter = Router()

import { getUsers, getUser, createUser, deleteUser } from '../../controllers/usersController'
// import { getThoughts, createThought, getThought, updateThought, deleteThought } from '../../controllers/thoughtsController'

// /api/thoughts
usersRouter.route('/').get(getUsers).post(createUser)

// /api/users/:userId
usersRouter.route('/:userId').get(getUser).delete(deleteUser)

// api/thoughts/:thoughtId
// thoughtsRouter.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought)
// thoughtsRouter.route('/:thoughtId').get().put().delete()

export { usersRouter }