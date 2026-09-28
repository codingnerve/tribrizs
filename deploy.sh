#!/usr/bin/env bash
set -e

echo "🚀 Deploying Tribrizs update..."

# Pull latest code
echo "📦 Pulling latest changes from GitHub..."
git pull origin main

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Build Next.js
echo "⚙️ Building Next.js application..."
npm run build

# Reload PM2 cluster with zero-downtime
echo "🔄 Reloading PM2 processes..."
pm2 reload ecosystem.config.cjs || pm2 start ecosystem.config.cjs

echo "✅ Deployment complete and online!"
