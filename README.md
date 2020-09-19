# massivemusic [![pipeline status](https://git.osrp.xyz/root/massivemusic2/badges/master/pipeline.svg)](https://git.osrp.xyz/root/massivemusic2/commits/master)
# MassiveMusic

BassMusic streaming App

## App Design
  - Database :**3320**
  - GQL API  :**3330**
  - WEB      :**3340**

## NODE.js expected version ">=10"

## Config
  - [.env](.env)

## Use
  - `yarn dev` launch vue & node dev server
  - `yarn build` build dist folder & docker image -> [Dockerfile](Dockerfile)
  - `git push` deploy on prod -> [.gitlab-ci.yml](.gitlab-ci.yml)

## Notes
  - front & back are hot reloaded BUT if you edit [schema.prisma](back/schema.prisma) or [schema.graphql](back/src/schema.graphql), you'll need to re generate prisma with `yarn generate`.