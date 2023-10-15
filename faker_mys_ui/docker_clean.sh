#!/bin/bash
# Usage: ./docker_clean.sh
set -u
set -e
set -o pipefail

# Params
name="faker_mys_ui"

echo "Stop Docker container and remove it - $name ..."
docker rm $(docker stop $(docker ps -a -q --filter ancestor=$name))
echo "Done"

echo "Remove Docker image - $name ..."
docker rmi $name
echo "Done"