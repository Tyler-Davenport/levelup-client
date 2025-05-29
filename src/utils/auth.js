import { signOut as firebaseSignOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { clientCredentials, firebaseAuth } from './client';

const checkUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/checkuser`, {
      method: 'POST',
      body: JSON.stringify({ uid }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => resolve(resp.json()))
      .catch(reject);
  });

const registerUser = (userInfo) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/register`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => resolve(resp.json()))
      .catch(reject);
  });

const signIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(firebaseAuth, provider);
};

const signOut = () => {
  firebaseSignOut(firebaseAuth);
};

export { checkUser, registerUser, signIn, signOut };
