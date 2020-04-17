const crypto = require('crypto')

export async function signup(parent, args, context, info) {
  const hash  = crypto.createHash('sha1').update(args.password).digest('hex')
  const token = crypto.randomBytes(64).toString('hex')
  const user  = await context.prisma.createUser({name: args.name, email: args.email, password: hash, role: 'USER', token: token})

  console.log('\x1b[34m%s\x1b[0m', '●', 'new user: '+user.name)

  return {token, user}
}

export async function login(parent, args, context, info) {
  let user = await context.prisma.user({ email: args.email })
  const name = user.name
  if(!user) {
    console.log('\x1b[31m%s\x1b[0m', '●')
    throw new Error('user not found')
  }

  const hash = crypto.createHash('sha1').update(args.password).digest('hex')
  if (hash !== user.password) {
    console.log('\x1b[31m%s\x1b[0m', '●')
    throw new Error('invalid password')
  }

  const token = crypto.randomBytes(64).toString('hex')
  user = context.prisma.updateUser({
    data: {
      token: token,
    },
    where: {
      id: user.id,
    }
  })
  console.log('\x1b[34m%s\x1b[0m', '●', '['+Date.now()+'] '+name+' logged in')
  return {token, user}
}

export async function logout(parent, args, context, info) {

  let user = await context.prisma.user({ id: args.userId })
  const name = user.name
  if(args.token === user.token) {
    user = context.prisma.updateUser({
      data: {
        token: '',
      },
      where: {
        id: args.userId,
      },
    })
    
    console.log('\x1b[34m%s\x1b[0m', '●', '['+Date.now()+'] '+name+' logout')

    return user
  }
  else {
    throw new Error('invalid token')
  }
}

export async function post(parent, args, context, info) {
  const user = await context.prisma.user({ id: args.userId })
  if(args.token === user.token) {
    console.log('\x1b[34m%s\x1b[0m', '●', user.name+' add a new track:  '+args.title+' - '+args.artist)
    return context.prisma.createTrack({
      id: args.id,
      title: args.title,
      artist: args.artist,
      duration: args.duration,
      style: { connect: { id: args.style }},
      user: { connect: { id: args.userId }},
      invalid: true,
    })
  }
  else {
    throw new Error('invalid token')
  }
}

export async function editPost(parent, args, context, info) {
  const user = await context.prisma.user({ id: args.userId })
  if(args.token === user.token) {
    const userTrack = await context.prisma.track({ id: args.trackId }).user()
    if(userTrack || user.role === 'ADMIN') {
      if(userTrack.id === user.id || user.role === 'ADMIN') {
        console.log('\x1b[34m%s\x1b[0m', '●', userTrack.name+' edit ['+args.trackId+']')
        return context.prisma.updateTrack({
          where: { id: args.trackId },
          data: {
            id: args.id,
            title: args.title,
            artist: args.artist,
            style: {
              connect: {
                id: args.style
              }
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
  const user = await context.prisma.user({ id: args.userId })
  if(args.token === user.token) {
    const userTrack = await context.prisma.track({ id: args.trackId }).user()
    if(userTrack || user.role === 'ADMIN') {
      if(userTrack.id === user.id || user.role === 'ADMIN') {
        console.log('\x1b[34m%s\x1b[0m', '●', userTrack.name+' remove ['+args.trackId+']')
        return context.prisma.deleteTrack({ id: args.trackId }, info)
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
