const env = require('dotenv').config({ path: '../.env' }).parsed
import * as express from 'express'
import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'
import { PrismaClient } from '@prisma/client'

const history = require('connect-history-api-fallback')
const prisma = new PrismaClient()
const web = express()
const syncBot = require('./syncBot')

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

const api = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

let options = {
  port: env.API_PORT,
  endpoint: '/'
}

// CRON
// setInterval(async () => {
//   console.log('cron')
//   const bots = await prisma.user.findMany({where: {role: 'ROBOT'}})
//   await bots.map(async (bot) => {
//     await syncBot(bot, prisma)
//   })
// }, env.CRON_MIN_INTERVAL*60*1000)

api.listen(options).then(() => {
  console.log('\x1b[32m%s\x1b[0m', '●', 'api running on : http://localhost:'+env.API_PORT)
})

web.use(history())
web.use(express.static('../front/dist'))
web.listen(parseInt(process.env.WEB_PORT), () => {
  console.log('\x1b[32m%s\x1b[0m', '●', 'web running on http://localhost:'+env.WEB_PORT)
})
