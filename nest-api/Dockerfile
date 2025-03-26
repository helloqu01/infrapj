# 1. Base image
FROM node:18.18-alpine

# 2. Working dir
WORKDIR /usr/src/app

# 3. Copy package & prisma
COPY package*.json ./
COPY prisma ./prisma

# 4. Install dependencies & prisma generate
RUN npm install
RUN npx prisma generate

# 5. Copy source
COPY . .

# 6. Build
RUN npm run build

# 7. Run
EXPOSE 8080
CMD ["npm", "run", "start:prod"]
