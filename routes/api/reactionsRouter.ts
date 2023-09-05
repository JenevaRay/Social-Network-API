import { Router } from 'express'
const reactionsRouter = Router()

import { 
    getReactions, createReaction, getReaction, updateReaction, deleteReaction 
} from '../../controllers/reactionsController'

// /api/reactions
reactionsRouter.route('/').get(getReactions)

// /api/reactions/thought/:thoughtId
reactionsRouter.route('/thought/:thoughtId').post(createReaction)

// api/reactions/:reactionId
reactionsRouter.route('/:reactionId').get(getReaction).put(updateReaction).delete(deleteReaction)

export { reactionsRouter }