import { post } from './apiService';

export async function login(email, password) {
  const response = await post('/auth/login', { email, password });

  return response;
};

export async function register(name, email, password) {
  const response = await post('/auth/register', { name, email, password });

  return response;
};
