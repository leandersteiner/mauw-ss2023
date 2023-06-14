import { AddUserToProjectRequest, CreateProjectRequest, Project } from '../models/project/Project';
import { api } from './api';

export const getProjects = () => api.get<Project[]>('projects').then(res => res.data);

export const getProjecById = (projectId: string) =>
  api.get<Project>(`projects/${projectId}`).then(res => res.data);

export const getOrganisationProjects = (orgId: string) =>
  api.get<Project[]>(`projects/orgs/${orgId}/projects`).then(res => res.data);

export const getTeamProjects = (orgId: string, teamId: string) =>
  api.get<Project[]>(`projects/orgs/${orgId}/teams/${teamId}/projects`).then(res => res.data);

export const createProject = (
  orgId: string,
  teamId: string,
  createProjectRequest: CreateProjectRequest
) =>
  api
    .post<Project>(`projects/orgs/${orgId}/teams/${teamId}/projects`, createProjectRequest)
    .then(res => res.data);

export const addUserToProject = (
  orgId: string,
  teamId: string,
  projectId: string,
  addUserToProjectRequest: AddUserToProjectRequest
) =>
  api
    .post<Project>(
      `projects/orgs/${orgId}/teams/${teamId}/projects/${projectId}`,
      addUserToProjectRequest
    )
    .then(res => res.data);

export const deleteProject = (orgId: string, teamId: string, projectId: string) =>
  api.delete(`projects/orgs/${orgId}/teams/${teamId}/projects/${projectId}`);
