## README
# faker-mock-yaml-server

Powered by: https://www.npmjs.com/package/mock-yaml-server

## 1. Start the mock-yaml-server
### If global installation - Recommended
```
npm install -g mock-yaml-server
mock-yaml-server -f ./resources/
```
### If local installation - Not recommended
```
cd mock_yaml_server
npm install
node node_modules/mock-yaml-server/src/server.js -f ./resources/
```
## 2. Start the API
### For Local Setup - Runs on Port 8080 by default
```
cd faker_mys_api\source
npm install
node index.js
```
### For Production Setup - Runs on Port 8080 Non-SSL / Port 443 SSL by default
```
cd faker_mys_api
./docker_clean.sh # If needed (For re-deploy)
./docker_build.sh
./docker_run.sh
```

## 3. Start the UI
### For Local setup - Runs on Port 3020 by default
```
cd faker_mys_ui\source
npm install
node index.js
```
### For Production setup - Runs on Port 3010 Non-SSL / Port 443 SSL on the docker container with NGINX directly without NodeJS Express Server
```
cd faker_mys_api
./docker_clean.sh # If needed (For re-deploy)
./docker_build.sh
./docker_run.sh
```

## 4. Reverse Proxy and SSL Setup - For Production setup
```
#Copy the config/nginx/default configuration to your NGINX
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d faker.xyz.com
sudo service nginx restart
```



