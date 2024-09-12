# Stage 1: Compile the app
FROM node:22 AS base
# Install necessary packages
# Set up the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Copy package.json and bun.lockb files
COPY package.json ./
COPY yarn.lock ./
# Install dependencies
RUN yarn
# Copy the rest of the application files
COPY . .
# Define build arguments
ARG OTHERKEY
# Build the application
RUN yarn tsc
# Stage 2: Final application image
FROM node:22-alpine AS runner
# Set up the working directory
WORKDIR /app
# Copy built files from the previous stage
COPY --from=base /usr/src/app/dist ./
COPY --from=base /usr/src/app/node_modules ./node_modules
# Expose port 3000
EXPOSE 3000
# Define run arg
ARG NODE_ENV
# Run the application
CMD [ "node", "./src/app.js" ]