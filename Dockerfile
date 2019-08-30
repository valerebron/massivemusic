FROM php:7.3.8-apache
#1 Add project files
RUN mkdir -p /var/www/html/massivemusic2
WORKDIR /var/www/html/massivemusic2
COPY back ./
COPY front ./
RUN cd ./front/ && yarn build
COPY config.json config.json
#2 Install psql
RUN apt update
# RUN apt install -y wget
# RUN wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | apt-key add -
# RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
RUN apt install -y libpq-dev postgresql postgresql-contrib
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
RUN docker-php-ext-install pdo pdo_pgsql pgsql
#3 launch servers
RUN service apache2 start
CMD php bin/console server:run *:8000
