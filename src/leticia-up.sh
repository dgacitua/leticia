#!/bin/bash

set -u
set -e

# Load environment variables from file
set -o allexport
source .env
set +o allexport

# Start with Docker Compose after all environment variables are declared
printf "%b\n" "\e[1;92m>> Starting LETICIA with Docker Compose!\e[0m"

docker compose -p leticia up -d

set +e
set +u