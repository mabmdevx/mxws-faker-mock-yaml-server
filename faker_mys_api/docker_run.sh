#!/bin/bash
# Usage: ./docker_run.sh

# Params
name="faker_mys_api"

docker run -p 8080:8080 -p 3000:3000 -d $name
