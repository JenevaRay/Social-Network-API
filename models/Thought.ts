import { Schema, model } from 'mongoose'

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
            default: Date.now(),
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


const Thought = model('thought', thoughtSchema)

export { Thought }