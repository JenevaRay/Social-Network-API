import { Schema, model } from 'mongoose'

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
            trim: true,
            // !!!WARNING!!! this validator allows for unfiltered email addresses, including punycode DNSes and IPv6
            match: /.+@.+(\.|:).+/
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ],
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
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

userSchema.virtual('friendCount')
    .get(function() {
        return this.friends.length
    })

const User = model('user', userSchema)

export { User }