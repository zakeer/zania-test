# Use a base image with Node.js and npm
FROM node:18  

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app
RUN npm run build

# Expose the port the app will run on (usually 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"] 
