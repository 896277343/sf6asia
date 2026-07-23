#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/www/wwwroot/sf6asia}"
BRANCH="${BRANCH:-main}"
PM2_APP_NAME="${PM2_APP_NAME:-sf6asia}"

echo "==> Updating SF6 Asia catalogue"
echo "    App directory: ${APP_DIR}"
echo "    Branch: ${BRANCH}"

if [ ! -d "${APP_DIR}/.git" ]; then
  echo "ERROR: ${APP_DIR} is not a git project."
  echo "Clone it first:"
  echo "  git clone https://github.com/896277343/sf6asia.git ${APP_DIR}"
  exit 1
fi

cd "${APP_DIR}"

echo "==> Fetching latest code"
git fetch origin "${BRANCH}"
git checkout "${BRANCH}"
git pull --ff-only origin "${BRANCH}"

echo "==> Installing dependencies"
if command -v pnpm >/dev/null 2>&1; then
  pnpm install --frozen-lockfile
else
  echo "pnpm not found. Trying corepack..."
  corepack enable
  corepack pnpm install --frozen-lockfile
fi

echo "==> Building production bundle"
npm run build

echo "==> Restarting service"
if command -v pm2 >/dev/null 2>&1; then
  if pm2 describe "${PM2_APP_NAME}" >/dev/null 2>&1; then
    pm2 restart "${PM2_APP_NAME}" --update-env
  else
    pm2 start server.js --name "${PM2_APP_NAME}" --update-env
  fi
  pm2 save
else
  echo "PM2 is not installed. Restart the Baota Node project manually."
  echo "Baota start file: server.js"
  echo "Start command: node server.js"
fi

echo "==> Done"
