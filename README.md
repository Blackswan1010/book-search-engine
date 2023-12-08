# Book Search Engine 

![License: MIT](https://img.shields.io/badge/MIT-blue.svg) 

## Description 

Refactoring Book Search Engine's REST API with GraphQL API 

Deploy Link: [https://radiant-wildwood-57972-e3ce85227e45.herokuapp.com/](https://radiant-wildwood-57972-e3ce85227e45.herokuapp.com/)
Currently works locally, working to fix the deploy.

## Installation 

To start this application, clone this repo to your machine and open it in your visual code editor. Then in the terminal enter "npm run develop".

## Sample GraphQL Code 

# Backend
```js
const resolvers= {
    Query: {
        me:  async (parent, { username }) => {
            return User.findOne({ username: username }).populate('savedBooks');
          },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });     
            if (!user) {
                throw AuthenticationError;
            }
```
A Query resolver that takes a username as an argument. Then using that to find the user in the database with the user's saved books. The other is a Mutation resolver that takes an email and password as an argument. Then if the provided email isn't found, it throws an authentication error. If successful, then the user is logged in.

```js
const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Books]!
    bookCount: Int
  }

  type Books {
    bookId: ID
    description: String
    image: String
    link: String
    title: String
    authors: [String]
  }
```
The User and Books defined here are schema definitions which allows how clients can request data.

```js
const { GraphQLError } = require('graphql');

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
```
The GraphQLError constructor with the first argument provides an error description for the user. While the second argument contains useful error details within the extensions object for the client to handle.

# FrontEnd



## Author Info 

#### Anthony

* [https://github.com/Blackswan1010](https://github.com/Blackswan1010) 


## License

 https://api.github.com/licenses/MIT 


