FROM php:7.3.8-apache
#1 Add project files
ARG DB_PASS=postgres
VOLUME /data/db/massivemusic /var/lib/postgresql/data
RUN mkdir -p /var/www/html/
WORKDIR /var/www/html/
COPY back .
COPY front/dist .
COPY config.json .
COPY .htaccess .
#2 Install psql
RUN apt-get update
RUN apt-get install -y libpq-dev postgresql postgresql-client postgresql-contrib
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
RUN docker-php-ext-install pdo pdo_pgsql pgsql
#3 Set database
RUN sed -i -e 's~postgres@localhost:5433~'"$DB_PASS@localhost:5432"'~g' .env
USER postgres
RUN service postgresql start &&\
    dbname="massivemusic" &&\
    output=$(psql -c "SELECT datname FROM pg_catalog.pg_database WHERE datname='${dbname}'") &&\
    if [ "${output}" != *"${dbname}"* ] ; then \
      psql --command "CREATE DATABASE ${dbname}" && \
      psql --command "CREATE USER ${dbname} WITH SUPERUSER PASSWORD '${DB_PASS}'" &&\
      psql -d ${dbname} -a -f /var/www/html/datas/${dbname}.sql; fi
#4 launch servers
USER root
CMD service postgresql start && service apache2 start && php /var/www/html/bin/console server:run *:8000
