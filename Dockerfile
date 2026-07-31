# ===================================================
# SnapLoad — Universal Video Downloader
# Multi-stage Docker build
# ===================================================

# Stage 1: Build the frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS production

# Install system dependencies: FFmpeg, Python3 (for yt-dlp), curl
RUN apk add --no-cache \
    ffmpeg \
    python3 \
    py3-pip \
    curl \
    ca-certificates \
    && pip3 install --no-cache-dir --break-system-packages "yt-dlp[default,curl-cffi]" \
    && yt-dlp --version

# Install Deno (required JS runtime for yt-dlp YouTube extraction)
RUN curl -fsSL https://deno.land/install.sh | sh \
    && mv /root/.deno/bin/deno /usr/local/bin/deno \
    && chmod +x /usr/local/bin/deno \
    && rm -rf /root/.deno

WORKDIR /app

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev

# Copy server source
COPY server/ ./server/

# Copy built frontend from Stage 1
COPY --from=frontend-build /app/client/dist ./client/dist

# Environment
ENV NODE_ENV=production
ENV PORT=3001

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3001/api/health || exit 1

EXPOSE 3001

# Run as non-root user for security
RUN addgroup -g 1001 -S snapload && \
    adduser -S snapload -u 1001 -G snapload

# Create tmp directory for merged downloads (writable by snapload)
RUN mkdir -p /app/server/tmp && chown snapload:snapload /app/server/tmp

USER snapload

CMD ["node", "server/src/server.js"]
