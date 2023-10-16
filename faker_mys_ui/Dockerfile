ARG node_version
ARG app_version

# Base Image
FROM nginx:alpine-slim

# Add labels
LABEL app_version=${app_version}

# Set working directory for the container
WORKDIR /var/www/html

# Copy the SSL certificate and key
RUN mkdir -p /root/certs
COPY ./config/certs /root/certs/

# Copy Nginx default conf file
COPY ./config/nginx/default.conf /etc/nginx/conf.d/

# Copy Nginx ssl conf file
COPY ./config/nginx/ssl.conf /etc/nginx/conf.d/

# Copy the app
COPY ./source/public /var/www/html/

# Expose the required ports
## For UI without SSL
EXPOSE 3010
## For UI with SSL
EXPOSE 443

# Start NGINX
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]