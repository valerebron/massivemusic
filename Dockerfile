FROM node:alpine

ENV WEB_DIR /var/www/localhost
RUN mkdir -p $WEB_DIR
WORKDIR $WEB_DIR

COPY . .

RUN yarn deps
RUN yarn build:front

RUN yarn global add typescript
RUN yarn generate

CMD cd back && npx ts-node src/index.ts