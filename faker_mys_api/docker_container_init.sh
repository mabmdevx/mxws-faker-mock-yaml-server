#!/bin/bash

# Start Node Application
echo -e "\nStarting the Mock YAML Server ...\n"
mock-yaml-server &
echo -e "\nDone"

# Start Node Application
echo -e "\nStarting the Node Application ...\n"
node app.js &
echo -e "\nDone"

# Start NGINX
echo -e "\nStarting NGINX ...\n"
nginx -g 'daemon off;'
echo -e "\nDone"