FROM node:buster

ENV WEB_DIR /var/www/localhost

RUN apt update -y && \
    apt upgrade -y && \
    apt install yarn -y && \
    yarn global add @prisma/cli typescript

RUN mkdir -p $WEB_DIR
WORKDIR $WEB_DIR

COPY front ./front
COPY back ./back
COPY .env .

RUN cd back && yarn && \
    cd ../front && yarn

CMD cd back && npx ts-node src/index.ts