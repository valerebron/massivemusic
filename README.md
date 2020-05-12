# massivemusic [![pipeline status](https://git.osrp.xyz/root/massivemusic2/badges/master/pipeline.svg)](https://git.osrp.xyz/root/massivemusic2/commits/master)
# MassiveMusic

BassMusic streaming App

## App Design
  - Database   :**3320**
  - Node       :**3330**

## Config
  - [.env](.env)

## Use
  - `yarn seed` insert datas in bdd -> [back/seeds](back/seeds)
  - `yarn dev` launch vue & node dev server
  - `yarn build` build dist folder & docker image -> [Dockerfile](Dockerfile)
  - `git push` deploy on prod -> [.gitlab-ci.yml](.gitlab-ci.yml)
