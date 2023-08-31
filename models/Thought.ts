import { Schema, model } from 'mongoose'
import * as dayjs from 'dayjs'
import * as advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)


const thoughtSchema = new Schema(
    {
        // _id: Schema.Types.ObjectId,
        thoughtText: {
            type: String,
            max: 128,
            required: true
        },
        createdAt: {
            type: Date,
            get: (date) => dayjs(date).format('MMM Do, YYYY [at] hh:mm a') 
        },
        // createdAt: {
        //     type: Date,
        //     default: Date.now(),
        //     // get: function(value) {
        //     //     return dayjs(value).format('MMM Do, YYYY [at] hh:mm a')
        //     // }
        // },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                type: String
                // type: Schema.Types.ObjectId,
                // ref: 'Reactions'
            }
        ],
        // updatedAt: <any> {
        //     type: Date,
        //     required: true
        // },
        // createdAt: <any> {
        //     type: Date,
        //     required: true
        // }
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

// thoughtSchema.pre('save', function(next) {
//     const now = new Date()
//     this.updatedAt = now
//     if (!this.createdAt) {
//         this.createdAt = now
//     }
//     next()
// })



thoughtSchema.virtual('reactionCount')
    .get(function(){
        return this.reactions.length
    })

// thoughtSchema.get('createdAt')

const Thought = model('thought', thoughtSchema)

export { Thought, thoughtSchema }