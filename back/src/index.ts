const env = require('dotenv').config({ path: '../.env' }).parsed
import * as express from 'express'
import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'
import { PrismaClient } from '@prisma/client'

const history = require('connect-history-api-fallback')
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

const prisma = new PrismaClient()
const api = new ApolloServer({
	cors: {
		origin: '*',
		credentials: true
  },	
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

api.listen(options).then(() => {
  console.log('\x1b[32m%s\x1b[0m', '●', 'api running on : http://localhost:'+env.API_PORT)
})

web.use(history())
web.use(express.static('../front/dist'))
web.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
web.listen(parseInt(process.env.WEB_PORT), () => {
  console.log('\x1b[32m%s\x1b[0m', '●', 'web running on http://localhost:'+env.WEB_PORT)
})

// CRON
// setInterval(async () => {
//   console.log('cron')
//   const bots = await prisma.user.findMany({where: {role: 'ROBOT'}})
//   await bots.map(async (bot) => {
//     await syncBot(bot, { prisma, pubsub })
//   })
// }, env.CRON_MIN_INTERVAL*60*1000)
