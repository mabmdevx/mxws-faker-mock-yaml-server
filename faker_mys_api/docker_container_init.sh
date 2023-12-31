#!/bin/bash

# Start Node Application
echo -e "\nStarting the Mock YAML Server ...\n"
domain_name="faker.webserve.xyz"
npm install -g mock-yaml-server
mock-yaml-server -f /usr/src/resources -s "$domain_name" &
echo -e "\nDone"

# Start Node Application
echo -e "\nStarting the Node Application ...\n"
cp env.template .env
node app.js &
echo -e "\nDone"

# Start NGINX
echo -e "\nStarting NGINX ...\n"
nginx -g 'daemon off;'
echo -e "\nDone"