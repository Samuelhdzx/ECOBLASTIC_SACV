import { BACKEND_URL } from '../config/api';

export const logout = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      localStorage.removeItem('user');
      localStorage.removeItem('admin');
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('authChange'));
    }
  } catch (error) {
    console.error('Error durante el logout:', error);
    // Limpiar localStorage aunque falle la petición
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange'));
  }
};