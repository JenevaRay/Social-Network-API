import { Thought } from '../models'
import { User } from '../models'

// note: there's probably cleaner ways to do date formatting within mongoose, but that proved to be very time consuming, so I opted for quick-and-dirty.
// this is why you'll see only the createdAt field being altered in the responses.

async function getThoughts(req, res) {
    try {
        const thoughts = await Thought.find()
        res.json(thoughts)
    } catch (err) {
        res.status(500).json(err)
    }
}

async function getThought(req, res) {
    try {
        // console.log(req.params.thoughtId)
        const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-userId')
        // .select('-__v')
        if(!thought) {
            return res.status(404).json({ message: 'No thought with that ID' })
        }
        res.json(thought)
    } catch (err) {
        res.status(500).json(err)
    }
}

async function createThought(req, res) {
    console.log(req.body)
    try {
        let user = await User.findOne({ username: req.body.username })
        if (user) {
            console.log(user._id.toString())
            const thought = await Thought.create({...req.body, userId: user._id.toString()})
            await User.findOneAndUpdate({ _id: user._id.toString() }, {
                $push: { thoughts: thought['_id'].toString() }
            })
            res.json(thought)                    
        } else {
            res.status(500).json({ message: "User not found!" })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

async function deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        await User.findOneAndUpdate({ _id: thought.userId.toString() }, {
            $pull: { thoughts: thought['_id'] }
        })
        res.json({ message: "Thought deleted!" })
    } catch (err) {
        res.status(500).json(err);
    }
}

async function updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
            { _id: req.params.courseId },
            { $set: req.body },
            { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No course with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
}

export { getThoughts, getThought, createThought, deleteThought, updateThought }