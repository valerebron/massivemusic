const env = require('dotenv').config({ path: '../.env' }).parsed

const updateAdminCount = async function(context) {
  const pendingCount = await context.prisma.track.count({ where: { pending: true }})
  const invalidCount = await context.prisma.track.count({ where: { invalid: true }})
  const emptyCount = await context.prisma.track.count({ where: { OR: [ { artist: '' }, { title: '' } ] }})
  const bigSmallCount = await context.prisma.track.count({ where: { OR: [
    { duration: { lte: parseInt(env.TRACK_MIN_DURATION) } },
    { duration: { gte: parseInt(env.TRACK_MAX_DURATION) } },
  ] }})
  context.pubsub.publish('ADMIN_COUNT_UPDATED', { adminCountUpdated: { pendingCount, invalidCount, emptyCount, bigSmallCount } })
}

export default updateAdminCount
