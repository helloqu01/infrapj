# 1. Base 이미지
FROM node:18-alpine AS builder

# 2. 작업 디렉토리 생성
WORKDIR /app

# 3. 종속성 설치 및 빌드
COPY . .
RUN npm install
RUN npm run build

# 4. production 서버 실행용 이미지
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/src ./src

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]
