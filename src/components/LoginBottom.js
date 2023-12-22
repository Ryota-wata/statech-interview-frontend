import { useEffect, useState } from 'react';
import { initializeApp } from '@firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from '@firebase/auth';

import Button from '../components/Button';

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

const LoginBottom = () => {
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

  const sendTokenToServer = (token) => {
    // ユーザートークンをHTTPリクエストを使用してサーバーに送信するロジックを実装します（例：fetchを使用）。
    // プレースホルダーのURLは、実際のサーバーエンドポイントに置き換えてください。
    const serverEndpoint = `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/login`;
    fetch(serverEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('ユーザートークンのサーバーへの送信に失敗しました');
        }
      })
      .catch(error => {
        console.error('サーバーへのトークンの送信中にエラーが発生しました:', error);
      });
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!credential && token && state!='logouted') {
      handleLogin();
    }
  }, [credential]);

  useEffect(() => {
    const handleTokenUpdate = async () => {
      if (credential) {
        try {
          const idToken = await credential.user.getIdToken();
          sessionStorage.setItem('token', idToken);
          sendTokenToServer(idToken);
        } catch (error) {
          console.error('IDトークンの取得中にエラーが発生しました:', error);
        }
      } else {
        sessionStorage.removeItem('token');
      }
    };
  
    handleTokenUpdate();
  }, [credential]);

  return (
    <div>
      {state === 'logined' ? (
        <div>
          <Button
          color="warning"
          variant="contained"
          size="small"
          component="a"
          href="/me"
          sx={{ marginRight: 2 }}
        >
          戦歴
        </Button>
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={handleLogout}
        >
          ログアウト
        </Button>
      </div>
      ) : (
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={handleLogin}
        >
          ログイン
        </Button>
      )}
    </div>
  );
};

export default LoginBottom;
