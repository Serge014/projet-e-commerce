// Configuration Firebase simplifiée
// Ce fichier fonctionne même si Firebase n'est pas installé

let auth: any = null;
let db: any = null;
let storage: any = null;
let app: any = null;

// Vérifier si Firebase est disponible
const isFirebaseAvailable = () => {
  try {
    require('firebase/app');
    return true;
  } catch {
    return false;
  }
};

if (isFirebaseAvailable()) {
  try {
    const { initializeApp } = require('firebase/app');
    const { getAuth } = require('firebase/auth');
    const { getFirestore } = require('firebase/firestore');
    const { getStorage } = require('firebase/storage');

    // Configuration Firebase - À remplacer par vos propres clés
    const firebaseConfig = {
      apiKey: "demo-api-key",
      authDomain: "demo-project.firebaseapp.com",
      projectId: "demo-project-id",
      storageBucket: "demo-project.appspot.com",
      messagingSenderId: "123456789",
      appId: "demo-app-id"
    };

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.warn('Firebase non configuré. Utilisation du mode fallback.');
  }
}

export { auth, db, storage };
export default app; 