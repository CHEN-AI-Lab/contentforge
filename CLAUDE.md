# ContentForge — AI Content Repurposing Tool

## Tech Stack
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript (strict)
- **Styling**: Tailwind CSS 3 + PostCSS + Autoprefixer
- **i18n**: next-intl v3.26 (zh-CN + en, cookie-only)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Linting**: ESLint 9 + eslint-config-next
- **Deploy**: Vercel

## Project Structure
```
contentforge/
├── app/              ← Pages, layouts, API routes
├── shared/           ← Types, constants, validators, utils, api, hooks, messages
├── docs/             ← Architecture, progress, decisions
├── scripts/          ← Setup, check, deploy
├── tests/            ← Unit + E2E tests
└── public/           ← Static assets
```

## Commands
```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm test             # Run tests
pnpm test:e2e         # Run E2E tests
pnpm lint             # Lint check
scripts/check.sh      # Full quality gate
```

## Quality Gates (run before push)
- [ ] tsc --noEmit (no type errors)
- [ ] lint pass (no style violations)
- [ ] vitest run (all tests pass)
- [ ] pnpm build (build passes)
- [ ] No console.log in production code
- [ ] No hardcoded secrets
- [ ] Docs updated (architecture.md / decisions.md / progress.md)

## Documentation Rule
每次修改功能或新增功能，必须同步更新相关文档：
- 架构/功能变化 → 更新 `docs/architecture.md`
- 技术决策 → 更新 `docs/decisions.md`（新增 ADR）
- 进度 → 更新 `docs/progress.md`
- 这条规则对所有 Agent 生效，不可跳过。

## Architecture
- `shared/` → all cross-platform code (types, constants, validators, utils, api client, hooks, messages)
- `app/` → page components and API routes only
- AI calls wrapped in provider-agnostic layer
- Zod schemas shared between client and server

## Deploy
- Production: Vercel auto-deploy on main branch push