#!/usr/bin/env bash
# Quality gate check - run before every push
set -euo pipefail

echo "🔍 Running quality gate checks..."
echo ""

# TypeScript check
echo "📝 TypeScript check..."
npx tsc --noEmit || { echo "❌ TypeScript check failed"; exit 1; }
echo "✅ TypeScript check passed"
echo ""

# Lint check
echo "🔎 Lint check..."
pnpm lint || { echo "❌ Lint check failed"; exit 1; }
echo "✅ Lint check passed"
echo ""

# Unit tests
echo "🧪 Running tests..."
pnpm test || { echo "❌ Tests failed"; exit 1; }
echo "✅ Tests passed"
echo ""

# Build check
echo "🏗️  Build check..."
pnpm build || { echo "❌ Build failed"; exit 1; }
echo "✅ Build passed"
echo ""

echo "🎉 All quality gates passed!"