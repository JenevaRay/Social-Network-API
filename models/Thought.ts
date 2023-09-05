import { Schema, model } from 'mongoose'
import * as dayjs from 'dayjs'
import * as advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

import { reactionSchema } from './Reaction'

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      max: 128,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => dayjs(date).format('MMM Do, YYYY [at] hh:mm a')
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      select: false,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    },
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
)

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
})

const Thought = model('thought', thoughtSchema)

export { Thought, thoughtSchema }
