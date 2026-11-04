# syntax=docker/dockerfile:1

ARG NODE_IMAGE=node:24-alpine

# Build stage: install, verify and pack the package. Dev dependencies stay here.
FROM ${NODE_IMAGE} AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY examples/moderation-bot/package.json examples/moderation-bot/
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run lint \
 && pnpm run typecheck \
 && pnpm test \
 && pnpm run build \
 && mkdir -p /out \
 && pnpm pack --pack-destination /out

# Runtime stage: only the built package, run as the unprivileged node user.
FROM ${NODE_IMAGE} AS runtime
ARG VERSION=0.1.0
ARG REVISION=unknown
LABEL org.opencontainers.image.title="@discordy-voics/bots" \
      org.opencontainers.image.description="Voics bot SDK: built package with ESM and CommonJS entry points" \
      org.opencontainers.image.source="https://github.com/discordy-voics/bots-sdk" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.revision="${REVISION}" \
      org.opencontainers.image.licenses="UNLICENSED"
WORKDIR /opt/discordy-bots
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/package.json /app/README.md /app/CHANGELOG.md ./
USER node
# Smoke check: the published entry point must load without any node_modules.
CMD ["node", "-e", "import('/opt/discordy-bots/dist/index.js').then((sdk) => console.log('@discordy-voics/bots loaded,', Object.keys(sdk).length, 'exports'))"]
