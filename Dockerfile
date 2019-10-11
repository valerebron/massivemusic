FROM php:7.3.8-apache
#1 Add project files
ARG DB_PASS=postgres
VOLUME /data/db/massivemusic /var/lib/postgresql/data
WORKDIR /
COPY back .
COPY front/dist .
COPY config.json .
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
      psql -d ${dbname} -a -f /datas/${dbname}.sql; fi
#4 launch servers
USER root
CMD service postgresql start && service apache2 start && php /bin/console server:run *:8000
