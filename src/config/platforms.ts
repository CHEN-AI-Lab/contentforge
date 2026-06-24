import type { PlatformMeta, PlatformId } from "@/types/content";

export const PLATFORMS: PlatformMeta[] = [
  {
    id: "xiaohongshu",
    name: "小红书",
    icon: "📕",
    description: "种草笔记 + 分段 + 话题",
    help: "生成带 emoji、清单体和互动结尾的笔记正文，适合图文/短视频配文。",
    maxChars: 1000,
  },
  {
    id: "wechat",
    name: "公众号",
    icon: "💬",
    description: "摘要 + 小标题结构",
    help: "生成公众号推文用的摘要、分级标题和文末引导，可直接粘贴到编辑器。",
    maxChars: 500,
  },
  {
    id: "weibo",
    name: "微博",
    icon: "🔥",
    description: "短文案 + 热搜话题",
    help: "压缩为 280 字内的微博正文，并附带 #话题# 标签。",
    maxChars: 280,
  },
  {
    id: "douyin",
    name: "抖音口播",
    icon: "🎬",
    description: "分镜口播脚本（45–60 秒）",
    help: "不是「优化已有视频」，而是根据长文生成：分段时间轴、口播词、画面建议、字幕与评论区话术，对着镜头念即可拍。",
    maxChars: 1200,
  },
  {
    id: "shipinhao",
    name: "微信视频号",
    icon: "📹",
    description: "标题 + 描述 + 1–3 分钟脚本",
    help: "生成视频号专用的发布标题、描述区文案和稍长的口播脚本（比抖音更偏私域、可稍正式）。",
    maxChars: 1500,
  },
  {
    id: "bilibili",
    name: "B站",
    icon: "📺",
    description: "标题 + 简介 + 3–5 分钟脚本",
    help: "生成 B 站投稿标题、视频简介、分段时间轴口播、弹幕互动点与投稿分区建议，偏年轻用户与深度内容。",
    maxChars: 1500,
  },
  {
    id: "seo",
    name: "SEO 标题包",
    icon: "🔍",
    description: "搜索标题 + 页面描述 + 关键词",
    help: "SEO = 搜索引擎优化。生成让人想点击的标题、搜得到你的关键词，以及用于网页/公众号摘要的 Meta 描述，方便百度、微信搜一搜、知乎等收录。",
    maxChars: 800,
  },
];

export const PLATFORM_IDS: PlatformId[] = PLATFORMS.map((p) => p.id);

export const TONE_OPTIONS = [
  { id: "casual" as const, label: "轻松口语", desc: "像跟朋友聊天" },
  { id: "professional" as const, label: "专业可信", desc: "适合 B2B、知识类" },
  { id: "viral" as const, label: "爆款吸睛", desc: "强钩子、短句、情绪词" },
];

export const FREE_DAILY_LIMIT = 5;

export const PRICING = {
  free: { name: "免费版", price: 0, limit: 5 },
  pro: { name: "专业版", price: 29, limit: 200 },
  team: { name: "团队版", price: 99, limit: 1000 },
} as const;
