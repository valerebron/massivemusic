FROM node:alpine

ENV WEB_DIR /var/www/localhost
RUN mkdir -p $WEB_DIR
WORKDIR $WEB_DIR

COPY . .

RUN export $(cat .env | xargs)
RUN yarn deps
RUN sed -i "s|NODE_ENV=development|NODE_ENV=production|g" .env
RUN export $(cat .env | xargs)
RUN yarn build:front

RUN yarn global add typescript
RUN yarn generate

CMD cd back && npx ts-node src/index.ts