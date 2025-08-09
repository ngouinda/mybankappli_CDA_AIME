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

###  Intégration et Déploiement Continu (CI/CD)

Ce projet utilise Jenkins et Docker pour automatiser le processus de build et de déploiement.

- Installation et Démarrage de l'application (local)

Avec npm


Installez les dépendances et lancez l'application en mode production.

- npm install
- npm run build
- npm run start

- Avec Docker

Construisez l'image Docker de l'application, puis lancez-la dans un conteneur.

- docker build -t my-bank-frontend .
- docker run --name my-bank-frontend_container -p 3000:3000 my-bank-frontend

CI/CD dans un environnement Docker

### Démarrer l'instance Jenkins
Si ce n'est pas déjà fait, démarrez une instance de Jenkins Master :

docker run --name jenkins -p 8080:8080 jenkins/jenkins

### Construire et démarrer l'agent Jenkins

Ensuite, construisez l'image de l'agent Jenkins et démarrez-le.

cd Jenkins-agent
docker build -t jenkins-agent-with-docker-and-node-my-bank-frontend .
docker run --init --name jenkins_agent_node -v /var/run/docker.sock:/var/run/docker.sock jenkins-agent-with-docker-and-node -url http://172.17.0.2:8080 8e6b5b1eca5e72e054864f966924131a03198c39ce7aa97aa6fc9dbdb2568200 my-bank-frontend
