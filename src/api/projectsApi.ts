import { AddUserToProjectRequest, CreateProjectRequest, Project } from '../models/project/Project';
import { api } from './api';

export const getProjects = () => api.get<Project[]>('projects').then(res => res.data);

export const getProjecById = (projectId: string) =>
  api.get<Project>(`projects/${projectId}`).then(res => res.data);

export const getOrganisationProjects = (orgId: string) =>
  api.get<Project[]>(`orgs/${orgId}/projects`).then(res => res.data);

export const getTeamProjects = (orgId: string, teamId: string) =>
  api.get<Project[]>(`orgs/${orgId}/teams/${teamId}/projects`).then(res => res.data);

export const createProject = (createProjectRequest: CreateProjectRequest) =>
  api
    .post<Project>(
      `orgs/${createProjectRequest.orgId}/teams/${createProjectRequest.teamId}/projects`,
      createProjectRequest.body
    )
    .then(res => res.data);

export const addUserToProject = (
  orgId: string,
  teamId: string,
  projectId: string,
  addUserToProjectRequest: AddUserToProjectRequest
) =>
  api
    .post<Project>(`orgs/${orgId}/teams/${teamId}/projects/${projectId}`, addUserToProjectRequest)
    .then(res => res.data);

export const deleteProject = (orgId: string, teamId: string, projectId: string) =>
  api.delete(`orgs/${orgId}/teams/${teamId}/projects/${projectId}`);
