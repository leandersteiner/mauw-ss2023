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
