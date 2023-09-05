import { Schema, model } from 'mongoose'
import * as dayjs from 'dayjs'
import * as advancedFormat from 'dayjs/plugin/advancedFormat'
import { ObjectId } from 'mongodb'
dayjs.extend(advancedFormat)


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            required: true,
            default: new ObjectId()
        },
        reactionBody: {
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
    }, {
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

// const Reaction = model('reaction', reactionSchema)

export { reactionSchema }