// Symfony vocabs
CONTROLLER : method on ROUTE call
ENTITY : Table shema with getter & setter
REPOSITORY : methods to select data
FIXTURES : methods to set default data
MIGRATIONS : sql

// From https://www.youtube.com/watch?v=UTusmVpwJXo & https://www.youtube.com/watch?v=e5udJTjbYzw
composer create-project symfony/skeleton api-postgre-symfony
composer require server --dev
composer require symfony/orm-pack
composer require orm-fixtures --dev
composer require symfony/maker-bundle --dev
composer require symfony/finder

// Setup bdd
edit config/packages/doctrine.yml
driver: 'pdo_pgsql'
charset: utf8
edit .env
DATABASE_URL=pgsql://postgres:postgres@127.0.0.1:5432/test

php bin/console server:run                  // launch web server (:8000)
php bin/console make:controller             // make Route (11min)
php bin/console doctrine:database:create    // create Database from .env Doctrine Config
php bin/console make:entity                 // create Class (38min)
php bin/console make:migration              // create SQL query in Migrations/verionsID.php
php bin/console doctrine:migrations:migrate // execute migrations file
php bin/console make:fixtures               // create DataFixtures/ClassFixtures.php (33:30)
php bin/console doctrine:fixtures:load      // insert datas from fixtures.php

// Relations (3:45min)
make:entity
add fields
  -name: name of related entity in lowercases and plural (Track -> tracks))
  -type: relation
  -entity related: entity related name (Track)
  -relType: ManyToOne, OneToMany ...

// Update entity
php bin/console doctrine:cache:clear-metadata
php bin/console doctrine:migrations:diff
php bin/console make:entity
php bin/console doctrine:migrations:migrate --all-or-nothing

// service container & injection de dependances (1h07)