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
        createdAt: 'desc',
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
      orArray.push({ duration: { lte: 60 } })
      orArray.push({ duration: { gte: 420 } })
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
      orderBy: { createdAt: 'desc' },
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
    videos.tracks.forEach(function(video, index) {
      if(video.duration > 480 || video.duration < 60) {
        videos.tracks.splice(index, 1)
      }
      else {
        video.title = cleanTitle(video.title)
      }
    })
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
  getContacts: async (parent, args, context, info) => {
    const admin = await context.prisma.user.findFirst({ where: { role: 'ADMIN' } })
    if(args.token === admin.token) {
      return await context.prisma.user.findMany({
        where: {
          role: 'USER'
        },
      })
    }
  },
  sendMail: async (parent, args, context, info) => {
    const admin = await context.prisma.user.findFirst({ where: { role: 'ADMIN' } })
    if(args.token === admin.token) {
      console.log(args.to)
      if(args.to === 'all@massivemusic.fr') {
        const users = await context.prisma.user.findMany({
          where: {
            role: 'USER'
          },
          select: [
            'id',
            'name',
            'email',
          ],
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
