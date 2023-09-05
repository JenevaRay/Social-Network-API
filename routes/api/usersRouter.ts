import { Router } from 'express'
const usersRouter = Router()

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} from '../../controllers/usersController'

// /api/thoughts
usersRouter.route('/').get(getUsers).post(createUser)

// /api/users/:userId
usersRouter.route('/:userId').put(updateUser).get(getUser).delete(deleteUser)

// /api/users/:userId/friends/:friendId
usersRouter
  .route('/:userId/friends/:friendId')
  .delete(deleteFriend)
  .post(addFriend)

export { usersRouter }
