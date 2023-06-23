import { User } from '../models/user/User';
import { api } from './api';

export type UserResponse = User;

type UpdateUserRequest = Partial<User>;

const getUser = (userId: string) => api.get<UserResponse>(`users/${userId}`).then(res => res.data);

const getAllUsers = () => api.get<User[]>('users').then(res => res.data);

const updateUser = (userId: string) => (data: UpdateUserRequest) =>
  api.patch<UserResponse>(`users/${userId}`, data).then(res => res.data);

const deleteUser = (userId: string) => api.delete(`users/${userId}`);

export const UserApi = {
  get: getUser,
  all: getAllUsers,
  update: updateUser,
  delete: deleteUser
};
