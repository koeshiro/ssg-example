FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/.output .output
COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
