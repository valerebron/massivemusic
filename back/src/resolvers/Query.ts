const env = require('dotenv').config({ path: '../.env' }).parsed
const usetube = require('usetube')
const mail = require('../mail/mail')
const cleanTitle = require('../cleantitle')

module.exports = {
  styles: async (parent, args, context, info) => {
    console.log('styles query')
    return await context.prisma.style.findMany()
  },
  users: async (parent, args, context, info) => {
    console.log('users query')
    let where = {}
    if(args.role) {
      console.log('with role ', args.role)
      where = {
        role: args.role
      }
    }
    let users = await context.prisma.user.findMany({
      where: where,
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return users
  },
  user: async (parent, args, context, info) => {
    console.log('user query')
    let user = await context.prisma.user.findOne({
      where: {
        id: args.user_id
      }
    })
    return user
  },
  tracks: async (parent, args, context, info) => {

    // AND
    let andArray = []

    if(args.style) {
      andArray.push({ style: args.style })
    }
    if(args.user) {
      andArray.push({ user: args.user })
    }
    if(args.pending) {
      andArray.push({ pending: true })
    }
    else {
      andArray.push({ pending: false })
    }
    if(args.invalid) {
      andArray.push({ invalid: true })
    }
    else {
      andArray.push({ invalid: false })
    }

    // OR
    let orArray = []

    if(args.search) {
      orArray.push({ title: { contains: args.search.trim() } })
      orArray.push({ artist: { contains: args.search.trim() } })
    }
    if(args.empty) {
      orArray.push({ artist: '' })
      orArray.push({ title: '' })
    }
    if(args.duration) {
      orArray.push({ duration: { lte: parseInt(env.TRACK_MIN_DURATION) } })
      orArray.push({ duration: { gte: parseInt(env.TRACK_MAX_DURATION) } })
    }

    let where = {}

    if(orArray.length && andArray.length) {
      where = {
        OR: orArray,
        AND: andArray,
      }
    }
    else if(orArray.length && !andArray.length) {
      where = {
        OR: orArray,
      }
    }
    else if(!orArray.length && andArray.length) {
      where = {
        AND: andArray,
      }
    }
    else if(!orArray.length && !andArray.length) {
      where = {}
    }

    const tracks = await context.prisma.track.findMany({
      skip: args.skip,
      take: args.first,
      where,
      orderBy: { createdAt: args.orderDirection },
    })

    const count = await context.prisma.track.count({where})

    return {
      tracks,
      count,
    }
  },
  searchTrack: async (parent, args, context, info) => {
    console.log('search tracks '+args.search)
    let videos = await usetube.searchVideo(args.search, args.token)
    videos.tracks = videos.tracks.filter(video => video.duration < parseInt(env.TRACK_MAX_DURATION) || video.duration > parseInt(env.TRACK_MIN_DURATION))
    videos.tracks.forEach((video) => { video.title = cleanTitle(video.title) } )
    return videos
  },
  searchChannel: async (parent, args, context, info) => {
    console.log('search channels '+args.search)
    return await usetube.searchChannel(args.search)
  },
  getChannelDesc: async (parent, args, context, info) => {
    console.log('youtube channel desc query')
    return await usetube.getChannelDesc(args.id)
  },
  getMails: async (parent, args, context, info) => {
    const admin = await context.prisma.user.findFirst({ where: { role: 'ADMIN' } })
    if(args.token === admin.token) {
      const mails = await context.prisma.mail.findMany({ orderBy: [{ createdAt: 'desc' }] })
      const contacts = await context.prisma.user.findMany({
        where: {
          role: 'USER'
        },
        orderBy: [{
          name: 'asc',
        }],
      })
      return { mails, contacts }
    }
    else { console.log('bad token for getmails') }
  },
  sendMail: async (parent, args, context, info) => {
    const admin = await context.prisma.user.findFirst({ where: { role: 'ADMIN' } })
    if(args.token === admin.token) {
      await context.prisma.mail.create({
        data: {
          subject: args.subject,
          content: args.content,
          to: args.to,
        },
      })
      if(args.to === 'all@massivemusic.fr') {
        const users = await context.prisma.user.findMany({
          where: {
            role: 'USER'
          }
        })
        for(let i = 0; i < users.length; i++) {
          await mail.send(users[i].email, args.subject, args.content, users[i].name, function(err, info) {
            console.log('\x1b[34m%s\x1b[0m', '●', 'send mail for: '+users[i].email)
          })
        }
        return 'sended'
      }
      else {
        mail.send(args.to, args.subject, args.content, args.name, function(err, info) {
          console.log('\x1b[34m%s\x1b[0m', '●', 'send mail for: '+args.to)
          return 'sended'
        })
      }
    }
    else {
      return 'not admin'
    }
  },
}
