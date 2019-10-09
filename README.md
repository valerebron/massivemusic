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
  - massivemusic2-apache.conf add `FallbackResource index.html`
    (see: https://router.vuejs.org/guide/essentials/history-mode.html#html5-history-mode)
## Create & Feed database
  - `php bin/console doctrine:database:create`
  - `su - postgres -c "psql -d massivemusic -a -f /var/www/html/datas/massivemusic.sql"`

## Use
  - `cd front && yarn dev` (front dev environement)
  - `php back/bin/console server:run` (back dev server)
  - `docker-compose up` (launch massivemusic2 image)
  - `git push` (deploy on prod)

## Entities Structure

1. Track
idYt string 11
title string 255
artist string 255
duration smallint
playCount integer
invalid boolean
createdAt datetime

2. Style
name string 255
url string 255
tracks relation OneToMany

3. Member
email string 255
name string 255
password string 255
rank smallint
createdAt datetime
lastLogin datetime
tracks relation OneToMany

