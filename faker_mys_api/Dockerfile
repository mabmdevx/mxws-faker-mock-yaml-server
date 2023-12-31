# Parameters passed for docker build
ARG node_version
ARG app_version

# Base Image
FROM node:${node_version}-slim

# Add labels
LABEL app_version=${app_version}

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Copy the SSL certificate and key
RUN mkdir -p /root/certs
COPY ./config/certs /root/certs/

# Copy Nginx ssl conf file
COPY ./config/nginx/ssl.conf /etc/nginx/conf.d/

# Create a new folder for the application
RUN mkdir -p /usr/src/app

# Set working directory for the container
WORKDIR /usr/src/app

# Copy the app
COPY source/ /usr/src/app

# Install NPM Modules for the app
RUN npm install

# Install mock-yaml-server as global inside the container
RUN npm install -g mock-yaml-server

# Create a new folder for the MYS Resources
RUN mkdir -p /usr/src/resources

# COPY the mock-yaml-server sample file
COPY ./mys_resources/users.mock.yaml /usr/src/resources

# Copy the container init script
COPY ./docker_container_init.sh /

# Set executable permission for the container init script
RUN chmod +x /docker_container_init.sh

# Create version file
RUN echo ${app_version} > /usr/src/app/version.txt

# Expose the required ports
## For API without SSL
EXPOSE 8080
## For Mock YAML Server without SSL
EXPOSE 3000
# For SSL
EXPOSE 443

# Set start command
ENTRYPOINT /docker_container_init.sh