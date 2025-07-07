// Configuración de URLs de API
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:1337/api',
    backendURL: 'http://localhost:1337'
  },
  production: {
    baseURL: 'https://ecoblastic-sacv.onrender.com/api',
    backendURL: 'https://ecoblastic-sacv.onrender.com'
  }
};

const environment = import.meta.env.MODE === 'development' ? 'development' : 'production';
export const API_BASE_URL = API_CONFIG[environment].baseURL;
export const BACKEND_URL = API_CONFIG[environment].backendURL;

console.log('🌐 API Configuration:', {
  environment,
  API_BASE_URL,
  BACKEND_URL
});