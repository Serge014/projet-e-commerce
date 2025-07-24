# Résolution des Erreurs - Next.js E-commerce

Ce guide vous aide à résoudre les erreurs courantes dans le projet.

## 🔧 Erreurs TypeScript

### Erreur : "Module 'react' has no exported member 'useEffect'"

**Solution :**
1. Vérifiez que React est installé :
   ```bash
   npm install react react-dom
   ```

2. Vérifiez votre `tsconfig.json` :
   ```json
   {
     "compilerOptions": {
       "jsx": "preserve",
       "esModuleInterop": true,
       "allowSyntheticDefaultImports": true
     }
   }
   ```

### Erreur : "JSX element implicitly has type 'any'"

**Solution :**
1. Ajoutez les types React :
   ```bash
   npm install @types/react @types/react-dom
   ```

2. Vérifiez que votre `tsconfig.json` inclut :
   ```json
   {
     "compilerOptions": {
       "jsx": "preserve",
       "lib": ["dom", "dom.iterable", "es6"],
       "moduleResolution": "node"
     }
   }
   ```

## 🔥 Erreurs Firebase

### Erreur : "Cannot find module 'firebase'"

**Solution :**
1. Installez Firebase :
   ```bash
   npm install firebase
   ```

2. Ou utilisez le mode fallback (recommandé pour commencer) :
   - Le projet fonctionne sans Firebase installé
   - L'authentification locale est utilisée par défaut

### Erreur : "Firebase App named '[DEFAULT]' already exists"

**Solution :**
1. Vérifiez que vous n'importez pas `firebase.ts` plusieurs fois
2. Utilisez le système d'authentification unifié (`unifiedAuth.ts`)

## 🚀 Démarrage Rapide

### Option 1 : Sans Firebase (Recommandé pour commencer)

1. Le projet fonctionne immédiatement avec l'authentification locale
2. Utilisez les identifiants par défaut :
   - **Client** : `customer@mail.com` / `12345678`
   - **Admin** : `admin@mail.com` / `admin123`

### Option 2 : Avec Firebase

1. Installez Firebase :
   ```bash
   npm install firebase
   ```

2. Configurez Firebase (voir `FIREBASE_SETUP.md`)

3. Le système basculera automatiquement vers Firebase

## 📁 Structure des Fichiers d'Authentification

```
lib/
├── firebase.ts              # Configuration Firebase (optionnel)
├── firebaseAuth.ts          # Authentification Firebase
├── authFallback.ts          # Authentification locale
├── unifiedAuth.ts           # Système unifié (recommandé)
├── useUnifiedAuth.ts        # Hook React unifié
└── useAuth.ts               # Ancien hook (à remplacer)
```

## 🔄 Migration

### Pour utiliser le système unifié :

1. Remplacez les imports dans vos composants :
   ```typescript
   // Avant
   import { useAuth } from '@/lib/useAuth';
   import { login } from '@/lib/auth';
   
   // Après
   import { useUnifiedAuth } from '@/lib/useUnifiedAuth';
   import { login } from '@/lib/unifiedAuth';
   ```

2. Le système choisit automatiquement Firebase ou le fallback local

## 🧪 Test de Fonctionnement

1. Démarrez le serveur :
   ```bash
   npm run dev
   ```

2. Testez l'authentification :
   - Allez sur `http://localhost:3000/auth/login`
   - Connectez-vous avec les identifiants par défaut
   - Vérifiez que la redirection fonctionne

3. Testez l'inscription :
   - Allez sur `http://localhost:3000/auth/register`
   - Créez un nouveau compte
   - Vérifiez que l'utilisateur est créé

## 🚨 Erreurs Courantes

### "Cannot read property 'currentUser' of null"

**Cause :** Firebase n'est pas configuré
**Solution :** Utilisez le système unifié qui gère automatiquement ce cas

### "localStorage is not defined"

**Cause :** Code exécuté côté serveur
**Solution :** Vérifiez que le code s'exécute côté client avec `'use client'`

### "Module not found"

**Cause :** Dépendances manquantes
**Solution :** Installez les dépendances avec `npm install`

## 📞 Support

Si vous rencontrez des erreurs :

1. Vérifiez que toutes les dépendances sont installées
2. Utilisez le mode fallback local pour tester
3. Consultez les logs de la console pour plus de détails
4. Vérifiez la configuration TypeScript

## 🎯 Prochaines Étapes

1. **Testez l'authentification locale** (fonctionne immédiatement)
2. **Configurez Firebase** si nécessaire (voir `FIREBASE_SETUP.md`)
3. **Personnalisez l'interface** selon vos besoins
4. **Ajoutez des fonctionnalités** supplémentaires 