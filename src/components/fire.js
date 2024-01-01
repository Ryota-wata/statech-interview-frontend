import { initializeApp } from '@firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from '@firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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

export { auth, provider, sendTokenToServer };
