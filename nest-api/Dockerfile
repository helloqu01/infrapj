# Nest.js API를 위한 Dockerfile
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 복사 및 설치
COPY package.json package-lock.json ./
RUN npm install --production

# 소스 코드 복사
COPY . .

# 포트 설정 (Nest.js 기본 포트)
EXPOSE 3001

# 앱 실행
CMD ["npm", "run", "start"]
