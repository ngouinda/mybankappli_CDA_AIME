# Utilisation de l'image PHP 8.0 avec Apache
FROM php:8.0.0-apache

# Installation des dépendances nécessaires
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev \
    libpq-dev libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd \
    && docker-php-ext-install pdo pdo_mysql gd zip

# Activation du module Apache rewrite
RUN a2enmod rewrite

# Installer les extensions PHP
RUN docker-php-ext-install pdo pdo_pgsql opcache intl gd \
    && docker-php-ext-configure gd --with-jpeg \
    && docker-php-ext-install gd

# Installation de Composer (le télécharger et l'installer)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Définition du répertoire de travail
WORKDIR /var/www/html

# Copie des fichiers du projet
COPY . .

# Création du répertoire var (et vendor si nécessaire) pour éviter l'erreur de permission
RUN mkdir -p /var/www/html/var /var/www/html/vendor

# Attribution des bonnes permissions
RUN chown -R www-data:www-data /var/www/html/var /var/www/html/vendor

# Installer les dépendances de l'application
RUN composer install --no-dev --optimize-autoloader

# Exécuter les commandes Symfony pour optimiser et préparer l'application
RUN php bin/console cache:clear
RUN php bin/console doctrine:migrations:migrate --no-interaction
RUN php bin/console assets:install --symlink

# Définir l'utilisateur pour l'exécution
RUN chown -R www-data:www-data /var/www/mybank
USER www-data

CMD ["php-fpm"]

# Exposer le port 80
EXPOSE 80
