import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    // console.log(credentials)
    const { displayName, email, photoURL, uid } = result.user;
    return { displayName, email, photoURL, uid };
  } catch (error: any) {
    const errorMessage = error.message;
    return { errorMessage };
  }
};

export const loginWithEmail = async ({ email, password }: any) => {
  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { displayName, photoURL, uid } = result.user;
    return { displayName, email, photoURL, uid };
  } catch (error: any) {
    const errorMessage = error.message;
    return { errorMessage };
  }
};

export const registerUserWithEmail = async ({ email, password, displayName }: any) => {
  try {
    const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    await updateProfile(result.user, { displayName });
    const { photoURL, uid } = result.user;
    return { displayName, email, photoURL, uid };
  } catch (error: any) {
    const errorMessage = error.message;
    return { errorMessage };
  }
};

// export const loginWithFacebook = async () => {
//   try {
//     const result = await signInWithPopup(FirebaseAuth, facebookProvider);
//     const { displayName, email, photoURL, uid } = result.user;
//     return { displayName, email, photoURL, uid };
//   } catch (error) {
//     return error;
//   }
// }

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
