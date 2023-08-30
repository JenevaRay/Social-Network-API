import { Schema, model } from 'mongoose'

interface User {
    // _id?: Schema.Types.ObjectId
}

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // !!!WARNING!!! this validator allows for unfiltered email addresses, including punycode DNSes and IPv6
            match: /.+@.+(\.|:).+/
        },
        friends: [
            {
                // type: String,
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ]
    }, {
        timestamps: false,
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

userSchema.virtual('friendCount')
    .get(function(){
        return this.friends.length
    })

const User = model('user', userSchema)

export { User }