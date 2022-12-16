import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    //signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDwgICpNYhKBkDioZkQ31YFBZxRiyNNHc",
    authDomain: "udemy-crwn-clothing-db-c4c59.firebaseapp.com",
    projectId: "udemy-crwn-clothing-db-c4c59",
    storageBucket: "udemy-crwn-clothing-db-c4c59.appspot.com",
    messagingSenderId: "1000721514024",
    appId: "1:1000721514024:web:c207d1eb770920ef5ebf1d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
//export const signInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {displayName: 'mike'}
) => {
    if (!userAuth)
        return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot.exists)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log("Error creating user", error.message)
        }
    }

    return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    
    if (!email || !password) 
        return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    
    if (!email || !password) 
        return;

    return await signInWithEmailAndPassword(auth, email, password);
}
    
    // console.log('name: ', displayName, ', email: ', email, ' password: ', password)
    // if (!email || !password) 
    //     return "Login failed, missing email or password";

    // const userDocRef = doc(db, 'users', email);
    // const userSnapshot = await getDoc(userDocRef)
    // console.log(userSnapshot)

    // if (!userSnapshot.exists()) {
    //     const createdAt = new Date();
    //     try {
    //         await setDoc(userDocRef, {
    //             displayName,
    //             email,
    //             createdAt
    //         });
    //     } catch (error) {
    //         return "Login failed, error creating user";
    //     }
    // }

    // return "Login succeeded";