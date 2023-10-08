ARG node_version
ARG app_version

# Base Image
FROM nginx:alpine-slim

# Add labels
LABEL app_version=${app_version}

# Set working directory for the container
WORKDIR /var/www/html

# Copy Nginx conf file
COPY ./config/nginx/default.conf /etc/nginx/conf.d/

# Copy the app
COPY ./source/public /var/www/html/

# Expose the required ports
EXPOSE 3010

# Start NGINX
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]