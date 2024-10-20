#!/bin/bash

# Parameters
container_name=app-template
port=4000

# Stop the container
docker stop $container_name

# Delete the container
docker rm $container_name

# Delete image
docker image rm $container_name

# Build a new image
docker build . -t $container_name -f Dockerfile

# Start a new container
sudo docker run -d -p $port:4000 --restart unless-stopped --name $container_name $container_name
