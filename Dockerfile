# BUILD docker build -t registry.osrp.xyz/root/massivemusic2 --build-arg DB_PASS=root .

FROM prismagraphql/prisma:1.34

#0 Vars
ARG DB_PASS
ARG PRISMA_CONFIG
ENV WEB_DIR /var/www/localhost

#1 Deps
RUN apk update && apk upgrade
RUN apk add yarn
RUN rm -rf /var/cache/apk/*
RUN yarn global add prisma ts-node

#2 Files
RUN mkdir -p $WEB_DIR
WORKDIR $WEB_DIR
COPY dist .
COPY prisma .
COPY .htaccess .
COPY config.json .
RUN chmod 777 index.html
RUN chmod -R 777 ${WEB_DIR}*

#3 Serve
# RUN echo -e "\rapk add openrc apache2 --no-cache \r" >> /app/prerun_hook.sh
# RUN echo -e "rc-service apache2 start" >> /app/prerun_hook.sh

#4 Seed database
#RUN chmod u+x /app/prerun_hook.sh
#RUN echo -e "\r node-ts seeds/seedStyles.ts && node-ts seeds/seedUsers.ts && node-ts seeds/seedTracksWithoutDate.ts" > /app/prerun_hook.sh

# RUN echo -e "rc-service apache2 start" > /app/prerun_hook.sh