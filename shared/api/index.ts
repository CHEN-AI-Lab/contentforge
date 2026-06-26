// ─── ContentForge API Client ───

import type { Project, GeneratedContent, RepurposingConfig } from '../types';

const BASE_URL = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `API error: ${res.status}`);
  }
  return res.json();
}

export const projectsApi = {
  list: () => request<Project[]>('/projects'),
  get: (id: string) => request<Project>(`/projects/${id}`),
  create: (data: Partial<Project>) =>
    request<Project>('/projects', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<void>(`/projects/${id}`, { method: 'DELETE' }),
};

export const contentApi = {
  list: (projectId: string) =>
    request<GeneratedContent[]>(`/content?projectId=${projectId}`),
  generate: (config: RepurposingConfig) =>
    request<GeneratedContent>('/generate', { method: 'POST', body: JSON.stringify(config) }),
  get: (id: string) => request<GeneratedContent>(`/content/${id}`),
};
