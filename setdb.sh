#!/bin/bash

su postgres
dbname="massivemusic"
output=$(psql -c "SELECT datname FROM pg_catalog.pg_database WHERE datname='${dbname}'")
if [ ! $output != *"${dbname}"* ] ; then
  psql --command "CREATE DATABASE ${dbname}"
  psql --command "CREATE USER ${dbname} WITH SUPERUSER PASSWORD ${DB_PASS:-postgres}"
  psql -d ${dbname} -a -f /var/www/html/datas/${dbname}.sql;
fi
