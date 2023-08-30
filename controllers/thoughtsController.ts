import { Thought } from '../models'

async function getThoughts(req, res) {
    try {
        const thoughts = await Thought
        // TODO: add count: { $sum: X }
        // .aggregate([
        //     // { },
        //     // { $unwind: '$reactions' },
        //     // { $group: {
        //     //     _id: null,
        //     //     reactionCount: { $count: '$reactions'}
        //     // }}
        // ])
        .find()
        res.json(thoughts)
    } catch (err) {
        res.status(500).json(err)
    }
}

async function getThought(req, res) {
    try {
        // console.log(req.params.thoughtId)
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
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
    try {
        const thought = await Thought.create(req.body);
        res.json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
  }

async function deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        // await Student.deleteMany({ _id: { $in: course.students } });
        // res.json({ message: 'Course and students deleted!' });
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