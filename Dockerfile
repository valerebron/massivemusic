FROM node:stretch-slim

ENV WEB_DIR /var/www/localhost

RUN apt update && \
    apt upgrade && \
    apt -qy install openssl && \
    yarn global add @prisma/cli@alpha typescript

RUN mkdir -p $WEB_DIR
WORKDIR $WEB_DIR

COPY front/dist ./front
COPY back ./back
COPY .env .

RUN cd back && yarn
RUN cd back && npx prisma generate
RUN cd front && yarn

CMD cd back && npx ts-node src/index.ts