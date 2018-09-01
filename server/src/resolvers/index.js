// Packages
const { GraphQLScalarType } = require('graphql')

// Querys
const { FolderQuery } = require('./Query/folder')
const { GroupQuery } = require('./Query/group')
const { TeamQuery } = require('./Query/Team')
const { UserQuery } = require('./Query/user')

// Mutations
const { FolderMutation } = require('./Mutation/folder')
const { GroupMutation } = require('./Mutation/group')
const { UserMutation } = require('./Mutation/user')

module.exports = {
  Query: {
    ...FolderQuery,
    ...GroupQuery,
    ...TeamQuery,
    ...UserQuery
  },
  Mutation: {
    ...FolderMutation,
    ...GroupMutation,
    ...UserMutation
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: (value) => moment(value).toDate(),
    serialize: (value) => value.getTime(),
    parseLiteral: (ast) => ast
  })
}
