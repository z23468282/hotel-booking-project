import { RegisterFormData } from './pages/Register';
import { signInFormData } from './pages/SignIn';

const API_BASE_URL = 'http://localhost:3000' || '';

export const register = async (formData: RegisterFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include', //請求包含http cookie
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
};

export const signIn = async (formData: signInFormData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'ConTent-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('驗證無效');
  }

  return res.json();
};

export const signOut = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('登出時發生問題');
  }
};
