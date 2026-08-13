// ─── ContentForge Constants ───

export const APP_NAME = 'ContentForge';

export const SUPPORTED_LOCALES: Array<{ code: string; label: string }> = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en', label: 'English' },
];

export const CONTENT_SOURCES = [
  { value: 'youtube', label: 'YouTube Video' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'article', label: 'Article / Blog' },
  { value: 'blog', label: 'Blog Post' },
  { value: 'social', label: 'Social Media' },
] as const;

export const OUTPUT_FORMATS = [
  { value: 'article', label: 'Long-form Article' },
  { value: 'social-post', label: 'Social Media Post' },
  { value: 'email', label: 'Email Newsletter' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'summary', label: 'Executive Summary' },
  { value: 'transcript', label: 'Transcript' },
] as const;

export const TONES = [
  'professional',
  'casual',
  'enthusiastic',
  'educational',
  'persuasive',
  'conversational',
] as const;

export const MAX_CONTENT_LENGTH = 10000;
export const MIN_CONTENT_LENGTH = 100;

export const API_ROUTES = {
  projects: '/api/projects',
  generate: '/api/generate',
  content: '/api/content',
  user: '/api/user',
} as const;

export const WORKER_URL =
  (typeof process !== 'undefined' &&
    (process as any).env?.NEXT_PUBLIC_WORKER_URL) ||
  'https://stats.aaigc.workers.dev'

// Fallback tracking endpoint for users who cannot reach the Worker (e.g. China)
// Sends tracking data directly to the stats-dashboard API.
// Must be set via NEXT_PUBLIC_FALLBACK_URL env var — no hardcoded default.
export const FALLBACK_URL =
  (typeof process !== 'undefined' &&
    (process as any).env?.NEXT_PUBLIC_FALLBACK_URL) || ''
