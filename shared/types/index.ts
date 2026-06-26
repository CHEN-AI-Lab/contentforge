// ─── ContentForge Core Types ───

export type Locale = 'zh-CN' | 'en';

export type ContentSource = 'youtube' | 'podcast' | 'article' | 'blog' | 'social';

export type OutputFormat = 'article' | 'social-post' | 'email' | 'newsletter' | 'summary' | 'transcript';

export type ContentStatus = 'draft' | 'processing' | 'completed' | 'failed' | 'archived';

export interface Project {
  id: string;
  title: string;
  sourceUrl: string;
  sourceType: ContentSource;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  locale: Locale;
  tags: string[];
}

export interface GeneratedContent {
  id: string;
  projectId: string;
  format: OutputFormat;
  title: string;
  content: string;
  status: ContentStatus;
  createdAt: string;
  wordCount: number;
  language: Locale;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferredLocale: Locale;
  createdAt: string;
}

export interface RepurposingConfig {
  sourceType: ContentSource;
  outputFormats: OutputFormat[];
  tone: string;
  targetLength: 'short' | 'medium' | 'long';
  targetLocale: Locale;
  includeKeyPoints: boolean;
  brandVoice?: string;
}
