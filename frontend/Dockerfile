FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npm run build:generator

FROM node:22-alpine

ARG NUXT_PUBLIC_API_BASE

WORKDIR /app

COPY --from=builder /app/.output .output
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/generation ./generation

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
