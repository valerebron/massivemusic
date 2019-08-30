# massivemusic2 [![pipeline status](https://git.osrp.xyz/root/massivemusic2/badges/master/pipeline.svg)](https://git.osrp.xyz/root/massivemusic2/commits/master)
# MassiveMusic 2

Bass Music Streaming player

## App Design
  - massivemusic2 webSocket (port 3310): push notifications [TODO]
  - massivemusic2 api (port 3330)
  - massivemusic2 web server (port 3340): rewrite all request to dist/index.html

## Config
  - [config.json](config.json)
  - [configDist.json](configDist.json)
  - [.gitlab-ci.yml](.gitlab-ci.yml)
  - massivemusic2-apache.conf add `FallbackResource index.html`
    (see: https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode)

## Use
  - `cd front && yarn dev` (frontdev environement)
  - `docker-compose up` (launch massivemusic2 image)
  - `php back/bin/console server:start 0.0.0.0:3330` (launch symfony web server)
  - `git push` (deploy on prod)
