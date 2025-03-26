# Step 1: Use an official Node.js runtime as the base image
FROM node:18.18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Install dependencies
COPY package*.json ./
COPY prisma ./prisma
RUN npm install

# Step 4: Copy the application code
COPY . .

# Step 5: Build the Nest.js app
RUN npm run build

# Step 6: Expose the port that the app will listen on
EXPOSE 8080

# Step 7: Run the app when the container starts
CMD ["npm", "run", "start:prod"]
