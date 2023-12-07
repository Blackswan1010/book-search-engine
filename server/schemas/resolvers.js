const { Book, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, { username }) => {
            return User.findOne({ username: username }).populate('savedBooks');
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });     
            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookToSave, username}) => {
            return User.findOneAndUpdate(
                { username: username },
                { $addToSet: { savedBooks: bookToSave }},
                { new: true, }
            );
        },
        removeBook: async (parent, { bookId, username }) => {
            return User.findOneAndUpdate(
                { username: username},
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
        },
    }
};

module.exports = resolvers;