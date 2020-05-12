import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// const newStyle = prisma.style.create({data: {
//   id: '22',
//   name: 'Dubstep2',
//   slug: 'dubstep2',
// }}).then(
//   function() {
//     console.log('then')
//   }
// )

// import usersDates from "./usersDates"
// import tracksDates from "./tracksDates"
// import * as fs from 'fs'
// let SQL = ''
// usersDates.map(user => SQL = SQL+'UPDATE User SET createdAt=\''+user.createdAt+'\',updatedAt=\''+user.updatedAt+'\' WHERE id=\''+user.id+'\'')
// tracksDates.map(track => SQL = SQL+'UPDATE Track SET createdAt=\''+track.createdAt+'\',updatedAt=\''+track.createdAt+'\' WHERE id=\''+track.id+'\';')
// console.log(SQL)

// fs.writeFile('tracksDates.sql', SQL, (err) => {
//   if (err) throw err
//   console.log('saved')
// })

// UPDATE `User` SET `createdAt` = '2012-03-19 19:56:28.000',`updatedAt` = '2017-09-05 16:37:48.000',WHERE `id` = '1'

// async function main() {

  // let newTrack = await prisma.createTrack({style: {connect: {id: 11}}, user: {connect: {id: 1}}, id: 'wNo2qjYBS5I', title: "WithDAte?", artist: "ArtistDate?", duration: 373, playcount: 6, invalid: false})

  // (1, 'contact@massivebassmusic.com', '4c8de06a3da368b50b3fdc45fe14f61dc160e2e4', 'MassiveMusic', 1332183388, 2, 1504622268),

// Update createdAt user

  // prisma.updateUser({
  //   where: { id: '2' },
  //   data: {
  //     2020-01-18 11:00:46.059
  //     createdAt: new Date(1333409992*1000),
  //   },
  // })

  //let newUser = await prisma.createUser({ id: 723,	 email: 'clementieezne_leon@hotmail.fr',name:	'Nkta',password:	'151babcdf3656d5ec8207d3227dddb7ef7ec75f4',	role: 'USER',createdAt:	Date('2012-04-02 23:58:29'),updatedAt:	Date('1970-01-01 00:00:00')})
  //const newUser = await prisma.createStyle({ id: '28', name: 'With empty Tracks', email: 'tesrrtt@test.fr', password: 'pass', role: 'USER'})
  //let newTrack = ''
  //let newTrack = await prisma.createTrack({style: {co nnect: {id: 15}}, user: {connect: {id: 1}}, id: '3pBCA9mUciU', title: "Anti War Dub", artist: "Digital Mystikz", duration:  382, playcount: 0, invalid: true})
  //let newTrack = await prisma.createTrack({style: {connect: {id: 11}}, user: {connect: {id: 1}}, id: 'wNo2XjYBS5I', title: "Tomahawk", artist: "SubScape", duration: 373, playcount: 6, invalid: false})
// }

// main().catch(e => console.error(e))
