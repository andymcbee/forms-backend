# Use a specific version of node
FROM node:21.5.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Run the build command which compiles TypeScript to JavaScript
RUN npm run build

EXPOSE 3000

# Command to start your application
CMD ["npm", "start"]
