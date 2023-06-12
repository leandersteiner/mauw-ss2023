import { Board } from '../board/Board';
import { Team } from '../team/Team';
import { User } from '../user/User';

export interface Project {
  id: string;
  name: string;
  private: boolean;
  owner: User;
  team: Team;
  members: User[];
  boards: Board[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectRequest {
  name: string;
  private: boolean;
}

export interface AddUserToProjectRequest {
  userId: string;
}
