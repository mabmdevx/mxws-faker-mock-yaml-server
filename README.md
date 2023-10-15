README
======
faker-mock-yaml-server

Powered by: https://www.npmjs.com/package/mock-yaml-server

1) Start the mock-yaml-server
-----------------------------
# If global installation - Recommended
npm install -g mock-yaml-server
mock-yaml-server -f ./resources/

# If local installation - Not recommended
cd mock_yaml_server
npm install
node node_modules/mock-yaml-server/src/server.js -f ./resources/

2) Start the API
----------------
# For Local Setup and Production Setup - Runs on Port 8080 by default
cd faker_mys_api
npm install
node index.js

3) Start the UI
---------------
# For Local setup - Runs on Port 3020 by default
cd faker_mys_ui
npm install
node index.js
# For Production setup - Runs on Port 3010 on the docker container with NGINX directly without NodeJS Express Server



