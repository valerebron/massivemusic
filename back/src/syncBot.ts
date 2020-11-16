const env = require('dotenv').config({ path: '../.env' }).parsed
const usetube = require('usetube')
const moment = require('moment')
const cleanTitle = require('./cleantitle')

export = syncBot

async function syncBot(bot, prisma) {
  console.log('\x1b[34m%s\x1b[0m', '●', 'sync channel '+bot.name)
  const botTracks = await prisma.track.findMany({ where: { user: bot.id }, orderBy: { createdAt: 'desc' }})
  var tracks = []
  // 1 FIRST SCAN
  if(botTracks.length === 0) {
    console.log('first Sync')
    console.log('get all tracks')
    tracks = await usetube.getChannelVideos(bot.channel_id)
  }
  // 2 UPDATE SCAN
  else {
    console.log('update Sync')
    console.log('begin at '+bot.channel_last_sync_date)
    tracks = await usetube.getChannelVideos(bot.channel_id, new Date(bot.channel_last_sync_date))
  }
  // 3 DELETE BIG & SMALL TRACKS
  tracks = tracks.filter(track => track.duration < parseInt(env.TRACK_MAX_DURATION) || track.duration > parseInt(env.TRACK_MIN_DURATION))
  console.log('total tracks: '+tracks.length)
  // 4 SAVE TRACKS TO BDD
  if(tracks.length > 0) {
    const createManyTracks = await tracks.map(async (track) => {
      // save tracks
      return await prisma.track.create({
        data: {
          yt_id: track.id,
          title: cleanTitle(track.title),
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
      })
    })
    // update last sync date
    await prisma.user.update({
      where: { id: bot.id },
      data: {
        channel_last_sync_date: moment().toDate(),
      },
    }).catch(error=>{
      console.log(error)
    })
  }
  return tracks
}