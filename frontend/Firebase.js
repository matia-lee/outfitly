import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const api_key = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: api_key,
  authDomain: "outfitly-468f4.firebaseapp.com",
  projectId: "outfitly-468f4",
  storageBucket: "outfitly-468f4.appspot.com",
  messagingSenderId: "346924381521",
  appId: "1:346924381521:web:d40a68181542fdb1000f70",
  measurementId: "G-F85RC8ZH28"
};

const firebaseApp = initializeApp(firebaseConfig);
// const database = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
// const storage = getStorage(firebaseApp);

// const analytics = getAnalytics(firebaseApp);

export { auth, provider, storage, database };