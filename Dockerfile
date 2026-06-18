# Install dependencies only when needed
FROM oven/bun:1 AS deps
WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile


# Rebuild the source code only when needed.
# Build under Node (not bun): Next 16's prerender workers must run on Node —
# under bun they hit a React 19 prerender incompatibility (the /_global-error
# page fails with a null React dispatcher). Deps are still installed with bun.
FROM node:24-bookworm-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/bun.lock ./bun.lock
COPY --from=deps /app/package.json ./package.json

COPY . .

RUN node node_modules/.bin/next build

# Production image, copy all the files and run next
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]