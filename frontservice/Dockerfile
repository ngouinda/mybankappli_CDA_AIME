# Phase de build
# Utiliser une image Node.js plus récente et optimisée pour la construction
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances pour tirer parti du cache Docker
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Phase de production
# Utiliser une image Node.js plus petite pour l'environnement de production
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de la phase de build (le dossier 'build')
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application avec 'serve' ou une commande similaire si nécessaire
# Pour un build CRA, `npm start` n'est pas utilisé en production
CMD ["npx", "serve", "-s", "build", "-l", "3000"]