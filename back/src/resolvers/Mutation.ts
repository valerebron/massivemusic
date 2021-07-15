const env = require('dotenv').config({ path: '../.env' }).parsed
const crypto = require('crypto')
const sharp = require('sharp')
const mail = require('../mail/mail')
const syncBot = require('../syncBot')
import updateAdminCount from './updateAdminCount'

function isEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

async function addAvatar(avatarB64, userId) {
  const b64 = avatarB64.replace(/^data:image\/png;base64,/, '')
  const imgPath = '../front/dist/avatars/'  // ⚠️ for local dev :'../front/public/avatars/'
  const imgOriginal = imgPath+userId+'.png'
  await require('fs').writeFile(imgOriginal, b64, 'base64', async function(err) {
    if (err) {
      console.log(err)
    }
    else {
      await sharp(imgOriginal).resize(300, 300).toFile(imgPath+userId+'-300px.png')
      await sharp(imgOriginal).resize(100, 100).toFile(imgPath+userId+'-100px.png')
      await sharp(imgOriginal).resize(30, 30).toFile(imgPath+userId+'-30px.png')
    }
  })
}

function switchActionType(type) {
  switch(type) {
    case 'pending':
    return { pending: true }
    case 'invalid':
    return { invalid: true }
    case 'empty':
    return {
      OR: [
        {
          artist: ''
        },
        {
          title: ''
        }
      ]
    }
    case 'duration':
    return {
      OR: [
        {
          duration: { lte: parseInt(env.TRACK_MIN_DURATION) }
        },
        {
          duration: { gte: parseInt(env.TRACK_MAX_DURATION) }
        }
      ]
    }
  }
}

export async function sendPassword(parent, args, context, info) {
  const email = args.email
  if(isEmail(email)) {
    const token = crypto.randomBytes(64).toString('hex')
    await context.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        token_email: token,
      },
    })
    const html = `
    <p>    
      <a href="https://massivemusic.fr/passwd/${token}/${email}/" target="_blank">
        Click on this link to change your password
      </a>
    </p>
    `
    mail.send(email, 'Change your password', html, '', function(err, info) {
      console.log('\x1b[34m%s\x1b[0m', '●', 'send password recovery mail for: '+email)
      return email
    })
  }
  else {
    return 'not an email'
  }
}

export async function changePassword(parent, args, context, info) {
  let user = await context.prisma.user.findMany({
    where: {
      email: args.email
    },
  })

  user = user[0]

  if(!user) {
    console.log('\x1b[31m%s\x1b[0m', '●', 'user not found')
    throw new Error('user not found')
  }
  if(args.token !== user.token_email) {
    console.log('\x1b[31m%s\x1b[0m', '●', 'invalid token')
    throw new Error('invalid token')
  }

  const token = crypto.randomBytes(64).toString('hex')
  user = await context.prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: args.newPassword,
      token_email: '',
    },
  })
  console.log('\x1b[34m%s\x1b[0m', '●', '['+Date.now()+'] '+user.name+' changed password')
  return args.token
}

export async function signup(parent, args, context, info) {
  if(args.name !== '' && args.email !== '' && args.hash !== '') {
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
    const html = `
    <p>
      🥳 Thanks to subscribe to 
      <a href="https://massivemusic.fr" target="_blank">
        MassiveMusic.fr !
      </a>
      🎉
    </p>
    `
    mail.send(args.email, 'Hi '+args.name, html, args.name, ()=> args.email)
    // manage avatar
    if(args.avatarB64) {
      addAvatar(args.avatarB64, user.id)
      console.log('\x1b[34m%s\x1b[0m', '●', 'new user: '+user.name)
      return {token, user}
    }
    else {
      console.log('\x1b[34m%s\x1b[0m', '●', 'new user: '+user.name)
      return {token, user}
    }
  }
  else {
    throw new Error('empty field')
  }
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

  let user = await context.prisma.user.findUnique({ where: { id: args.user_id } })
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
  const user = await context.prisma.user.findUnique({ where: { id: args.id } })
  const admin = await context.prisma.user.findUnique({ where: { id: 1 } })
  if(args.token !== admin.token && args.channel_enable_tracks === true && user.channel_enable_tracks === false) {  // protect enable track to be activate by non-admin
    throw new Error('forbiden')
  }
  if(args.token === user.token || args.token === admin.token) {
    console.log('\x1b[34m%s\x1b[0m', '●', ' edit user '+args.id)
    if(args.avatar_b64) {
      await addAvatar(args.avatar_b64, user.id)
    }
    if(args.style === 0) {
      return context.prisma.user.update({
        where: { id: args.id },
        data: {
          channel_enable_tracks: args.channel_enable_tracks,
          channel_description: args.channel_description,
        },
      }).catch(error=>{
        console.log(error)
      })
    }
    else {
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
  }
  else {
    throw new Error('invalid token')
  }
}

export async function dropUser(parent, args, context, info) {
  const admin = await context.prisma.user.findUnique({ where: { id: 1 } })
  const user = await context.prisma.user.findUnique({ where: { id: args.id } })
  if(args.token === admin.token || args.token === user.token) {
    console.log('\x1b[34m%s\x1b[0m', '●', ' remove user '+args.id)
    return context.prisma.user.delete({ where: { id: args.id } })
  }
  else {
    throw new Error('invalid token')
  }
}

export async function addBot(parent, args, context, info) {
  const admin = await context.prisma.user.findUnique({ where: { id: 1 } })
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

export async function syncFrontBot(parent, args, context, info) {
  const admin = await context.prisma.user.findUnique({ where: { id: 1 } })
  const bot = await context.prisma.user.findUnique({ where: { id: args.id }})
  if(args.token === admin.token || args.token === bot.token) {
    syncBot(bot, context)
  }
  else {
    console.log('bad token for sync')
  }
}

export async function post(parent, args, context, info) {
  const user = await context.prisma.user.findUnique( { where: { id: args.user_id } })
  if(args.token === user.token) {
    console.log('\x1b[34m%s\x1b[0m', '●', user.name+' add a new track:  '+args.title+' - '+args.artist)
    if(user.channel_enable_tracks === 1) {
      updateAdminCount(context)
    }
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
        pending: (user.channel_enable_tracks === 1),
        invalid: false,
      },
    })
  }
  else {
    throw new Error('invalid token')
  }
}

export async function editPost(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({ where: { id: args.user_id } })
  const admin = await context.prisma.user.findUnique({ where: { id: 1 } })
  if(args.token === user.token || args.token === admin.token) {
    const track_user = await context.prisma.track.findUnique({ where: { id: args.id } }).User()
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
  const user = await context.prisma.user.findUnique({ where: { id: args.user_id } })
  if(args.token === user.token) {
    const track_user = await context.prisma.track.findUnique({ where: { id: args.id } }).User()
    if(track_user || user.role === 'ADMIN') {
      if(track_user.id === user.id || user.role === 'ADMIN') {
        console.log('\x1b[34m%s\x1b[0m', '●', track_user.name+' remove ['+args.title+']')
        updateAdminCount(context)
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
  const user = await context.prisma.user.findUnique({ where: { id: args.user_id } })
  if(args.token === user.token) {
    const track_user = await context.prisma.track.findUnique({ where: { id: args.id } }).User()
    if(track_user || user.role === 'ADMIN') {
      if(track_user.id === user.id || user.role === 'ADMIN') {
        console.log('\x1b[34m%s\x1b[0m', '●', track_user.name+' validate ['+args.title+']')
        updateAdminCount(context)
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

export async function incrementPlayCount(parent, args, context, info) {
  const track = await context.prisma.track.findUnique({ where: { id: args.id } })
  let playcount = track.playcount + 1
  await context.prisma.track.update({ where: { id: args.id },
    data: {
      playcount: playcount
    },
  })
  return playcount
}

export async function validateAll(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({ where: { id: args.user_id } })
  if(args.token === user.token && user.role === 'ADMIN') {
    console.log('\x1b[34m%s\x1b[0m', '●', 'validate All '+args.type+' tracks')
    let where = switchActionType(args.type)
    const res = await context.prisma.track.updateMany({
      where: where,
      data: {
        pending: false,
        invalid: false,
      },
    })
    updateAdminCount(context)
    return res.count
  }
  else {
    throw new Error('invalid token')
  }
}

export async function deleteAll(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({ where: { id: args.user_id } })
  if(args.token === user.token && user.role === 'ADMIN') {
    console.log('\x1b[34m%s\x1b[0m', '●', 'delete all '+args.type+' tracks')
    let where = switchActionType(args.type)
    const res = await context.prisma.track.deleteMany({
      where: where,
    })
    updateAdminCount(context)
    return res.count
  }
  else {
    throw new Error('invalid token')
  }
}

export async function invalidatePost(parent, args, context, info) {
  console.log('\x1b[34m%s\x1b[0m', '●', 'invalidate track-id:',args.id)
  updateAdminCount(context)
  return context.prisma.track.update({
    where: { id: args.id },
    data: {
      pending: false,
      invalid: true,
    },
  })
}

