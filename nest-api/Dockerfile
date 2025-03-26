# 1. Base image
FROM node:18.18-alpine

# 2. Working dir
WORKDIR /usr/src/app

# 3. Copy 환경 변수와 필요한 파일들
COPY .env .env
COPY package*.json ./
COPY prisma ./prisma

# 4. Install dependencies
RUN npm install

# ✅ 5. Prisma generate (이 시점에 .env 가 있어야 함)
RUN npx prisma generate

# 6. Copy 나머지 소스
COPY . .

# 7. Build
RUN npm run build

# 8. Run
EXPOSE 8080
CMD ["npm", "run", "start:prod"]
