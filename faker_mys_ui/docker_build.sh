#!/bin/bash
# Usage: ./docker_build.sh
set -u
set -e
set -o pipefail

usage()
{
cat << EOF
usage: $0 options

Script to build the docker image

OPTIONS:
  -c  SSL Certificate File Path (Optional)
  -t  Docker Image Tag (Optional)
EOF
}

while getopts ":c:t:" opt; do
    case $opt in
        c)
          ssl_cert_path=${OPTARG}
          ;;
        t)
          docker_image_tag=${OPTARG}
          ;;
        *)
          echo "Unknown option '$opt'"
          usage
          exit 1
          ;;
    esac
done

# Params
name="faker_mys_ui"
app_version=$(cat source/public/app_version.json | jq '.["app_version"]' -r)
node_version=$(sed s/v// source/.node-version)
docker_name="$name"
tarfile="${name}.tar.gz"
timestamp=$(date +'%Y/%m/%d %H:%M:%S')
domain_name="faker.webserve.xyz"

# Check if command line parameter ssl_cert_path has been set, if not assign default value
if [ -z "${ssl_cert_path-}" ] ; then
  ssl_cert_path="/opt/minica/minica/$domain_name"
fi

# Check if command line parameter docker_image_tag has been set, if not assign default value
if [ -z "${docker_image_tag-}" ] ; then
  docker_image_tag="latest"
fi

# Copy certificate to build context folder
cp -a $ssl_cert_path/. ./config/certs/

echo "Build Docker Image: $docker_name"
echo "App Version: $app_version"
echo "Node Version: $node_version"
echo "SSL Certificate Path: $ssl_cert_path"
echo "Docker Image Tag: $docker_image_tag"

# Build Docker Image
docker build -t "$docker_name" \
  --build-arg app_version="$app_version" \
  --build-arg node_version="$node_version" \
  -f Dockerfile \
  .

# Tag the Docker Image - App Version
docker tag $docker_name $docker_name:$app_version
echo "Docker Image tagged: $docker_name:$app_version"

# Tag the Docker Image - Build Number "build_<build_num>" or anything else
docker tag $docker_name $docker_name:$docker_image_tag
echo "Docker Image tagged: $docker_name:$docker_image_tag"

# Save Docker Image to tar file
docker save "$docker_name:$docker_image_tag" | pigz > "docker_builds/$tarfile"
echo "App Version: $app_version | Node Version: $node_version | Docker Image Tag: $docker_image_tag | Timestamp: $timestamp" > docker_builds/docker_image_info.txt
echo "Docker Image stored in docker_builds/$tarfile"