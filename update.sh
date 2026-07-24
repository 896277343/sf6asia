#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/www/wwwroot/sf6asia}"
BRANCH="${BRANCH:-main}"
PM2_APP_NAME="${PM2_APP_NAME:-sf6asia}"
SYSTEMD_SERVICE="${SYSTEMD_SERVICE:-}"
USE_NPM="${USE_NPM:-0}"
PORT="${PORT:-3008}"
BIND_HOST="${BIND_HOST:-0.0.0.0}"

echo "==> Updating SF6 Asia catalogue"
echo "    App directory: ${APP_DIR}"
echo "    Branch: ${BRANCH}"
echo "    Port: ${PORT}"

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
if [ "${USE_NPM}" = "1" ]; then
  npm install
elif [ -f "pnpm-lock.yaml" ]; then
  npm install -g pnpm@9.15.9
  pnpm install --frozen-lockfile
else
  echo "pnpm-lock.yaml not found. Falling back to npm install."
  npm install
fi

echo "==> Clearing Next.js build cache"
rm -rf .next

echo "==> Building production bundle"
if [ "${USE_NPM}" = "1" ] || [ ! -f "pnpm-lock.yaml" ]; then
  npm run build
else
  pnpm run build
fi

echo "==> Restarting service"
if command -v pm2 >/dev/null 2>&1; then
  if pm2 describe "${PM2_APP_NAME}" >/dev/null 2>&1; then
    pm2 restart "${PM2_APP_NAME}" --update-env
  else
    pm2 start server.js --name "${PM2_APP_NAME}" --update-env
  fi
  pm2 save
elif [ -n "${SYSTEMD_SERVICE}" ] && command -v systemctl >/dev/null 2>&1; then
  systemctl restart "${SYSTEMD_SERVICE}"
else
  echo "PM2/systemd service not found. Restarting with nohup node server.js."
  if command -v lsof >/dev/null 2>&1; then
    PORT_PIDS="$(lsof -ti tcp:"${PORT}" || true)"
    if [ -n "${PORT_PIDS}" ]; then
      kill ${PORT_PIDS}
      sleep 2
    fi
  elif command -v fuser >/dev/null 2>&1; then
    fuser -k "${PORT}/tcp" || true
    sleep 2
  fi
  PORT="${PORT}" BIND_HOST="${BIND_HOST}" nohup node server.js > server.log 2>&1 &
  sleep 3
fi

echo "==> Checking local service"
if command -v curl >/dev/null 2>&1; then
  curl -fsS "http://127.0.0.1:${PORT}/" >/dev/null
fi

echo "==> Done"
