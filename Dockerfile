FROM node:8.6-alpine
RUN mkdir -p /massivemusic2
WORKDIR /massivemusic2
COPY node_modules/ ./node_modules
COPY dist/ ./dist
COPY api/ ./api
COPY config.json ./config.json
COPY server.js ./server.js
EXPOSE 33330 33330
EXPOSE 33340 33340

CMD node server.js > server.log 2> server_err.log
