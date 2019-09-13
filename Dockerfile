FROM php:7.3.8-apache
#1 Add project files
VOLUME /data/db/massivemusic2 /var/lib/postgresql/data
RUN mkdir -p /var/www/html/
WORKDIR /var/www/html/
COPY back .
COPY front/dist .
COPY config.json .
COPY setdb.sh .
#2 Install psql
RUN apt-get update
RUN apt-get install -y libpq-dev postgresql postgresql-client postgresql-contrib
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
RUN docker-php-ext-install pdo pdo_pgsql pgsql
#4 launch servers
CMD service apache2 start && service postgresql start && ./setdb.sh && php /var/www/html/bin/console server:run *:8000
