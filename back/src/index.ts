const config = require ('../../config.json')

import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const Query = require('./resolvers/Query')
const User = require('./resolvers/User')
const Track = require('./resolvers/Track')
const Mutation = require('./resolvers/Mutation')
const typeDefs = importSchema('./src/schema.graphql')

const resolvers = {
  Query,
  User,
  Track,
  Mutation,
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

let options = { port: config.nodePort, endpoint: '/' }

server.listen(options).then(() => {
  console.log('\x1b[32m%s\x1b[0m', '●', 'api running on http://localhost:'+config.nodePort)
})
