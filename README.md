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
  - `cd front && yarn dev` (vue)
  - `cd prisma && docker-compose up -d` (prisma)
  - `docker-compose up` (launch massivemusic2 image)
  - `git push` (deploy on prod)
