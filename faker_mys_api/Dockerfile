# Parameters passed for docker build
ARG node_version
ARG app_version

# Base Image
FROM node:${node_version}-slim

# Add labels
LABEL app_version=${app_version}

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Install mock-yaml-server as global inside the container
RUN npm install -g mock-yaml-server

# Create a new folder for the application
RUN mkdir -p /usr/src/app

# Set working directory for the container
WORKDIR /usr/src/app

# Copy the app
COPY source/ /usr/src/app

# Copy the container init script
COPY ./docker_container_init.sh /

# Set executable permission for the container init script
RUN chmod +x /docker_container_init.sh

# Create version file
RUN echo ${app_version} > /usr/src/app/version.txt

# Expose the required ports
## For API
EXPOSE 8080
## For Mock YAML Server
EXPOSE 3000

# Set start command
ENTRYPOINT /docker_container_init.sh