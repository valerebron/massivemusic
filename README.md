# massivemusic2 [![pipeline status](https://git.osrp.xyz/root/massivemusic2/badges/master/pipeline.svg)](https://git.osrp.xyz/root/massivemusic2/commits/master)
# MassiveMusic 2

Bass Music Streaming player

## dependencies
- node 9.1
- yarn

## Use
  - `yarn dev` (dev environement)
  - `git push` (deploy on prod)
  
  ## Config
  - [config.json](config.json) (port and host for local use)
  - [configDist.json](configDist.json) (port and host for prod use)
  - [.gitlab-ci.yml](.gitlab-ci.yml) (deploy config)
  - massivemusic2-apache.conf add `FallbackResource index.html`
    (see: https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode)

## App Design
  - massivemusic2 Socket (port 33310):
    this websocket is used to push notifications to all users when a new post is added
  - massivemusic2 Bdd (port 33320):
    the mongo bdd, serve in a docker container. Schemas can be found in [api folder](api/) and example data in [db folder](db/)
  - mongo express (port 33321):
    Interface to admin mongodb
  - massivemusic2 api (port 33330):
    CRUD api set in config.json,
    post http://localhost:33330/tags
  - massivemusic2 web server (port 33340):
    node express server for production, it rewrite all request to dist/index.html
