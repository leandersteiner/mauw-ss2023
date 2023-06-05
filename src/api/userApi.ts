import { User } from '../models/user/User';
import { api } from './api';

type UserResponse = User;

export const getUser = (userId: string) =>
  api.get<UserResponse>(`users/${userId}`).then(res => res.data);

export const updateUser = (userId: string, data: { email: string }) =>
  api.patch<UserResponse>(`users/${userId}`, data).then(res => res.data);

export const deleteUser = (userId: string) => api.delete(`users/${userId}`);
