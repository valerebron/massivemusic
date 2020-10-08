export $(cat .env | xargs)
sed -i "s|127.0.0.1:$DB_PORT|db|g" .env
sed -i "s|password|$CI_DB_PASS|g" .env
sed -i "s|$ENDPOINT|$CI_ENDPOINT|g" .env
sed -i "s|MAIL_USER=test@massivemusic.fr|MAIL_USER=contact@massivemusic.fr|g" .env
sed -i "s|MAIL_PASS=test@massivemusic.fr|MAIL_PASS=$CI_MAIL_PASS|g" .env
sed -i "s|NODE_ENV=development|NODE_ENV=production|g" .env
sed -i "s|API_PORT_DOCKER|API_PORT|g" docker-compose.yml
sed -i "s|WEB_PORT_DOCKER|WEB_PORT|g" docker-compose.yml
sed -i "s|<\!--DIST_SCRIPT_HERE-->|$DIST_SCRIPT|g" front/public/index.html