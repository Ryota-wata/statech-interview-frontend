import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, provider, sendTokenToServer } from './fire'; // Firebaseの設定と関数をインポートしてください
import { signInWithPopup, signOut } from '@firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleTokenUpdate = async (credential) => {
    if (credential) {
      try {
        // credential.user が存在することを確認してから getIdToken を呼び出す
        if (credential) {
          const idToken = await credential.getIdToken();
          sessionStorage.setItem('token', idToken);
          sendTokenToServer(idToken);
        } else {
          console.error('ユーザー情報が取得できませんでした。');
        }
      } catch (error) {
        console.error('IDトークンの取得中にエラーが発生しました:', error);
      }
    } else {
      sessionStorage.removeItem('token');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        handleTokenUpdate(authUser);
      } else {
        setUser(null);
        handleTokenUpdate(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('ログイン中にエラーが発生しました:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('ログアウト中にエラーが発生しました:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
