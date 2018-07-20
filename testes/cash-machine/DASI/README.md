FRONT
============
yarn install
yarn start

API
============
docker-compose build
docker-compose up -d
docker-compose exec app rake db:create db:migarte
docker-compose exec app rake db:seed

