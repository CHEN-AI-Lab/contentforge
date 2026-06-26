# ContentForge Architecture Decision Records

## ADR-001: Use Next.js 15 App Router
**Date**: 2025-06-01
**Status**: Accepted

**Context**: Need a modern React framework with SSR support for SEO and fast initial loads.

**Decision**: Use Next.js 15 with App Router for file-based routing, server components, and API routes.

**Consequences**: Leverages React 19 features, turbopack for fast builds, and server actions for form handling.

---

## ADR-002: Shared Package for Cross-Platform Code
**Date**: 2025-06-01
**Status**: Accepted

**Context**: Code (types, validators, utils) needs to be shared between frontend and API routes.

**Decision**: Create a `shared/` package at the project root with barrel exports.

**Consequences**: No circular dependencies. API routes import validators directly. Future monorepo conversion straightforward.

---

## ADR-003: Zod for Validation
**Date**: 2025-06-01
**Status**: Accepted

**Context**: Need runtime validation that works on both client and server.

**Decision**: Use Zod for all input validation schemas, co-located in `shared/validators/`.

**Consequences**: TypeScript types inferred from schemas, single source of truth for validation.

---

## ADR-004: next-intl for Internationalization
**Date**: 2025-06-01
**Status**: Accepted

**Context**: Need bilingual support (zh-CN + en) with minimal runtime overhead.

**Decision**: Use next-intl v3.26 with cookie-only locale detection (no middleware).

**Consequences**: Messages stored in JSON files in `shared/messages/`, imported by both pages and components.

---

## ADR-005: OpenAI-Compatible API Abstraction
**Date**: 2025-06-01
**Status**: Accepted

**Context**: AI provider may change (OpenAI → SenseTime → Anthropic).

**Decision**: Wrap AI calls in a provider-agnostic `lib/ai.ts` layer. API routes never call AI SDKs directly.

**Consequences**: Provider changes require only updating `lib/ai.ts`.