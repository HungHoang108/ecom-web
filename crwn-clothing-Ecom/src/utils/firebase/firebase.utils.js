import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDVcTwCxNOiQ-ZCWuE3-EDrxFNpII7c2pg",
  authDomain: "clothes-store-baf3f.firebaseapp.com",
  projectId: "clothes-store-baf3f",
  storageBucket: "clothes-store-baf3f.appspot.com",
  messagingSenderId: "835551292210",
  appId: "1:835551292210:web:df499c306b320ff075c52b"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

//adding collection to firebase
export const addCollectionAndDocuments = async (collectionKey, objectToAdd)=>{
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectToAdd.forEach((object)=>{
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit();
  console.log('done')
}

//Accessing database from firestore
export const getCategoriesAndDocument = async()=>{
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const {title, items} = docSnapshot.data()
    acc [title.toLowerCase()]= items
    return acc;
  }, {})
  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if(!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  
  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error){
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async ()=> await signOut(auth)

export const onAuthStateChangedListener = (callback)=> {
  onAuthStateChanged(auth, callback)
}