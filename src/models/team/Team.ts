// eslint-disable-next-line import/no-cycle
import { Organisation } from '../organisation/Organisation';
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
