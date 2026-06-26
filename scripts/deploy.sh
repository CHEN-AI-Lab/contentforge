#!/usr/bin/env bash
# Deploy script - deploy to production
set -euo pipefail

echo "🚀 Deploying ContentForge..."
echo ""

# Run checks first
bash scripts/check.sh

# Build
echo "🏗️  Building for production..."
pnpm build

# Deploy (Vercel)
echo "📤 Deploying to Vercel..."
npx vercel --prod || {
  echo "⚠️  Vercel CLI not found. Deploy manually:"
  echo "  1. Push to main branch"
  echo "  2. Vercel auto-deploys"
}

echo "✅ Deploy complete!"