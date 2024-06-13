FROM node:20.11.1-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Copy the server.js file to the working directory
COPY server.js .

# Expose port 5000 to the outside world
EXPOSE 5000

# Start the Node.js server when the container launches
CMD ["node", "server.js"]
