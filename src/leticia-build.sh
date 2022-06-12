#!/bin/bash

set -u
set -e

# Load environment variables from file
set -o allexport
source .env
set +o allexport

# Create directories in filesystem
printf "%b\n" "\e[1;92m>> Creating filesystem directories for persistence...\e[0m"
printf "%b\n" "\e[1;92mWARNING: sudo permissions for current user may be required\e[0m"

ASSET_DIR=${LETICIA_ASSET_PATH:-~/leticiaAssets}
DB_DIR=${LETICIA_DB_PATH:-~/leticiaDatabase}
INDEX_DIR=${LETICIA_INDEX_PATH:-~/leticiaIndex}

mkdir -p $ASSET_DIR && sudo chown -R 3000:3000 $ASSET_DIR
mkdir -p $DB_DIR
mkdir -p $INDEX_DIR && sudo chown -R 8983:8983 $INDEX_DIR

# Build with Docker Compose after all environment variables are declared
printf "%b\n" "\e[1;92m>> Building NEURONE deploy images for Docker Compose!\e[0m"

docker compose -p leticia build

printf "%b\n" "\e[1;92m>> Build successful!\e[0m"

set +e
set +u