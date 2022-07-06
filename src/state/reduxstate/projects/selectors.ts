import { AppState } from '../types';

export const projectsSelector = (s: AppState) => s.projects.projects;
