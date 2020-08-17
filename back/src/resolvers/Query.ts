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

    return await context.prisma.user.findMany({
      where: where,
    })
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
    let andArray = []

    if(args.style) {
      andArray.push({ style: args.style })
    }
    if(args.user) {
      andArray.push({ user: args.user })
    }
    if(args.pending) {
      const user = await context.prisma.user.findOne({
        where: { id: args.pending }
      })
      if(user.role !== 'ADMIN') {
        andArray.push({ user: args.pending })
      }
      andArray.push({ pending: true })
    }
    else {
      andArray.push({ pending: false })
    }
    if(args.invalid) {
      const user = await context.prisma.user.findOne({
        where: { id: args.invalid }
      })
      if(user.role !== 'ADMIN') {
        andArray.push({ user: args.invalid })
      }
      andArray.push({ invalid: true })
    }
    else {
      andArray.push({ invalid: false })
    }

    let orArray = []

    if(args.search) {
      orArray.push({ title: { contains: args.search } })
      orArray.push({ artist: { contains: args.search } })
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
      first: args.first,
      where,
      orderBy: { createdAt: 'desc' },
    })

    const count = await context.prisma.track.count({where})

    return {
      tracks,
      count,
    }
  }
}
