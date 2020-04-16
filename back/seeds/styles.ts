import { prisma } from '../generated/prisma-client'

async function main() {
  let newStyle = await prisma.createStyle({ id: 19, name:	'Electro', slug: 'electro' })
  newStyle = await prisma.createStyle({ id: 15, name:	'Deep Bass', slug: 'deepbass' })
  newStyle = await prisma.createStyle({ id: 14, name:	'Break Beat', slug: 'breakbeat' })
  newStyle = await prisma.createStyle({ id: 13, name:	'Dub', slug: 'dub' })
  newStyle = await prisma.createStyle({ id: 11, name:	'Dubstep', slug: 'dubstep' })
  newStyle = await prisma.createStyle({ id: 12, name:	'Drum & Bass', slug: 'drumandbass' })
}

main().catch(e => console.error(e))