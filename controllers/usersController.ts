import { Thought, User } from '../models'
import { ObjectId } from 'mongoose'

import * as dayjs from 'dayjs'
import * as advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)


async function getUsers(req, res) {
    try {
        res.json(await User.find())
    } catch (err) {
        res.status(500).json(err)
    }
}

async function getUser(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.userId }).select('-userId').populate({ path: 'thoughts', select: '-userId' }).populate({ path: 'friends' })
        
        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
        }
        let data = {
            "thoughts": user['thoughts'],
            "friends": user['friends'],
            "_id": user['_id'],
            "username": user['username'],
            "email": user['email'],
            "friendCount": user['friendCount']
        }
        for (let thoughtIndex in data['thoughts']) {
            console.log(data['thoughts'][thoughtIndex]['createdAt'])
            data['thoughts'][thoughtIndex]['createdAt'] = dayjs(data['thoughts'][thoughtIndex]['createdAt']).format('MMM Do, YYYY [at] hh:mm a')
        }
        res.json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
// async function getThought(req, res) {
//     try {
//         const thought = await Thought.findOne({ id: req.params.thoughtId }).select('-__v')
//         if(thought) {
//             return res.status(404).json({ message: 'No thought with that ID' })
//         }
//         res.json(thought)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

async function createUser(req, res) {
    try {
        res.json(await User.create(req.body));
    } catch (err) {
        res.status(500).json(err)
    }
}

// async function createThought(req, res) {
//     try {
//         const thought = await Thought.create(req.body);
//         res.json(thought);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json(err);
//     }
//   }

async function deleteUser(req, res) {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId })
        if (user) {
            for (let thoughtId of user.thoughts) {
                let removedThought = await Thought.findOneAndDelete({ _id: thoughtId.toString() })
            }
            res.json({ message: "User and associated thoughts deleted!" })
        } else {
            return res.status(404).json({ message: "No user with that ID" })    
        }
    } catch (err) {
        return res.status(500).json(err)
    }



    // try {
    //     const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    //     if (!thought) {
    //         return res.status(404).json({ message: 'No thought with that ID' });
    //     }

    //     // await Student.deleteMany({ _id: { $in: course.students } });
    //     // res.json({ message: 'Course and students deleted!' });
    //     res.json({ message: "Thought deleted!" })
    // } catch (err) {
    //     res.status(500).json(err);
}

// async function deleteThought(req, res) {
//     try {
//         const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

//         if (!thought) {
//             return res.status(404).json({ message: 'No thought with that ID' });
//         }

//         // await Student.deleteMany({ _id: { $in: course.students } });
//         // res.json({ message: 'Course and students deleted!' });
//         res.json({ message: "Thought deleted!" })
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }

// async function updateThought(req, res) {
//     try {
//       const thought = await Thought.findOneAndUpdate(
//             { _id: req.params.courseId },
//             { $set: req.body },
//             { runValidators: true, new: true }
//       );

//       if (!thought) {
//         return res.status(404).json({ message: 'No course with this id!' });
//       }

//       res.json(thought);
//     } catch (err) {
//       res.status(500).json(err);
//     }
// }

export { getUsers, getUser, createUser, deleteUser
    // updateThought 
}