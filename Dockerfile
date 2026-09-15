FROM node:24.21.0-alpine@sha256:be80f76cf40ec8e42b9bec49f60a55e0660f30af58d3e5a25530785b30ea67e2 AS base

FROM oven/bun@sha256:5ff609364c049b54eb0ff560ec96319729a972078ef2c755d758f0c6ef89c2d6 AS deps
WORKDIR /app

COPY bun.lock package.json ./
COPY patches ./patches
RUN bun install --frozen-lockfile 

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_SHARP_PATH=/app/node_modules/sharp
RUN realpath . 

ARG COMMIT_HASH
ENV NEXT_PUBLIC_COMMIT_HASH=${COMMIT_HASH}

RUN npm run build --webpack

# Production image, copy all the files and run next
FROM node:24.21.0-alpine@sha256:be80f76cf40ec8e42b9bec49f60a55e0660f30af58d3e5a25530785b30ea67e2 AS runner
WORKDIR /app

ARG COMMIT_HASH
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_COMMIT_HASH=${COMMIT_HASH}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]