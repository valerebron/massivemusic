FROM node:alpine

ENV WEB_DIR /var/www/localhost

RUN apk update && \
    apk upgrade && \
    yarn global add @prisma/cli typescript

RUN mkdir -p $WEB_DIR
WORKDIR $WEB_DIR

COPY front ./front
COPY back ./back
COPY .env .

RUN cd back && \
    yarn && \
    npx prisma generate && \
    cd ../front && \
    yarn

CMD cd back && npx ts-node src/index.ts