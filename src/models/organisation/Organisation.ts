// eslint-disable-next-line import/no-cycle
import { Team } from '../team/Team';
import { User } from '../user/User';

export interface Organisation {
  id: string;
  name: string;
  owner: User;
  teams: Team[];
  members: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrganisationRequest {
  name: string;
  private: boolean;
}

export interface AddUserToOrganisationRequest {
  userId: string;
  organisationId: string;
}
