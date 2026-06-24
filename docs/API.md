# API.md — API 参考

## 概述

ContentForge 提供 REST API 用于内容改编。当前版本为纯前端实现，API 路由运行在 Next.js App Router 中。

## 端点

### `POST /api/repurpose`

将母版长文改编为多平台内容。

#### 请求

```http
POST /api/repurpose
Content-Type: application/json

{
  "content": "母版长文内容...",
  "platforms": ["xiaohongshu", "wechat", "weibo"],
  "tone": "casual"
}
```

#### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `content` | string | 是 | 母版长文内容 |
| `platforms` | string[] | 是 | 目标平台数组 |
| `tone` | string | 否 | 语气风格，默认 `casual` |

#### 响应

```json
{
  "success": true,
  "outputs": {
    "xiaohongshu": {
      "title": "小红书标题",
      "content": "小红书正文...",
      "tags": ["#标签1", "#标签2"]
    },
    "wechat": {
      "title": "公众号标题",
      "content": "公众号正文..."
    },
    "weibo": {
      "content": "微博短文案..."
    }
  }
}
```

## 平台类型

| 平台 | key | 输出字段 |
|------|-----|---------|
| 小红书 | `xiaohongshu` | title, content, tags |
| 公众号 | `wechat` | title, content |
| 微博 | `weibo` | content |
| 抖音 | `douyin` | title, script, timestamps |
| 视频号 | `video_account` | title, description, script |
| B 站 | `bilibili` | title, description, script |
| SEO | `seo` | title, meta_description, keywords |

## 语气风格

| 风格 | key | 说明 |
|------|-----|------|
| 轻松口语 | `casual` | 像跟朋友聊天 |
| 专业可信 | `professional` | 适合 B2B、知识类 |
| 爆款吸睛 | `viral` | 强钩子、短句、情绪词 |

## 错误响应

```json
{
  "success": false,
  "error": "Invalid content",
  "message": "内容不能为空"
}
```

## 限流

免费版每日 5 次，专业版每月 200 次，团队版每月 1000 次。

限流检查在 `src/lib/usage-limit.ts` 中实现，基于 localStorage 存储使用次数。

## 本地调用

```bash
curl -X POST http://localhost:3000/api/repurpose \
  -H "Content-Type: application/json" \
  -d '{
    "content": "这是一篇关于 AI 工具的深度文章...",
    "platforms": ["xiaohongshu", "wechat"],
    "tone": "casual"
  }'
```
