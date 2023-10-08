#!/bin/bash

# Params
node_module_global_path="/usr/local/lib/node_modules"

# Start Node Application
echo -e "\nStarting the Mock YAML Server ...\n"
npm install -g mock-yaml-server
mkdir /"$node_module_global_path/mock-yaml-server/resources"
cp config/mock_yaml_server_sample/users.yaml /"$node_module_global_path/mock-yaml-server/resources"
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