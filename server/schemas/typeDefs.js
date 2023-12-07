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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me(username: String!): User
  }

  input BookData {
    bookId: ID
    description: String
    image: String
    link: String
    title: String
    authors: [String]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookToSave: BookData!, username: String!): User
    removeBook(bookId: ID!, username: String!): User
  }
`;

module.exports = typeDefs;