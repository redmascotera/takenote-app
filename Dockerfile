# 1 - Base Image
FROM node:12-alpine as base

# 2 - Dependencies Stage
FROM base AS builder

ARG CLIENT_ID

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# 3 - Final Client and Server
FROM base AS production

RUN apk update
RUN apk add nano

WORKDIR /app

COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/src/server/ ./src/server/
COPY --from=builder /app/package.json ./

RUN npm install express@4.17.1 cors@2.8.5 cookie-parser@1.4.5 helmet@4.1.1 compression@1.7.4 axios@0.21.1 uuid@8.3.1 dayjs@1.9.3
RUN npm install -D typescript@4.0.3 ts-node@9.0.0 dotenv@8.2.0

EXPOSE 5000

CMD [ "npm", "run", "prod" ]