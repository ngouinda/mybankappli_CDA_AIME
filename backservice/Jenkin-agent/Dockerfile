FROM jenkins/inbound-agent
 
USER root
# Install PHP
RUN apt-get update && apt-get install -y \
    php-cli \
    php-common \
    php-xml \
    php-mbstring \
    php-intl \
    php-curl \
    php-zip \
    php-mysql \
    unzip \
    curl \
    git \
    libapache2-mod-php \
    git-ftp \
    && rm -rf /var/lib/apt/lists/*
# Install Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === '8e6b5b1eca5e72e054864f966924131a03198c39ce7aa97aa6fc9dbdb2568200') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer
# Install Docker
RUN curl -fsSL https://get.docker.com -o get-docker.sh
RUN sh get-docker.sh
 