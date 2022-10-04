#!/bin/bash

# Changing inverted index locale
printf "%b\n" "\e[1;92m>> Changing inverted index locale to English...\e[0m"

curl -X 'POST' \
  'http://localhost:3000/v1/search/locale' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "locale": "en",
  "addOperation": false
}'