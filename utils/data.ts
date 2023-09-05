const thoughts = [
  {
    userId: '5edff367a0fcb779aa7b118c',
    username: 'lernantino',
    thoughtText: "Here's a cool thought...",
    reactions: []
  },
  {
    userId: '5edff367a0fcb779aa7b118b',
    username: 'Amiko',
    thoughtText: 'thoughts are the words of our minds',
    reactions: []
  }
]

const users = [
  {
    username: 'Amiko',
    email: 'amiko@gmail.com',
    friends: [],
    thoughts: []
  },
  {
    username: 'lernantino',
    email: 'lernantino@gmail.com',
    friends: ['5edff367a0fcb779aa7b118c'],
    thoughts: ['5edff3a9a0fcb779aa7b118d']
  }
]

export { thoughts, users }
