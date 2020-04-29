# massivemusic2 [![pipeline status](https://git.osrp.xyz/root/massivemusic2/badges/master/pipeline.svg)](https://git.osrp.xyz/root/massivemusic2/commits/master)
# MassiveMusic 2

BassMusic streaming App

## App Design
  - Database   :**3320**
  - Node       :**3330**
  - Web        :**3340**

## Config
  - [config.json](config.json)
  - [configDist.json](configDist.json)

## Use
  - `yarn seed` insert datas in bdd -> [back/seeds](back/seeds)
  - `yarn dev` launch vue & node dev server
  - `yarn build` build dist folder & docker image -> [Dockerfile](Dockerfile)
  - `git push` deploy on prod -> [.gitlab-ci.yml](.gitlab-ci.yml)
