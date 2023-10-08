#!/bin/bash

# Start Node Application
echo -e "\nStarting the Mock YAML Server ...\n"
npm install -g mock-yaml-server
mock-yaml-server -f /usr/src/resources &
echo -e "\nDone"

# Start Node Application
echo -e "\nStarting the Node Application ...\n"
node app.js &
echo -e "\nDone"

# Start NGINX
echo -e "\nStarting NGINX ...\n"
nginx -g 'daemon off;'
echo -e "\nDone"