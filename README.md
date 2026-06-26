# ContentForge — AI Content Repurposing Tool

ContentForge transforms your long-form content (YouTube videos, podcasts, articles) into multiple formats — social posts, newsletters, summaries, emails, and transcripts — all powered by AI.

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS 3 + PostCSS + Autoprefixer
- **i18n**: next-intl v3 (zh-CN + en)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Linting**: ESLint 9 + eslint-config-next
- **Deploy**: Vercel

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Build for production
pnpm build
```

## Project Structure

```
contentforge/
├── app/              # Next.js App Router pages & API routes
├── shared/           # Cross-platform code (types, constants, validators, utils, api, hooks, messages)
├── docs/             # Architecture, progress, decisions
├── scripts/          # Setup, check, deploy scripts
├── tests/            # Unit & E2E tests
└── public/           # Static assets
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run E2E tests |
| `pnpm lint` | Lint check |
| `bash scripts/check.sh` | Full quality gate |

## Environment Setup

Copy `.env.example` to `.env.local` and fill in required values.

## Deploy

Push to `main` branch → Vercel auto-deploys.