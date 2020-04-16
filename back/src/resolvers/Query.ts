module.exports = {
  styles: (parent, args, context, info) => {
    console.log('styles query')
    return context.prisma.styles()
  },
  users: (parent, args, context, info) => {
    console.log('users query')
    return context.prisma.users()
  },
  user: (parent, args, context, info) => {
    console.log('user query')
    return context.prisma.user({id: args.user_id})
  },
  tracks: (parent, args, context, info) => {
    console.log('tracks query')

    let andArray = []

    if(args.pending) {
      if(args.pending === 'without') {
        andArray.push({ invalid: false })
      }
      else if(args.pending === 'only') {
        andArray.push({ invalid: true })
      }
    }
    if(args.style) {
      andArray.push({ style: { id: args.style } })
    }
    if(args.user) {
      andArray.push({ user: { id: args.user } })
    }

    let orArray = []

    if(args.search) {
      orArray.push({ title_contains: args.search })
      orArray.push({ artist_contains: args.search })
    }

    let where = {}

    if(orArray.length) {
      where = {
        AND: andArray,
        OR: orArray,
      }
    }
    else {
      where = {
        AND: andArray,
      }
    }

    const tracks = context.prisma.tracks({
      where,
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
    })

    const count = context.prisma
    .tracksConnection({
      where,
    })
    .aggregate()
    .count()
    return {
      tracks,
      count,
    }
  }
}
