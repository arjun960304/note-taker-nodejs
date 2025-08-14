# Step 1: Use official Node.js runtime as base
FROM node:18-alpine

# Step 2: Set working directory inside container
WORKDIR /

# Step 3: Copy package files first (better caching for installs)
COPY package*.json ./

# Step 4: Install dependencies (production only)
RUN npm install

# Step 5: Copy the rest of your code
COPY . .

# Step 6: Expose the port your app runs on
EXPOSE 3000

# Step 7: Command to run your app
CMD ["node", "index.js"]
