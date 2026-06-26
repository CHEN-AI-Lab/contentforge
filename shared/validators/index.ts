// ─── ContentForge Validators ───
import { z } from 'zod';

export const localeSchema = z.enum(['zh-CN', 'en']);

export const contentSourceSchema = z.enum(['youtube', 'podcast', 'article', 'blog', 'social']);

export const outputFormatSchema = z.enum([
  'article', 'social-post', 'email', 'newsletter', 'summary', 'transcript',
]);

export const projectCreateSchema = z.object({
  title: z.string().min(1).max(200),
  sourceUrl: z.string().url(),
  sourceType: contentSourceSchema,
  locale: localeSchema.default('zh-CN'),
  tags: z.array(z.string()).max(10).default([]),
});

export const repurposeRequestSchema = z.object({
  projectId: z.string().min(1),
  sourceType: contentSourceSchema,
  outputFormats: z.array(outputFormatSchema).min(1).max(6),
  tone: z.string().min(1).max(50),
  targetLength: z.enum(['short', 'medium', 'long']),
  targetLocale: localeSchema,
  includeKeyPoints: z.boolean().default(true),
  brandVoice: z.string().max(500).optional(),
});

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type RepurposeRequest = z.infer<typeof repurposeRequestSchema>;
