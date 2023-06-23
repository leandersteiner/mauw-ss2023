import { User } from '../models/user/User';
import { api } from './api';

export type AuthResponse = {
  token: string;
  user: User;
};

const loginUser = (user: { username: string; password: string }) =>
  api.post<AuthResponse>('login', user).then(res => res.data);

const registerUser = (user: { username: string; email: string; password: string }) =>
  api.post<AuthResponse>('register', user).then(res => res.data);

export const AuthApi = {
  login: loginUser,
  register: registerUser
};
