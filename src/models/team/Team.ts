// eslint-disable-next-line import/no-cycle
import { Organisation } from '../organisation/Organisation';
// eslint-disable-next-line import/no-cycle
import { Project } from '../project/Project';
import { User } from '../user/User';

export interface Team {
  id: string;
  name: string;
  private: boolean;
  owner: User;
  members: User[];
  projects: Project[];
  organisation: Organisation;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTeamRequest {
  orgId: string;
  body: CreateTeamRequestData;
}

export interface CreateTeamRequestData {
  name: string;
  private: boolean;
}

export interface AddUserToTeamRequest {
  orgId: string;
  teamId: string;
  body: { userId: string };
}
