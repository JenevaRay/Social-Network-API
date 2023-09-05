import { Thought, User } from '../models'

async function getThoughts(req, res) {
  try {
    const thoughts = await Thought.find().populate({
      path: 'reactions',
      select: '-__v'
    })
    res.json(thoughts)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function getThought(req, res) {
  try {
    const thought = await Thought.findOne({
      _id: req.params.thoughtId
    }).populate({ path: 'reactions', select: '-__v' })
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' })
    }
    res.json(thought)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function createThought(req, res) {
  try {
    let user = await User.findOne({ username: req.body.username })
    if (user) {
      const thought = await Thought.create({
        ...req.body,
        userId: user._id.toString()
      })
      user = await User.findOneAndUpdate(
        { _id: user._id.toString() },
        {
          $push: { thoughts: thought['_id'].toString() }
        }
      )
      if (user) user.save()
      res.json(thought)
    } else {
      res.status(500).json({ message: 'User not found!' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

async function deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId
    })
    if (thought) {
      if (thought.userId) {
        await User.findOneAndUpdate(
          { _id: thought.userId.toString() },
          {
            $pull: { thoughts: thought['_id'] }
          }
        )
      }
      res.json({ message: 'Thought deleted!' })
    } else {
      return res.status(404).json({ message: 'No thought with that ID' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

async function updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.courseId },
      { $set: req.body },
      { runValidators: true, new: true }
    )

    if (!thought) {
      return res.status(404).json({ message: 'No course with this id!' })
    }

    res.json(thought)
  } catch (err) {
    res.status(500).json(err)
  }
}

export { getThoughts, getThought, createThought, deleteThought, updateThought }
