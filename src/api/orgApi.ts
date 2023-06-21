import {
  AddUserToOrganisationRequest,
  CreateOrganisationRequest,
  Organisation
} from '../models/organisation/Organisation';
import { api } from './api';

export const getOrgs = () => api.get<Organisation[]>('orgs').then(res => res.data);

export const getOrgById = (orgId: string) =>
  api.get<Organisation>(`orgs/${orgId}`).then(res => res.data);

export const createOrg = (createOrgRequest: CreateOrganisationRequest) =>
  api.post<Organisation>('orgs', createOrgRequest).then(res => res.data);

export const addUserToOrg = (addUserToOrgRequest: AddUserToOrganisationRequest) =>
  api
    .post<Organisation>(`orgs/${addUserToOrgRequest.organisationId}`, addUserToOrgRequest)
    .then(res => res.data);

export const deleteOrg = (orgId: string) => api.delete(`orgs/${orgId}`).then(res => res.status);
