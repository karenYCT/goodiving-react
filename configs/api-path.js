// 開發環境用 localhost
const DEV_URL = 'http://localhost:3001/api';  // 或者您的後端 port，例如 3001, 8000 等

// 產品環境用實際網址
const PROD_URL = 'https://您的網域/api';

// 根據環境選擇 URL
export const API_BASE_URL = process.env.NODE_ENV === 'development' ? DEV_URL : PROD_URL;