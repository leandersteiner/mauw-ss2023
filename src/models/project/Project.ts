import { Board } from '../board/Board';
// eslint-disable-next-line import/no-cycle
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
  orgId: string;
  teamId: string;
  body: CreateProjectBodyData;
}

export interface CreateProjectBodyData {
  name: string;
  private: boolean;
}

export interface AddUserToProjectRequest {
  userId: string;
}
