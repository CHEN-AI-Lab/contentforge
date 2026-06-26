# ContentForge Architecture

## Overview
ContentForge is an AI-powered content repurposing tool that transforms long-form content (YouTube videos, podcasts, articles) into multiple formats (social posts, newsletters, summaries, emails, transcripts).

## Tech Stack
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript (strict)
- **Styling**: Tailwind CSS 3, Autoprefixer, PostCSS
- **i18n**: next-intl v3.26 (zh-CN + en)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Linting**: ESLint 9 + eslint-config-next
- **Build**: Next.js built-in (turbo)
- **Deploy**: Vercel

## Architecture

### Layer Architecture (dependency direction: top → bottom)
```
Pages (app/)          ← Page components, layouts
Components (shared/)  ← Shared UI components
API Routes (app/api/) ← Server endpoints
Services (lib/)       ← Business logic
Shared (shared/)      ← Types, validators, utils, api client, hooks
```

### Directory Structure
```
contentforge/
├── app/                    # Next.js App Router pages
│   ├── [locale]/           # i18n routes
│   │   ├── page.tsx        # Dashboard
│   │   ├── projects/       # Project management
│   │   └── settings/       # User settings
│   └── api/                # API routes
├── shared/                 # Cross-platform shared code
│   ├── types/              # TypeScript type definitions
│   ├── constants/          # App constants & enums
│   ├── validators/         # Zod validation schemas
│   ├── utils/              # Pure utility functions
│   ├── api/                # API client
│   ├── hooks/              # React hooks
│   └── messages/           # i18n translation files
├── docs/                   # Project documentation
├── scripts/                # Setup, check, deploy scripts
├── tests/                  # Unit & E2E tests
│   ├── unit/
│   └── e2e/
└── public/                 # Static assets
```

### Key Design Decisions
1. **Shared First** — All cross-platform logic lives in `shared/`. The `app/` directory only contains page-specific code and API routes.
2. **i18n** — next-intl with locale detection, `zh-CN` default. Messages live in `shared/messages/`.
3. **Validation** — Zod schemas in `shared/validators/` used on both client and server.
4. **AI Integration** — OpenAI-compatible API via `lib/ai.ts`. Provider-agnostic interface for flexibility.

## Data Flow
1. User pastes source URL → Frontend validates via Zod → POST /api/projects
2. Server queues content fetch + AI repurposing → Returns project ID
3. Frontend polls GET /api/content/:id → Displays generated content
4. All generated content stored in DB for future reference