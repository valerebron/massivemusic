FROM prismagraphql/prisma:1.34

#0 Vars
ARG DB_PASS
ARG PRISMA_SECRET
ARG PRISMA_CONFIG

ENV PRISMA_SECRET $PRISMA_SECRET
ENV WEB_DIR /var/www/localhost

#1 Deps
RUN apk update && apk upgrade
RUN apk add yarn
RUN rm -rf /var/cache/apk/*
RUN yarn global add prisma ts-node typescript

#2 Files
RUN mkdir -p $WEB_DIR
WORKDIR $WEB_DIR
COPY dist .
COPY api .
COPY .htaccess .
COPY config.json .

#3 Serve
# RUN echo -e "\rapk add openrc apache2 --no-cache \r" >> /app/prerun_hook.sh
# RUN echo -e "rc-service apache2 start" >> /app/prerun_hook.sh

#4 Seed database
#RUN chmod u+x /app/prerun_hook.sh
#RUN echo -e "\r ts-node seeds/seedStyles.ts && ts-node seeds/seedUsers.ts && ts-node seeds/seedTracksWithoutDate.ts" > /app/prerun_hook.sh

# RUN echo -e "rc-service apache2 start" > /app/prerun_hook.sh