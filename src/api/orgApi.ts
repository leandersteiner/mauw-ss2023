import { Organisation } from '../models/organisation/Organisation';
import { api } from './api';

export const getOrgs = () => api.get<Organisation[]>('orgs').then(res => res.data);
