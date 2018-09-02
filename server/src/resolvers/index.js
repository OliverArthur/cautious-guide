// Packages
const { GraphQLScalarType } = require('graphql')

// Querys
const { FolderQuery } = require('./Query/folder')
const { GroupQuery } = require('./Query/group')
const { TaskQuery } = require('./Query/task')
const { TeamQuery } = require('./Query/team')
const { UserQuery } = require('./Query/user')

// Mutations
const { FolderMutation } = require('./Mutation/folder')
const { GroupMutation } = require('./Mutation/group')
const { UserMutation } = require('./Mutation/user')
const { TaskMutation } = require('./Mutation/task')

module.exports = {
  Query: {
    ...FolderQuery,
    ...GroupQuery,
    ...TaskQuery,
    ...TeamQuery,
    ...UserQuery
  },
  Mutation: {
    ...FolderMutation,
    ...GroupMutation,
    ...TaskMutation,
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
