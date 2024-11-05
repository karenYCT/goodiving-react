import { createContext, useContext, useState } from 'react';
import { AUTH_LOGIN } from '@/configs/api-path';

const AuthContext = createContext(null);

const emptyAuth = {
  id: 0,
  name: '',
  role: 0,
  token: '',
};
const storageKey = 'goodiving-auth';

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(emptyAuth);

  const logout = () => {
    localStorage.removeItem(storageKey);
    setAuth({ ...emptyAuth });
  };

  const login = async (email, password) => {
    try {
      const r = await fetch(AUTH_LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      result = await r.json();
      console.log(JSON.stringify(result, null, 4));

      if (result.success) {
        localStorage.setItem(storageKey, JSON.stringify(result.data));
        setAuth(result.data);
      }
    } catch (ex) {}
  };

  const getAuthHeader = () => {
    if (auth.token) {
      return { Authorization: 'Bearer ' + auth.token };
    } else {
      return {};
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
