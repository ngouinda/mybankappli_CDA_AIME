# mybankappli

MyBank est une application bancaire avec un frontend en React et un backend en Symfony. Ce projet vous permet de gérer les opérations bancaires avec une interface moderne et un backend puissant.


## Prérequis

- [Node.js](https://nodejs.org/) et [npm](https://npmjs.com/) pour le frontend React
- [PHP](https://www.php.net/) et [Composer](https://getcomposer.org/) pour le backend Symfony
- [Docker](https://www.docker.com/) (optionnel, si vous utilisez Docker pour l'environnement de développement)
- [MySQL](https://www.mysql.com/) pour la base de données (ou Docker pour l'exécuter)

  ## Installation

### Frontend (React)

- Clonez le repository : https://github.com/ngouinda/mybankappli_CDA/tree/main/frontservice
- Installez les dépendances : npm install
- Démarrez le serveur de développement React : npm start

  ###Backend  (Symfony)

- Clonez le repository : https://github.com/ngouinda/mybankappli_CDA/tree/main/backservice
- Installez les dépendances : composer install
- Créez la base de données : php bin/console doctrine:database:create
- Appliquez les migrations pour configurer la base de données : php bin/console doctrine:migrations:migrate
- Démarrez le serveur Symfony : Symfony server:start

  ### Docker

  - Construisez l'image Docker pour l'application Symfony : docker-compose build
  - Lancez les conteneurs (frontend et backend) avec Docker : docker-compose up

:-) Si tout à été bien fait, l'application sera accessible à http://localhost:8000 pour le backend et http://localhost:3000 pour le frontend.
