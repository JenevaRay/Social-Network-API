![License: MIT](https://img.shields.io/badge/License:_MIT-grey.svg?style=plastic&color=blue)

# Social Network API v2
## Description
This is a social network API that gives a place for people to post threads, react on the thread, manage their appearance (like their username), and even deletion functionality.
- I wanted to make a good social network API where the use case more closely matches the real world.  I.e. befriending someone is a two way thing!
- I learned how to use Mongoose better, exhibiting advanced functionality like deep query updates,  subdocuments, virtuals, and even atomic updates.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [Contribute](#contribute)
- [Tests](#tests)

## Installation
- `git clone git@github.com:JenevaRay/Social-Network-API.git`
- `cd Social-Network-API`
- `npm install`
- create/edit `.env` to add a MONGODB_URI
- (optional) seed data with `npm run seed`
- `npm start`
- run an API tool like `Insomnia` to query the software.

## Usage
- Run `npx ts-node index.ts` to run the Social Network API

[![Video of software in use.](https://drive.google.com/file/d/1E8ZZG61G3SWgCJjiKte4rkqAzsEhktRL/view?usp=drive_link)](https://drive.google.com/file/d/1E8ZZG61G3SWgCJjiKte4rkqAzsEhktRL/view?usp=drive_link)
## Credits
- I made extensive use of Mongoose's documentation at https://mongoosejs.com/docs/
## License
[MIT License *file*](LICENSE)

https://opensource.org/licenses/mit
## Features
Fully developed in TypeScript.
Added extensive functionality to manage reactions.
Added features to manage deep deletion of a user (including removing reactions).
Added features to mutually befriend someone

## API Routes
`HOST`/api/users
- `get`
- `post` : { "username": "demo_user", "email": "demo_user@nowhere.net" }

`HOST`/api/users/USERID
- `get`
- `put` : { "username": "demo_user", "email": "demo_user@nowhere.net" }
- `delete`

`HOST`/api/users/USERID/friends/FRIENDID
- `post`
- `delete`

`HOST`/api/thoughts
- `get`
- `post` : { "thoughtText": "Topic words go here", "username": "demo_user" }

`HOST`/api/thoughts/THOUGHTID
- `get`
- `put` { "thoughtText": "Words go here" }
- `delete`

`HOST`/api/reactions
- `get`

`HOST`/api/reactions/thought/THOUGHTID
- `post`

`HOST`/api/reactions/REACTIONID
- `get`
- `put`
- `delete`

## Contributing
Email me at JenevaRay@gmail.com with a Git push request.

## Questions
My GitHub profile: https://github.com/JenevaRay

Please feel free to contact me via Email at JenevaRay@gmail.com
