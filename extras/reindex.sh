#!/bin/bash

# Reindexing all documents
printf "%b\n" "\e[1;92m>> Reindexing all documents...\e[0m"

curl -X 'POST' \
  'http://localhost:3000/v1/documents/reindex' \
  -H 'accept: */*' \
  -d ''