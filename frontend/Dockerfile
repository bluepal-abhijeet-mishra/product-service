# Stage 1: Build the React application
FROM node:16 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
# The REACT_APP_API_URL will be passed as a build argument from docker-compose.yml
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# Stage 2: Serve the static files with a lightweight server
FROM node:16

WORKDIR /app

# Install `serve` to act as the static file server
RUN npm install -g serve

# Copy the build output from the build stage
COPY --from=build /app/build .

# Expose port 3000 and start the server
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
