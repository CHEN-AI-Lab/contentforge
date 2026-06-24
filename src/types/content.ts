export type PlatformId =
  | "xiaohongshu"
  | "wechat"
  | "weibo"
  | "douyin"
  | "shipinhao"
  | "bilibili"
  | "seo";

export type ContentTone = "professional" | "casual" | "viral";

export interface PlatformMeta {
  id: PlatformId;
  name: string;
  icon: string;
  /** 一句话说明这个平台产出什么 */
  description: string;
  /** 悬停时的详细说明 */
  help: string;
  maxChars: number;
}

export interface RepurposeInput {
  sourceText: string;
  platforms: PlatformId[];
  tone?: ContentTone;
}

export interface PlatformOutput {
  platform: PlatformId;
  /** 产出物类型，如「口播分镜脚本」 */
  outputType: string;
  title: string;
  body: string;
  hashtags: string[];
  tips: string[];
}

export interface RepurposeResult {
  outputs: PlatformOutput[];
  summary: string;
  wordCount: number;
  tone: ContentTone;
  toneLabel: string;
}
