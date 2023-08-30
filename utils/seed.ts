import { connection } from '../config/connection';
import { thoughts, users } from './data'
import { Thought, User } from '../models'


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected')
    await User.deleteMany({})
    await Thought.deleteMany({})
    await User.collection.insertMany(users)
    await Thought.collection.insertMany(thoughts)

    console.info('Seeding complete! 🌱')
    connection.close()
});
