import { Team } from '../models/team/Team';
import { api } from './api';

export const getTeams = () => api.get<Team[]>('teams').then(res => res.data);
