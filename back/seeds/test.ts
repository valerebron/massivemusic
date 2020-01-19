import { prisma } from '../generated/prisma-client'

async function main() {

  //let newUser = await prisma.createUser({ id: 723,	 email: 'clementieezne_leon@hotmail.fr',name:	'Nkta',password:	'151babcdf3656d5ec8207d3227dddb7ef7ec75f4',	role: 'USER',createdAt:	Date('2012-04-02 23:58:29'),updatedAt:	Date('1970-01-01 00:00:00')})
  //const newUser = await prisma.createStyle({ id: '28', name: 'With empty Tracks', email: 'tesrrtt@test.fr', password: 'pass', role: 'USER'})
  //let newTrack = ''
  //let newTrack = await prisma.createTrack({style: {connect: {id: 15}}, user: {connect: {id: 1}}, id: '3pBCA9mUciU', title: "Anti War Dub", artist: "Digital Mystikz", duration:  382, playcount: 0, invalid: true})
  //let deletedUser = await prisma.deleteManyUsers()
  //let deletedTrack = await prisma.deleteManyTracks()
  //let newTrack = await prisma.createTrack({style: {connect: {id: 11}}, user: {connect: {id: 1}}, id: 'wNo2XjYBS5I', title: "Tomahawk", artist: "SubScape", duration: 373, playcount: 6, invalid: false})
}

main().catch(e => console.error(e))
