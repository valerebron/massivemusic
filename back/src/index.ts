import { ApolloServer } from 'apollo-server'
import { typeDefs } from '../generated/prisma-client/prisma-schema'
import { prisma } from '../generated/prisma-client'

const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  }
})

server
  .listen({
    port: 8383
  })
  .then(info => console.log('Server started on http://localhost:8383'))