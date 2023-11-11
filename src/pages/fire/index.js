import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from '@firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from '@firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

const auth = getAuth(initializeApp(firebaseConfig));
const provider = new GoogleAuthProvider();

const Page = () => {
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');
  const [credential, setCredential] = useState(null);

  const handleLogin = async () => {
    try {
      setState('progress');
      const result = await signInWithPopup(auth, provider);
      setCredential(result);
      setState('logined');
    } catch (e) {
      setError(e);
      setState('error');
    }
  };

  const handleLogout = async () => {
    try {
      setState('idle');
      await signOut(auth);
      setState('logouted');
      setCredential(null);
    } catch (e) {
      setError(e);
      setState('error');
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!credential && token && state!='logouted') {
      handleLogin();
    }
  }, [credential]);

  useEffect(() => {
    if (credential) {
      const token = credential?.user?.uid;
      token && sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token');
    }
  }, [credential]);

  return (
    <div>
      <button onClick={handleLogin}>ログイン</button>
      <button onClick={handleLogout}>ログアウト</button>
      <div>User: {credential ? credential.user.displayName : ''}</div>
      <div>State: {state}</div>
      <div>Error: {String(error)}</div>
    </div>
  );
};

export default Page;
