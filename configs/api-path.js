// 開發環境用 localhost
const DEV_URL = 'http://localhost:3001/api'; // 或者您的後端 port，例如 3001, 8000 等

// 產品環境用實際網址
const PROD_URL = 'https://您的網域/api';

// 根據環境選擇 URL
export const API_BASE_URL =
  process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;

export const API_SERVER = `http://192.168.37.192:3001`;

// **** 讀取 method: POST
export const MEMBER_LIST = `${API_SERVER}/profile`;

// **** 登入, method: POST
export const AUTH_LOGIN = `${API_SERVER}/auth/login`;

// **** 註冊, method: POST
export const AUTH_REGISTER = `${API_SERVER}/auth/register`;

// **** 編輯會員個人資料, method: PUT
export const AUTH_MODIFY = `${API_SERVER}/profile/modify`;

// **** 編輯會員密碼資料, method: PUT
export const AUTH_MODIFYPSD = `${API_SERVER}/profile/modifypsd`;

// shirley 教室 http://192.168.37.187:3001
// shirley 家裡 http://192.168.1.106:3001

// karen 教室 http://192.168.37.192:3001
// karen 家裡 http://192.168.1.165:3001
