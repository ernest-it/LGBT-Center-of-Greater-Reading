FROM node:20-alpine

WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy application source
COPY . .

# Create uploads and database directories, then set ownership
RUN mkdir -p uploads/banners uploads/gallery uploads/news uploads/team \
    && mkdir -p database \
    && chown -R node:node /app

USER node

EXPOSE 3001

CMD ["node", "server.js"]
