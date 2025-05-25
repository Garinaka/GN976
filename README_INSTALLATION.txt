# Guide d'installation de Gari Naka

---

## Prérequis

- Node.js installé sur votre ordinateur (https://nodejs.org/)
- Un éditeur de code (VSCode recommandé)
- Un compte MongoDB Atlas (base de données)
- Un compte Stripe (paiements)
- Un compte Gmail (envoi de mails)

---

## Installation du projet

### 1. Cloner ou préparer les fichiers

- Structure du projet :
  - `/client` (Frontend React)
  - `/server` (Backend Node.js/Express)
  - `.env` (variables d'environnement)

---

### 2. Configurer les fichiers `.env`

Créez un fichier `.env` dans `/server/` et `/client/` à partir de `.env.example` et remplissez :

- MONGO_URI
- JWT_SECRET
- STRIPE_SECRET_KEY
- EMAIL_USER
- EMAIL_PASS
- VITE_API_URL
- VITE_MAPBOX_TOKEN

---

### 3. Installer les dépendances

Dans `/server/` :
```bash
npm install
