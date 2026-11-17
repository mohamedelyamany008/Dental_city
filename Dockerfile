# syntax = docker/dockerfile:1

# Multi-stage build for Dental City Node.js application on Fly.io
# Using Node.js 22 LTS (Active LTS with built-in native WebSocket support)
ARG NODE_VERSION=22-slim
FROM node:${NODE_VERSION} as base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app

ENV NODE_ENV="production"
ENV PORT="8080"

# Build stage
FROM base as build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# Copy full repository source
COPY . .

# Install dependencies in the Dental city subfolder and build
RUN npm --prefix "Dental city" install --include=dev
RUN npm run build
RUN npm --prefix "Dental city" prune --omit=dev

# Production runner stage
FROM base as runner

COPY --from=build /app /app

EXPOSE 8080

CMD [ "node", "server.js" ]
