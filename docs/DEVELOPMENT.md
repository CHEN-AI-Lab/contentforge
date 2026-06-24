# DEVELOPMENT.md — 开发指南

## 项目架构

```
contentforge/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── page.tsx            # 首页（落地页）
│   │   ├── layout.tsx          # 根布局（Header + Footer）
│   │   ├── globals.css         # 全局样式
│   │   ├── tool/               # 内容改编工具
│   │   ├── pricing/            # 定价页面
│   │   ├── blog/               # 博客列表 + 详情
│   │   └── about/              # 关于我们
│   ├── components/             # 可复用组件
│   │   ├── Header.tsx          # 顶部导航
│   │   ├── RepurposeTool.tsx   # 核心工具组件
│   │   ├── ToolPreferences.tsx # 工具偏好设置
│   │   ├── UsageLimit.tsx      # 使用限额显示
│   │   └── Footer.tsx          # 底部信息
│   ├── config/                 # 配置文件
│   │   ├── platforms.ts        # 平台规则配置
│   │   ├── blog-posts.ts       # 博客文章数据
│   │   └── tone-styles.ts      # 语气风格配置
│   ├── lib/                    # 工具函数
│   │   ├── usage-limit.ts      # 使用限额逻辑
│   │   ├── tool-preferences.ts # 偏好存储
│   │   └── utils.ts            # 通用工具
│   ├── services/               # 业务逻辑
│   │   ├── repurpose.ts        # 内容改编引擎
│   │   └── tone-style.ts       # 语气风格转换
│   └── types/                  # TypeScript 类型
│       └── content.ts          # 内容类型定义
├── public/                     # 静态资源
├── docs/                       # 项目文档
│   ├── README.md
│   ├── DEVELOPMENT.md
│   ├── API.md
│   └── product-specs/
│       ├── monetization.md
│       └── pages.md
├── scripts/                    # 辅助脚本
│   ├── fix-char.py             # 修复特殊字符
│   ├── fix-tags.py             # 修复标签
│   └── write-footer.py         # 生成页脚
├── next.config.js
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

## 技术栈

| 组件 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 样式 | Tailwind CSS |
| 语言 | TypeScript |
| 存储 | localStorage（无需数据库） |
| 部署 | Vercel / 本地 |

## 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
node node_modules/next/dist/bin/next dev

# 构建生产版本
node node_modules/next/dist/bin/next build

# 运行生产版本
node node_modules/next/dist/bin/next start
```

## 目录说明

### `src/app/` — 页面路由

- `page.tsx` — 首页，展示产品价值主张和 CTA
- `layout.tsx` — 根布局，包含 Header 和 Footer
- `tool/page.tsx` — 核心工具页面，用户输入母版内容并选择平台
- `pricing/page.tsx` — 定价页面，展示三个档位
- `blog/page.tsx` — 博客列表
- `blog/[slug]/page.tsx` — 博客文章详情（动态路由）
- `about/page.tsx` — 关于我们
- `api/repurpose/route.ts` — API 路由，处理内容改编请求

### `src/components/` — 组件

- `Header.tsx` — 顶部导航，包含 Logo、导航链接、登录/注册按钮
- `RepurposeTool.tsx` — 核心工具，包含输入区、平台选择、语气选择、生成按钮
- `ToolPreferences.tsx` — 工具偏好设置，可保存常用平台组合和语气
- `UsageLimit.tsx` — 显示当前使用次数和剩余次数
- `Footer.tsx` — 底部信息，包含版权、链接

### `src/config/` — 配置

- `platforms.ts` — 7 大平台的改编规则（字数、格式、标签、表情）
- `blog-posts.ts` — 博客文章数据（标题、slug、摘要、内容、标签）
- `tone-styles.ts` — 三种语气的转换规则（轻松口语、专业可信、爆款吸睛）

### `src/services/` — 业务逻辑

- `repurpose.ts` — 内容改编引擎，根据平台规则和语气风格生成目标内容
- `tone-style.ts` — 语气风格转换，将文本转换为指定语气

### `src/lib/` — 工具函数

- `usage-limit.ts` — 使用限额管理（localStorage 存储）
- `tool-preferences.ts` — 偏好设置管理（localStorage 存储）

### `src/types/` — TypeScript 类型

- `content.ts` — 定义 Content、PlatformOutput、ToneStyle 等类型

## 核心流程

```
用户输入母版内容
    ↓
选择目标平台（可多选）
    ↓
选择语气风格
    ↓
点击「生成」
    ↓
调用 repurpose() 引擎
    ↓
按平台规则改编内容
    ↓
返回多平台版本
    ↓
用户复制/导出
```

## 平台规则示例（`src/config/platforms.ts`）

```typescript
export const PLATFORM_RULES = {
  xiaohongshu: {
    maxWords: 1000,
    format: 'emoji + 清单体 + 互动结尾',
    tags: true,
    emojis: true,
  },
  wechat: {
    maxWords: 3000,
    format: '摘要 + 分级标题 + 文末引导',
    tags: false,
    emojis: false,
  },
  // ...
}
```

## 数据流

```
localStorage
├── usageCount: number        // 已使用次数
├── lastResetDate: string     // 上次重置日期
├── preferences: {
│   ├── defaultPlatforms: string[]
│   ├── defaultTone: string
│   └── autoGenerate: boolean
│   }
└── generatedHistory: Array<{
    id: string
    timestamp: number
    platforms: string[]
    tone: string
    content: string
    }>
```

## 部署

```bash
# Vercel 一键部署
# 1. 将项目推送到 GitHub
# 2. 在 Vercel 中导入项目
# 3. Vercel 自动检测 Next.js 并配置
# 4. 点击 Deploy

# 本地部署
node node_modules/next/dist/bin/next build
node node_modules/next/dist/bin/next start -p 3000
```
