const crypto = require('crypto')

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
  let user = await context.prisma.user.findOne({
    where: {
      email: args.credential
    }
  })

  if(!user) {
    console.log('\x1b[31m%s\x1b[0m', '●')
    throw new Error('user not found')
  }
  if(args.hash !== user.password) {
    console.log('\x1b[31m%s\x1b[0m', '●')
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
  // const user = await context.prisma.user.findOne({ where: { id: args.user_id } })
  // if(args.token === user.token || user.role === 'ADMIN') {
    return context.prisma.user.update({
      where: { id: args.id },
      data: {
        email: args.email,
      },
    })
  // }
  // else {
  //   throw new Error('invalid token')
  // }
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
  if(args.token === user.token) {
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