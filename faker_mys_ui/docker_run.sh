#!/bin/bash
# Usage: ./docker_run.sh

# Params
name="faker_mys_ui"

#docker run -p 3010:3010 -d $name # Non-SSL

docker run -p 3010:443 -d $name # SSL