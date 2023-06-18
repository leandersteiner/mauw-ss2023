import { AddUserToTeamRequest, CreateTeamRequest, Team } from '../models/team/Team';
import { api } from './api';

export const getTeams = () => api.get<Team[]>('teams').then(res => res.data);

export const getTeamById = (request: { orgId: string; teamId: string }) =>
  api.get<Team[]>(`orgs/${request.orgId}/teams/${request.teamId}`).then(res => res.data);

export const getAllTeamsOfOrg = (orgId: string) =>
  api.get<Team[]>(`orgs/${orgId}/teams`).then(res => res.data);

export const createTeam = (createTeamRequest: CreateTeamRequest) =>
  api
    .post<Team>(`orgs/${createTeamRequest.orgId}/teams`, createTeamRequest.body)
    .then(res => res.data);

export const addUserToTeam = (addUserToTeamRequest: AddUserToTeamRequest) =>
  api
    .post<Team>(
      `orgs/${addUserToTeamRequest.orgId}/teams/${addUserToTeamRequest.teamId}`,
      addUserToTeamRequest.body
    )
    .then(res => res.data);

export const deleteTeam = (orgId: string, teamId: string) =>
  api.delete(`orgs/${orgId}/teams/${teamId}`);
