# massivemusic2 [![pipeline status](https://git.osrp.xyz/root/massivemusic2/badges/master/pipeline.svg)](https://git.osrp.xyz/root/massivemusic2/commits/master)
# MassiveMusic 2

BassMusic streaming Player

## App Design
  - WebSocket  :**3310** (push notifications) [TODO]
  - API        :**3330**
  - WebServer  :**3340** (rewrite all request to dist/index.html)

## Config
  - [config.json](config.json)
  - [configDist.json](configDist.json)
  - [.gitlab-ci.yml](.gitlab-ci.yml)

## Use
  - `yarn dev` front (vue)
  - `yarn seed` insert data base on /seeds scripts
  - `yarn serve` bdd + prisma with defautl password
  - `git push` (deploy on prod)
