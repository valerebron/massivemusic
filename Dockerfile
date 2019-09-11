FROM php:7.3.8-apache
#1 Add project files
RUN mkdir -p /var/www/html/
WORKDIR /var/www/html/
COPY back /var/www/html/
COPY front/dist /var/www/html/
COPY config.json config.json
#2 Install psql
RUN apt-get update
RUN apt-get install -y libpq-dev postgresql postgresql-client postgresql-contrib
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
RUN docker-php-ext-install pdo pdo_pgsql pgsql
#3 config psql
RUN echo $DB_PASS
RUN service postgresql start && su - postgres -c "psql -U postgres -d postgres -c \"alter user postgres with password '${DB_PASS:-postgres}';\"" \
    && php bin/console doctrine:database:create
#3.2 feed database
#RUN su - postgres -c "psql -d massivemusic -a -f /var/www/html/datas/massivemusic.sql"
#4 launch servers
CMD service apache2 start && service postgresql start && php bin/console server:run *:8000;
