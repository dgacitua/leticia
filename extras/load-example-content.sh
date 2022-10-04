#!/bin/bash

# Loading example questions
printf "%b\n" "\e[1;92m>> Loading example questions...\e[0m"

curl -X 'POST' \
  'http://localhost:3000/v1/questions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "questionId": "pretask1",
  "type": "likert",
  "title": "I know a lot about the topic of the task that I'\''m going to perform",
  "start": 1,
  "stop": 6,
  "step": 1,
  "minLabel": "Strongly disagree",
  "maxLabel": "Strongly agree",
  "required": true,
  "answer": null
}'

curl -X 'POST' \
  'http://localhost:3000/v1/questions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "questionId": "pretask2",
  "type": "likert",
  "title": "I am motivated with the task that I am going to solve",
  "start": 1,
  "stop": 6,
  "step": 1,
  "minLabel": "Strongly disagree",
  "maxLabel": "Strongly agree",
  "required": true,
  "answer": null
}'

curl -X 'POST' \
  'http://localhost:3000/v1/questions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "questionId": "pretask3",
  "type": "likert",
  "title": "I will find it difficult to raise search queries for this task",
  "start": 1,
  "stop": 6,
  "step": 1,
  "minLabel": "Strongly disagree",
  "maxLabel": "Strongly agree",
  "required": true,
  "answer": null
}'

curl -X 'POST' \
  'http://localhost:3000/v1/questions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "questionId": "posttask1",
  "type": "likert",
  "title": "My performance in the task performed was good",
  "start": 1,
  "stop": 6,
  "step": 1,
  "minLabel": "Strongly disagree",
  "maxLabel": "Strongly agree",
  "required": true,
  "answer": null
}'

curl -X 'POST' \
  'http://localhost:3000/v1/questions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "questionId": "posttask2",
  "type": "likert",
  "title": "The task I just completed was motivating",
  "start": 1,
  "stop": 6,
  "step": 1,
  "minLabel": "Strongly disagree",
  "maxLabel": "Strongly agree",
  "required": true,
  "answer": null
}'

curl -X 'POST' \
  'http://localhost:3000/v1/questions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "questionId": "posttask3",
  "type": "likert",
  "title": "Building search queries for this task was difficult",
  "start": 1,
  "stop": 6,
  "step": 1,
  "minLabel": "Strongly disagree",
  "maxLabel": "Strongly agree",
  "required": true,
  "answer": null
}'

curl -X 'POST' \
  'http://localhost:3000/v1/questions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "questionId": "nasatlx01",
  "type": "anonlikert",
  "title": "Mental demand",
  "hint": "How much mental demand was required by the task?",
  "start": 1,
  "stop": 21,
  "step": 1,
  "minLabel": "Very low",
  "maxLabel": "Very high",
  "required": true,
  "answer": null
}'

curl -X 'POST' \
  'http://localhost:3000/v1/questions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "questionId": "nasatlx02",
  "type": "anonlikert",
  "title": "Physical demand",
  "hint": "How much physical demand was required by the task?",
  "start": 1,
  "stop": 21,
  "step": 1,
  "minLabel": "Very low",
  "maxLabel": "Very high",
  "required": true,
  "answer": null
}'

curl -X 'POST' \
  'http://localhost:3000/v1/questions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "questionId": "nasatlx03",
  "type": "anonlikert",
  "title": "Temporal demand",
  "hint": "How much time pressure did you feel during the task?",
  "start": 1,
  "stop": 21,
  "step": 1,
  "minLabel": "Very low",
  "maxLabel": "Very high",
  "required": true,
  "answer": null
}'

curl -X 'POST' \
  'http://localhost:3000/v1/questions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "questionId": "nasatlx04",
  "type": "anonlikert",
  "title": "Performance",
  "hint": "How successful do you think you were in accomplishing the goals of the task?",
  "start": 1,
  "stop": 21,
  "step": 1,
  "minLabel": "Good",
  "maxLabel": "Poor",
  "required": true,
  "answer": null
}'

curl -X 'POST' \
  'http://localhost:3000/v1/questions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "questionId": "nasatlx05",
  "type": "anonlikert",
  "title": "Effort",
  "hint": "How hard did you have to work to accomplish your level of performance?",
  "start": 1,
  "stop": 21,
  "step": 1,
  "minLabel": "Very low",
  "maxLabel": "Very high",
  "required": true,
  "answer": null
}'

curl -X 'POST' \
  'http://localhost:3000/v1/questions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "questionId": "nasatlx06",
  "type": "anonlikert",
  "title": "Frustration",
  "hint": "How insecure, irritated or stressed did yoy feel by the task?",
  "start": 1,
  "stop": 21,
  "step": 1,
  "minLabel": "Very low",
  "maxLabel": "Very high",
  "required": true,
  "answer": null
}'

# Loading example forms
printf "%b\n" "\e[1;92m>> Loading example forms...\e[0m"

curl -X 'POST' \
  'http://localhost:3000/v1/forms' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "formId": "pretask",
  "questions": [ "pretask1", "pretask2", "pretask3" ]
}'

curl -X 'POST' \
  'http://localhost:3000/v1/forms' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "formId": "posttask",
  "questions": [ "posttask1", "posttask2", "posttask3" ]
}'

curl -X 'POST' \
  'http://localhost:3000/v1/forms' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "formId": "nasatlx",
  "questions": [ "nasatlx01", "nasatlx02", "nasatlx03", "nasatlx04", "nasatlx05", "nasatlx06" ]
}'


# Loading example tasks
printf "%b\n" "\e[1;92m>> Loading example tasks...\e[0m"

curl -X 'POST' \
  'http://localhost:3000/v1/tasks' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "searchTaskId": "task01",
  "title": "Javascript keydown",
  "description": "In client-side Javascript, when does a keydown event trigger?"
}'

curl -X 'POST' \
  'http://localhost:3000/v1/tasks' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "searchTaskId": "task02",
  "title": "Javascript mouseenter",
  "description": "In client-side Javascript, when does a mouseenter event trigger?"
}'

# Changing inverted index locale
printf "%b\n" "\e[1;92m>> Changing inverted index locale to English...\e[0m"

curl -X 'POST' \
  'http://localhost:3000/v1/search/locale' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "locale": "en",
  "addOperation": true
}'


# Loading example web documents
printf "%b\n" "\e[1;92m>> Loading example web documents...\e[0m"

curl -X 'POST' \
  'http://localhost:3000/v1/documents/index' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "docId": "doc01",
  "url": "https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event",
  "locale": "en",
  "title": "Element: keydown event",
  "snippet": "The keydown event is fired when a key is pressed.",
  "keywords": [
    "javascript",
    "event"
  ],
  "relevant": [
    "task01"
  ]
}'

curl -X 'POST' \
  'http://localhost:3000/v1/documents/index' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "docId": "doc02",
  "url": "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events",
  "locale": "en",
  "title": "Introduction to events",
  "snippet": "Events are actions or occurrences that happen in the system you are programming, which the system tells you about so your code can react to them.",
  "keywords": [
    "javascript",
    "event"
  ],
  "relevant": [
  ]
}'

curl -X 'POST' \
  'http://localhost:3000/v1/documents/index' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "docId": "doc03",
  "url": "https://developer.mozilla.org/en-US/docs/Web/API/Event",
  "locale": "en",
  "title": "Event - Web APIs",
  "snippet": "The Event interface represents an event which takes place in the DOM.",
  "keywords": [
    "javascript",
    "event"
  ],
  "relevant": [
  ]
}'

curl -X 'POST' \
  'http://localhost:3000/v1/documents/index' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "docId": "doc04",
  "url": "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
  "locale": "en",
  "title": "EventTarget.addEventListener()",
  "snippet": "The addEventListener() method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.",
  "keywords": [
    "javascript",
    "event"
  ],
  "relevant": [
  ]
}'

curl -X 'POST' \
  'http://localhost:3000/v1/documents/index' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "docId": "doc05",
  "url": "https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event",
  "locale": "en",
  "title": "Element: mouseenter event",
  "snippet": "The mouseenter event is fired at an Element when a pointing device (usually a mouse) is initially moved so that its hotspot is within the element at which the event was fired.",
  "keywords": [
    "javascript",
    "event"
  ],
  "relevant": [
    "task02"
  ]
}'


# Loading example flows
printf "%b\n" "\e[1;92m>> Loading example flows...\e[0m"

curl -X 'POST' \
  'http://localhost:3000/v1/flows' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -w "\n" \
  -d '{
  "sessionFlowId": "flow1",
  "flowName": "Standard Challenge",
  "instructions": "In this challenge you will be presented with 3 search tasks, you must create at least 3 search queries for each one (in English), like you were entering them in a web search engine. You have 30 minutes to complete all search tasks.",
  "minDocs": 3,
  "stages": [
    { "path": "/consent", "timeLimit": -1 },
    { "path": "/demographic", "timeLimit": -1 },
    { "path": "/instructions", "params": "challenge", "timeLimit": -1 },
    {
      "path": "/challenge",
      "timeLimit": 30,
      "stages": [
        { "path": "/ready" },
        { "path": "/description" },
        { "path": "/taskform", "query": { "form": "pretask" } },
        { "path": "/search" },
        { "path": "/nasa-tlx", "query": { "form": "nasatlx" } },
        { "path": "/taskform", "query": { "form": "posttask" } }
      ]
    },
    { "path": "/end", "timeLimit": -1 }
  ]
}'