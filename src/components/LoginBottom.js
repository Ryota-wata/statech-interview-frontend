import React from 'react';
import Button from './Button';
import { useAuth } from './Auth';

const LoginBottom = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <Button color="warning" variant="contained" size="small" component="a" href="/me" sx={{ marginRight: 2 }}>
            戦歴
          </Button>
          <Button color="error" variant="contained" size="small" onClick={logout}>
            ログアウト
          </Button>
        </div>
      ) : (
        <Button color="error" variant="contained" size="small" onClick={login}>
          ログイン
        </Button>
      )}
    </div>
  );
};

export default LoginBottom;
