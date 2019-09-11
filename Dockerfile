FROM php:7.3.8-apache
#1 Add project files
RUN mkdir -p /var/www/html/
WORKDIR /var/www/html/
RUN ls -lha
COPY back .
COPY front/dist .
COPY config.json .
#2 Install psql
RUN apt-get update
RUN apt-get install -y libpq-dev postgresql postgresql-client postgresql-contrib
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
RUN docker-php-ext-install pdo pdo_pgsql pgsql
#3 config psql
RUN service postgresql start && su - postgres -c "psql -U postgres -d postgres -c \"alter user postgres with password '${DB_PASS:-postgres}';\""
#3.2 feed database
#RUN su - postgres -c "psql -d massivemusic -a -f /var/www/html/datas/massivemusic.sql"
#4 launch servers
CMD service apache2 start && service postgresql start && cd /var/www/html/bin/console && php server:run *:8000
