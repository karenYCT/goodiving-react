// 主要負責處理認證相關的狀態，如使用者登入狀態、認證令牌（token）、權限
import { createContext, useContext, useState, useEffect } from 'react';
import { AUTH_LOGIN } from '@/configs/api-path';

const AuthContext = createContext(null);

const storageKey = 'goodiving-auth';

export function AuthContextProvider({ children }) {
  const emptyAuth = {
    role_id: 0,
    user_full_name: '',
    user_id: 0,
    token: '',
    user_email: '',
  };
  // (JWT)如果有登入可以從後端拿到的資料
  const [auth, setAuth] = useState(emptyAuth);

  // 登入相關的錯誤訊息
  const [errorMessage, setErrorMessage] = useState({
    success: false,
    code: 0,
    error: '',
  });

  // 控制 loginModal
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // 登出
  const logout = () => {
    localStorage.removeItem(storageKey);
    setAuth({ ...emptyAuth });
    console.log('看一下auth:', JSON.stringify(auth, null, 4));
  };

  // 登入
  const login = async (email, password) => {
    let result = { success: false };

    setErrorMessage({
      success: false,
      code: 0,
      error: '',
    });

    try {
      const response = await fetch(AUTH_LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      result = await response.json();
      console.log(
        '這是伺服器回應過來的result',
        JSON.stringify(result, null, 4)
      );

      if (!result.success) {
        // 處理錯誤或顯示錯誤消息
        setErrorMessage((prev) => ({
          ...prev,
          code: result.code,
          error: result.error,
        }));
        // return { success: false, error: result.error };
      } else {
        // 請求成功
        localStorage.setItem(storageKey, JSON.stringify(result.data));
        setErrorMessage((prev) => ({
          ...prev,
          success: true,
        }));
        console.log('看一下result.data :', result.data);
        setAuth(result.data);
        // return { success: true };
      }
    } catch (ex) {
      console.log(ex);
    }
    console.log('看一下auth:', JSON.stringify(auth, null, 4));
  };

  // 拿Header資料
  const getAuthHeader = () => {
    if (auth.token) {
      return { Authorization: 'Bearer ' + auth.token };
    } else {
      return {};
    }
  };

  // 看看localstorage有沒有登入的資料
  useEffect(() => {
    const str = localStorage.getItem(storageKey);
    try {
      const data = JSON.parse(str);
      if (data) {
        setAuth(data);
      }
    } catch (ex) {}
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        errorMessage,
        getAuthHeader,
        login,
        logout,
        isOpen,
        closeModal,
        openModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
