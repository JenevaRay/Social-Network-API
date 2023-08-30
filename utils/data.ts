const usernames = [
    'Amiko',
    'lernantino'
];

const thoughts = [
    {
        'username': 'lernantino',
        'thoughtText': 'Here\'s a cool thought...',
        'reactions': []
    },
    {
        'username': 'Amiko',
        'thoughtText': 'thoughts are the words of our minds',
        'reactions': []
    }
  ];

const users = [
    {
        // '_id': '5edff367a0fcb779aa7b118c',
        'username': 'Amiko',
        'email': 'amiko@gmail.com',
        'friends': [],
        'thoughts': []
    },
    {
        // '_id': '5edff358a0fcb779aa7b118b',
        'username': 'lernantino',
        'email': 'lernantino@gmail.com',
        'friends': [
            '5edff367a0fcb779aa7b118c'
        ],
        'thoughts': [
            '5edff3a9a0fcb779aa7b118d'
        ]
    }
]

export { thoughts, users }
