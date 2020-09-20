const env = require('dotenv').config({ path: '../.env' }).parsed
const got = require('got')
const crypto = require('crypto')
const moment = require('moment')
import * as youtube from '../crawler/youtube'

export async function signup(parent, args, context, info) {
  const token = crypto.randomBytes(64).toString('hex')
  const user  = await context.prisma.user.create({
    data: {
      name: args.name,
      email: args.email,
      password: args.hash,
      role: 'USER',
      token: token,
    },
  })

  console.log('\x1b[34m%s\x1b[0m', '●', 'new user: '+user.name)

  return {token, user}
}

export async function login(parent, args, context, info) {
  let user = await context.prisma.user.findMany({
    where: {
      OR: [
        { email: args.credential },
        { name: args.credential },
      ],
    },
  })

  user = user[0]

  if(!user) {
    console.log('\x1b[31m%s\x1b[0m', '●', 'user not found')
    throw new Error('user not found')
  }
  if(args.hash !== user.password) {
    console.log('\x1b[31m%s\x1b[0m', '●', 'invalid password')
    throw new Error('invalid password')
  }

  const token = crypto.randomBytes(64).toString('hex')
  user = await context.prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      token: token,
    },
  })
  console.log('\x1b[34m%s\x1b[0m', '●', '['+Date.now()+'] '+user.name+' logged-in')
  return {token, user}
}

export async function logout(parent, args, context, info) {

  let user = await context.prisma.user.findOne({ where: { id: args.user_id } })
  const name = user.name
  if(args.token === user.token) {
    user = context.prisma.user.update({
      data: {
        token: '',
      },
      where: {
        id: args.user_id,
      },
    })
    
    console.log('\x1b[34m%s\x1b[0m', '●', '['+Date.now()+'] '+name+' logout')

    return user
  }
  else {
    throw new Error('invalid token')
  }
}

export async function editUser(parent, args, context, info) {
  const user = await context.prisma.user.findOne({ where: { id: args.id } })
  const admin = await context.prisma.user.findOne({ where: { id: 1 } })
  if(args.token === user.token || args.token === admin.token) {
    console.log('\x1b[34m%s\x1b[0m', '●', ' edit user '+args.id)
    return context.prisma.user.update({
      where: { id: args.id },
      data: {
        Style: {
          connect: { id: args.channel_style },
        },
        channel_enable_tracks: args.channel_enable_tracks,
        channel_description: args.channel_description,
      },
    }).catch(error=>{
      console.log(error)
    })
  }
  else {
    throw new Error('invalid token')
  }
}

export async function dropUser(parent, args, context, info) {
  const admin = await context.prisma.user.findOne({ where: { id: 1 } })
  if(args.token === admin.token) {
    console.log('\x1b[34m%s\x1b[0m', '●', ' remove user '+args.id)
    return context.prisma.user.delete({ where: { id: args.id } })
  }
  else {
    throw new Error('invalid token')
  }
}

export async function addBot(parent, args, context, info) {
  const admin = await context.prisma.user.findOne({ where: { id: 1 } })
  if(args.token === admin.token) {
    let channel_style = args.channel_style
    delete args.channel_style
    console.log('\x1b[34m%s\x1b[0m', '●', 'new user: '+args.name)
    return context.prisma.user.create({
      data: {
        Style: {
          connect: { id: channel_style },
        },
        ...args,
        password: 'ecc19b2704c51d6ac273ff4d9e9c0cb2e6916370',
        role: 'ROBOT',
      },
    }).catch(error=>{
      console.log(error)
    })
  }
  else {
    throw new Error('invalid token')
  }
}

export async function syncBot(parent, args, context, info) {
  const admin = await context.prisma.user.findOne({ where: { id: 1 } })
  const bot = await context.prisma.user.findOne({ where: { id: args.id }})
  if(args.token === admin.token || args.token === bot.token) {
    console.log('\x1b[34m%s\x1b[0m', '●', 'sync channel '+bot.name)
    var tracks = []
    // 1 FIRST SCAN
    if(bot.channel_last_sync_date === null) {
      console.log('first Sync')
      tracks = await youtube.getChannelVideos(bot.channel_id)
    }
    // 2 UPDATE SCAN
    else {
      console.log('update Sync')
      tracks = await youtube.getChannelVideos(bot.channel_id, bot.channel_last_sync_date)
    }
    console.log('total tracks: '+tracks.length)

    // 4 SAVE TRACKS TO BDD
    if(tracks.length > 0) {
      const createManyTracks = tracks.map((track) =>
      context.prisma.track.create({
          data: {
            yt_id: track.id,
            title: track.title,
            artist: track.artist,
            duration: track.duration,
            Style: {
              connect: { id: bot.channel_style },
            },
            User: {
              connect: { id: bot.id },
            },
            pending: !bot.channel_enable_tracks,
            invalid: false,
            createdAt: track.publishedAt,
          },
        }),
      )
      return Promise.all(createManyTracks).then(async (res) => {
        await context.prisma.user.update({
          where: { id: bot.id },
          data: {
            channel_last_sync_date: moment().toDate(),
          },
        }).catch(error=>{
          console.log(error)
        })
        return res
      })
    }
    else {
      return tracks
    }
  }
}

export async function post(parent, args, context, info) {
  const user = await context.prisma.user.findOne( { where: { id: args.user_id } })
  if(args.token === user.token) {
    console.log('\x1b[34m%s\x1b[0m', '●', user.name+' add a new track:  '+args.title+' - '+args.artist)
    return context.prisma.track.create({
      data: {
        yt_id: args.yt_id,
        title: args.title,
        artist: args.artist,
        duration: args.duration,
        Style: {
          connect: { id: args.style },
        },
        User: {
          connect: { id: args.user_id },
        },
        pending: true,
        invalid: false,
      },
    })
  }
  else {
    throw new Error('invalid token')
  }
}

export async function editPost(parent, args, context, info) {
  const user = await context.prisma.user.findOne({ where: { id: args.user_id } })
  const admin = await context.prisma.user.findOne({ where: { id: 1 } })
  console.log('user.token : '+user.token)
  console.log('args.token : '+args.token)
  if(args.token === user.token || args.token === admin.token) {
    const track_user = await context.prisma.track.findOne({ where: { id: args.id } }).User()
    if(track_user || user.role === 'ADMIN') {
      if(track_user.id === user.id || user.role === 'ADMIN') {
        console.log('\x1b[34m%s\x1b[0m', '●', track_user.name+' edit ['+args.title+']')
        return context.prisma.track.update({
          where: { id: args.id },
          data: {
            yt_id: args.yt_id,
            title: args.title,
            artist: args.artist,
            Style: {
              connect: { id: args.style },
            },
          },
        })
      }
      else {
        throw new Error('not your track')
      }
    }
    else {
      throw new Error('track does not exist')
    }
  }
  else {
    throw new Error('invalid token')
  }
}

export async function dropPost(parent, args, context, info) {
  const user = await context.prisma.user.findOne({ where: { id: args.user_id } })
  if(args.token === user.token) {
    const track_user = await context.prisma.track.findOne({ where: { id: args.id } }).User()
    if(track_user || user.role === 'ADMIN') {
      if(track_user.id === user.id || user.role === 'ADMIN') {
        console.log('\x1b[34m%s\x1b[0m', '●', track_user.name+' remove ['+args.title+']')
        return context.prisma.track.delete({ where: { id: args.id } })
      }
      else {
        throw new Error('not your track')
      }
    }
    else {
      throw new Error('track does not exist')
    }
  }
  else {
    throw new Error('invalid token')
  }
}

export async function validatePost(parent, args, context, info) {
  const user = await context.prisma.user.findOne({ where: { id: args.user_id } })
  if(args.token === user.token) {
    const track_user = await context.prisma.track.findOne({ where: { id: args.id } }).User()
    if(track_user || user.role === 'ADMIN') {
      if(track_user.id === user.id || user.role === 'ADMIN') {
        console.log('\x1b[34m%s\x1b[0m', '●', track_user.name+' validate ['+args.title+']')
        return context.prisma.track.update({
          where: { id: args.id },
          data: {
            pending: false,
            invalid: false,
          },
        })
      }
      else {
        throw new Error('not your track')
      }
    }
    else {
      throw new Error('track does not exist')
    }
  }
  else {
    throw new Error('invalid token')
  }
}

export async function validateAllPending(parent, args, context, info) {
  const user = await context.prisma.user.findOne({ where: { id: args.user_id } })
  if(args.token === user.token && user.role === 'ADMIN') {
    console.log('\x1b[34m%s\x1b[0m', '●', 'validate All Pending tracks')
    return context.prisma.track.updateMany({
      where: { pending: true },
      data: {
        pending: false,
      },
    })
  }
  else {
    throw new Error('invalid token')
  }
}

export async function invalidatePost(parent, args, context, info) {
  console.log('\x1b[34m%s\x1b[0m', '●', 'invalidate track-id:',args.id)
  return context.prisma.track.update({
    where: { id: args.id },
    data: {
      pending: false,
      invalid: true,
    },
  })
}