# https://www.sentinelstand.com/article/docker-with-node-in-development-and-production

# Base
FROM node:16 AS base
WORKDIR /app

# Builder
FROM base AS builder
COPY [ "package.json", "package-lock.json", ".babelrc", "./" ]
RUN npm install
COPY . .
RUN cp -n .env.example .env
RUN npm run build

# Release
FROM base AS release
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env

EXPOSE 3000
EXPOSE 3001

USER node

VOLUME [ "/app/build/assets" ]

CMD [ "npm", "run", "docker-start" ]