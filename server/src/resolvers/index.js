// Packages
const { GraphQLScalarType } = require('graphql')

// Querys
const { FolderQuery } = require('../folder/folder.query')
const { GroupQuery } = require('../group/group.query')
const { TaskQuery } = require('../task/task.query')
const { TeamQuery } = require('../team/team.query')
const { UserQuery } = require('../user/user.query')

// Mutations
const { FolderMutation } = require('../folder/folder.mutation')
const { GroupMutation } = require('../group/group.mutation')
const { UserMutation } = require('../user/user.mutation')
const { TaskMutation } = require('../task/task.mutation')

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
