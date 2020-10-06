FROM node:stretch-slim

RUN apt update && \
    apt upgrade -y && \
    apt -qy install openssl && \
    yarn global add typescript

COPY front/dist ./front/dist
COPY back ./back
COPY .env .
COPY package.json .

CMD yarn generate && cd back && npx ts-node src/index.ts