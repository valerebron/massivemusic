const env = require('dotenv').config({ path: '../.env' }).parsed
const usetube = require('usetube')
const moment = require('moment')
const cleanTitle = require('./cleantitle')

export = syncBot

async function syncBot(bot, prisma) {
  const botTracks = await prisma.track.findMany({ where: { user: bot.id }, orderBy: { createdAt: 'desc' }})
  let botName = bot.name.toLowerCase()
  var tracks = []
  // 1 FIRST SCAN
  if(botTracks.length === 0) {
    console.log('first Sync')
    tracks = await usetube.getChannelVideos(bot.channel_id)
  }
  // 2 UPDATE SCAN
  else {
    console.log('update Sync from '+bot.channel_last_sync_date)
    // tracks = await usetube.getChannelVideos(bot.channel_id, new Date(bot.channel_last_sync_date))
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    tracks = await usetube.getChannelVideos(bot.channel_id, lastWeek)
  }
  // 3 RADIO TRACKS
  if(botName === 'noisia radio' || botName === 'vision') {
    console.log(botName+' as '+tracks.length+' track(s), lets try to get desc')
    let trackInTracks = []
    for(let i = 0; i < tracks.length; i++) {
      let newTracksFromDesc = await usetube.getVideosFromDesc(tracks[i].id)
      if(newTracksFromDesc.length === 0) {
        console.log('https://youtube.com/watch?v='+tracks[i].id+' do not contain playlist in desc')
        trackInTracks.push(tracks[i])
      }
      else {
        console.log('https://youtube.com/watch?v='+tracks[i].id+' got playlist in desc')
        trackInTracks = trackInTracks.concat(newTracksFromDesc)
      }
    }
    console.log('got '+trackInTracks.length+' track(s) extracted.')
    tracks = tracks.concat(trackInTracks)
  }
  if(tracks.length > 0) {
    // 4 DELETE BIG & SMALL TRACKS
    tracks = tracks.filter(track => track.duration < parseInt(env.TRACK_MAX_DURATION) || track.duration > parseInt(env.TRACK_MIN_DURATION))
    console.log('\x1b[34m%s\x1b[0m', '●', 'sync '+bot.name+': '+tracks.length+' track(s)')
    // 5 SAVE TRACKS TO BDD
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
      }).catch(e => {
        if(e.toString().includes('Unique constraint failed on the constraint: `yt_id_unique`')) {
          console.log('track already added')
        }
      })
    })
    // 6 UPDATE LAST SYNC DATE
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