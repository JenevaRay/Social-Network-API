import { Thought } from '../models'
import { User } from '../models'

async function getReactions(req, res) {
  try {
    const thoughts = await Thought.find({
      reactions: { $exists: true, $ne: [] }
    })
    res.json(thoughts)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function getReaction(req, res) {
  try {
    const thought = await Thought.findOne(
      { reactions: { $exists: true, $ne: [] } },
      { reactions: { $elemMatch: { _id: req.params.reactionId } } }
    )
    res.json(thought)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function createReaction(req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
    const user = await User.findOne({ username: req.body.username })
    const reaction = req.body.reactionBody
    if (user && thought && reaction) {
      thought.reactions.push({ ...req.body, userId: user._id.toString() })
      thought.save()
      res.json(thought)
    } else {
      if (!user) res.status(500).json({ message: 'User not found!' })
      if (!thought) res.status(500).json({ message: 'Thought not found!' })
      if (!reaction) res.status(500).json({ message: 'reactionBody not found!' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

async function deleteReaction(req, res) {
  try {
    const thoughtByReaction = await Thought.findOneAndUpdate(
      { 'reactions._id': req.params.reactionId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    )
    if (thoughtByReaction) {
      res.json(thoughtByReaction)
    } else {
      res.status(404).json({ message: 'Reaction not found!' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

async function updateReaction(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username })
    const thoughtByReaction = await Thought.findOne({
      'reactions._id': req.params.reactionId
    })
    const { reactionBody } = req.body
    if (thoughtByReaction && user && reactionBody) {
      for (const reaction in thoughtByReaction.reactions) {
        if (
          thoughtByReaction.reactions[reaction]._id == req.params.reactionId
        ) {
          thoughtByReaction.reactions[reaction].reactionBody = reactionBody
        }
      }
      thoughtByReaction.save()
      res.json(thoughtByReaction)
    } else if (!thoughtByReaction) {
      res.status(404).json({ message: 'No match with this reaction _id' })
    } else if (!user) {
      res.status(404).json({ message: 'No match with this username' })
    } else if (!reactionBody) {
      res.status(500).json({ message: 'Malformatted update!' })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  getReactions,
  createReaction,
  getReaction,
  updateReaction,
  deleteReaction
}
