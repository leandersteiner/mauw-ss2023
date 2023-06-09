import { Timestamp } from '../../helpers/date';

export interface Project {
  id: string;
  name: string;
  private: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateProjectRequest {
  name: string;
  private: boolean;
}

export interface AddUserToProjectRequest {
  userId: string;
}
