#!/usr/bin/env bash

echo 'Creating application user and db'

mongo massivemusic \
        --host localhost \
        --port 27017 \
        -u mongo_user \
        -p mongo_pass \
        --authenticationDatabase admin \
        --eval "db.createUser({user: 'root_username', pwd: 'mongo_pass', roles:[{role:'dbOwner', db: 'db_name'}]});"