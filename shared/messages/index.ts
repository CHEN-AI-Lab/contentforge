// ─── ContentForge i18n Messages ───

import zhCN from './zh-CN.json';
import en from './en.json';

export const messages: Record<string, Record<string, unknown>> = {
  'zh-CN': zhCN as Record<string, unknown>,
  'en': en as Record<string, unknown>,
};

export type MessageKey = keyof typeof zhCN;
export type Messages = typeof zhCN;
