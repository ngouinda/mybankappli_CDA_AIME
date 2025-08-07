# Utilise une image PHP-FPM pour le backend Symfony
# C'est une image légère et optimisée pour les applications web
FROM php:8.1-fpm-alpine

# Installer les dépendances système requises pour Symfony
RUN apk update && apk add --no-cache \
    git \
    zip \
    unzip \
    libzip-dev \
    postgresql-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    icu-dev \
    libxml2-dev

# Installer les extensions PHP nécessaires
RUN docker-php-ext-install pdo pdo_pgsql opcache intl gd \
    && docker-php-ext-configure gd --with-jpeg \
    && docker-php-ext-install gd

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Définir le répertoire de travail
WORKDIR /var/www/mybank

# Copier les fichiers de l'application
COPY . .

# Installer les dépendances de l'application
RUN composer install --no-dev --optimize-autoloader

# Exécuter les commandes Symfony pour optimiser et préparer l'application
# Ces étapes sont cruciales pour le bon fonctionnement de l'appli en production
RUN php bin/console cache:clear
RUN php bin/console doctrine:migrations:migrate --no-interaction
RUN php bin/console assets:install --symlink

# Définir les bonnes permissions
RUN chown -R www-data:www-data /var/www/mybank
USER www-data

# Commande par défaut pour lancer le serveur PHP-FPM
CMD ["php-fpm"]
