import { Thought, User } from '../models'
import mongoose from 'mongoose'
export const ObjectId = mongoose.Types.ObjectId

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
    const user = await User.findOne({ _id: req.params.userId })
      .select('-userId')
      .populate({
        path: 'thoughts',
        select: '-userId',
        populate: { path: 'reactions' }
      })
      .populate({ path: 'friends' })
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' })
    }
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function createUser(req, res) {
  try {
    if (req.body.username && req.body.email) {
      res.json(await User.create(req.body))
    } else {
      return res.status(400).json({
        message: 'Please format like structure',
        structure: {
          username: 'uniqueusername',
          email: 'uniqueemail@address.net'
        }
      })
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

async function updateUser(req, res) {
  const { username, email } = req.body
  const body = {}
  if (username) body['username'] = username
  if (email) body['email'] = email
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: body },
      { runValidators: true, new: true }
    )
    if (!user) {
      return res.status(404).json({ message: 'No user with this ID!' })
    }
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function deleteUser(req, res) {
  // ✅ Exceeds format, deletes all reactions by the user too
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId })
    if (user) {
      for (const thoughtId of user.thoughts) {
        await Thought.findOneAndDelete({ _id: thoughtId.toString() })
      }
      await Thought.updateMany(
        { 'reactions.userId': req.params.userId },
        { $pull: { reactions: { userId: req.params.userId } } },
        { new: true }
      )
      res.json({
        message: 'User, associated thoughts, and associated reactions deleted!'
      })
    } else {
      return res.status(404).json({ message: 'No user with that ID' })
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}

async function addFriend(req, res) {
  // ✅ Exceeds format, adds friend to both the friend and the user
  const { userId, friendId } = req.params
  try {
    const user = await User.findOne({ _id: userId })
    const friend = await User.findOne({ _id: friendId })
    if (!user || !friend) {
      return res
        .status(500)
        .json({ message: 'No match of users with given IDs!' })
    } else {
      user.friends.push(friendId)
      user.save()
      friend.friends.push(userId)
      friend.save()
      res.json(user)
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}

async function deleteFriend(req, res) {
  // ✅ Exceeds format, deletes friend to both the friend and the user
  const { userId, friendId } = req.params
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      { new: true }
    )
    if (!user) {
      return res.status(500).json({ message: 'No user with that ID!' })
    } else {
      await User.findOneAndUpdate(
        { _id: new ObjectId(friendId) },
        { $pull: { friends: userId } }
      )
      res.json(user)
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}

export {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
}
