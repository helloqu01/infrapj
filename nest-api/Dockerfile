# 1. Base image
FROM node:18.18-alpine

# 2. Working dir
WORKDIR /usr/src/app

# ✅ [추가] DATABASE_URL을 build 시점에 넘기기 위해 ARG와 ENV 설정
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# 3. Copy 환경 변수와 필요한 파일들
COPY package*.json ./
COPY prisma ./prisma

# 4. Install dependencies
RUN npm installㅌㄴ

# 5. Prisma generate (DATABASE_URL이 ENV로 설정되어 있어야 정상 작동)
RUN npx prisma generate

# 6. Copy 나머지 소스
COPY . .

# 7. Build
RUN npm run build

# 8. Run
EXPOSE 8080
CMD ["npm", "run", "start:prod"]
