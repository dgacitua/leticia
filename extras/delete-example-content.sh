#!/bin/bash

# Deleting example web questions
printf "%b\n" "\e[1;92m>> Deleting example questions...\e[0m"

curl -X 'DELETE' \
  'http://localhost:3000/v1/questions/pretask1' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/questions/pretask2' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/questions/pretask3' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/questions/posttask1' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/questions/posttask2' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/questions/posttask3' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/questions/nasatlx01' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/questions/nasatlx02' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/questions/nasatlx03' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/questions/nasatlx04' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/questions/nasatlx05' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/questions/nasatlx06' \
  -H 'accept: */*' \
  -w "\n"


# Deleting example forms
printf "%b\n" "\e[1;92m>> Deleting example forms...\e[0m"

curl -X 'DELETE' \
  'http://localhost:3000/v1/forms/pretask' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/forms/posttask' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/forms/nasatlx' \
  -H 'accept: */*' \
  -w "\n"


# Deleting example tasks
printf "%b\n" "\e[1;92m>> Deleting example tasks...\e[0m"

curl -X 'DELETE' \
  'http://localhost:3000/v1/tasks/task01' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/tasks/task02' \
  -H 'accept: */*' \
  -w "\n"

# Deleting example web documents
printf "%b\n" "\e[1;92m>> Deleting example web documents...\e[0m"

curl -X 'DELETE' \
  'http://localhost:3000/v1/documents/one/doc01' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/documents/one/doc02' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/documents/one/doc03' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/documents/one/doc04' \
  -H 'accept: */*' \
  -w "\n"

curl -X 'DELETE' \
  'http://localhost:3000/v1/documents/one/doc05' \
  -H 'accept: */*' \
  -w "\n"


# Deleting example flows
printf "%b\n" "\e[1;92m>> Deleting example flows...\e[0m"

curl -X 'DELETE' \
  'http://localhost:3000/v1/flows/flow1' \
  -H 'accept: */*' \
  -w "\n"