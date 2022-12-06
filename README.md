# MassiveMusic

Fullstack app for music streaming

## features

- user auth
- CRUD music
- admin section
- newsletter module
- favorite page
- youtube channel management
- youtube crawler

## Stack

- Postgresql / prisma.io
- Nodejs / typescript
- Graphql API
- Vuejs / Atomic Design / IT Css / Sass

## App port

  - WEB: **7730**
  - API: **7731**
  - DB: **7732**

## NODE.js expected version ">=10"

## Config

  - [.env](.env)

## Use
  - `yarn dev` launch vue & node dev server
  - `yarn build` build dist folder & docker image -> [Dockerfile](Dockerfile)
  - `git push` deploy on prod -> [.drone.yml](.drone.yml)
