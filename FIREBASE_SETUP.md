# Configuration Firebase pour Next.js E-commerce

Ce guide vous explique comment configurer Firebase pour votre projet Next.js e-commerce.

## 🚀 Étapes de Configuration

### 1. Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet" ou "Ajouter un projet"
3. Donnez un nom à votre projet (ex: "mon-ecommerce")
4. Suivez les étapes de configuration

### 2. Activer l'Authentification

1. Dans la console Firebase, allez dans "Authentication"
2. Cliquez sur "Commencer"
3. Dans l'onglet "Sign-in method", activez "Email/Password"
4. Cliquez sur "Enregistrer"

### 3. Configurer Firestore Database

1. Dans la console Firebase, allez dans "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez "Mode test" pour commencer
4. Sélectionnez l'emplacement de votre base de données

### 4. Obtenir la Configuration

1. Dans la console Firebase, allez dans "Paramètres du projet" (⚙️)
2. Dans l'onglet "Général", faites défiler jusqu'à "Vos applications"
3. Cliquez sur l'icône Web (</>) pour ajouter une application web
4. Donnez un nom à votre application (ex: "ecommerce-web")
5. Copiez la configuration

### 5. Configurer le Projet

1. Copiez le fichier `firebase-config.example.js` vers `firebase-config.js`
2. Remplacez les valeurs par celles de votre projet Firebase :

```javascript
export const firebaseConfig = {
  apiKey: "votre-vraie-api-key",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet-id",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "votre-app-id"
};
```

3. Modifiez le fichier `lib/firebase.ts` pour importer votre configuration :

```typescript
import { firebaseConfig } from '../firebase-config';
```

### 6. Installer les Dépendances

```bash
npm install firebase
```

## 🔧 Configuration des Règles Firestore

Dans la console Firebase, allez dans "Firestore Database" > "Règles" et configurez :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Les utilisateurs peuvent lire et écrire leurs propres données
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Les admins peuvent lire toutes les données utilisateur
    match /users/{userId} {
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

## 👤 Créer un Utilisateur Admin

Pour créer le premier utilisateur admin :

1. Inscrivez-vous normalement via l'interface
2. Dans la console Firebase, allez dans "Firestore Database"
3. Trouvez votre utilisateur dans la collection `users`
4. Modifiez le champ `isAdmin` à `true`

Ou utilisez la fonction `promoteToAdmin` dans le code :

```javascript
import { promoteToAdmin } from '@/lib/firebaseAuth';

// Promouvoir un utilisateur admin (à utiliser avec précaution)
await promoteToAdmin('user-id');
```

## 🔒 Sécurité

### Variables d'Environnement (Recommandé)

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_FIREBASE_API_KEY=votre-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre-projet-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre-projet.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=votre-app-id
```

Puis modifiez `lib/firebase.ts` :

```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
```

## 🧪 Test de la Configuration

1. Démarrez votre serveur de développement : `npm run dev`
2. Allez sur `http://localhost:3000/auth/register`
3. Créez un nouveau compte
4. Vérifiez dans la console Firebase que l'utilisateur a été créé
5. Testez la connexion

## 📁 Structure de la Base de Données

```
users/
  {userId}/
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
    createdAt: timestamp
```

## 🚨 Dépannage

### Erreur "Firebase App named '[DEFAULT]' already exists"
- Assurez-vous de ne pas initialiser Firebase plusieurs fois
- Vérifiez que vous n'importez pas `firebase.ts` dans plusieurs endroits

### Erreur "Permission denied"
- Vérifiez les règles Firestore
- Assurez-vous que l'utilisateur est authentifié

### Erreur "auth/user-not-found"
- Vérifiez que l'utilisateur existe dans Firebase Auth
- Vérifiez que les données utilisateur existent dans Firestore

## 📚 Ressources

- [Documentation Firebase](https://firebase.google.com/docs)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Firestore](https://firebase.google.com/docs/firestore)
- [Next.js avec Firebase](https://nextjs.org/docs/authentication) 