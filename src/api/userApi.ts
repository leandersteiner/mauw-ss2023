import { User } from '../models/user/User';
import { api } from './api';

export type UserResponse = User;

type UpdateUserRequest = Partial<User>;

export const getUser = (userId: string) =>
  api.get<UserResponse>(`users/${userId}`).then(res => res.data);

export const updateUser = (userId: string) => (data: UpdateUserRequest) =>
  api.patch<UserResponse>(`users/${userId}`, data).then(res => res.data);

export const deleteUser = (userId: string) => api.delete(`users/${userId}`);
