// $ mongo leticia-data populateDataDatabase.js

db.roles.insertMany([
  {
    "_id" : ObjectId("5efcf1932cc0301bfcf92050"),
    "name" : "user"
  },
  {
    "_id" : ObjectId("5efcf1932cc0301bfcf92051"),
    "name" : "admin"
  }
]);

db.users.insertOne({
  "_id" : ObjectId("5f5fdd3dfc5f3248ee340e44"),
  "roles" : [ 
    ObjectId("5efcf1932cc0301bfcf92051")
  ],
  "username" : "Admin"
});

db.forms.insertMany([
  {
    "formId": "pretask",
    "questions": [ "pretask1", "pretask2", "pretask3" ]
  },
  {
    "formId": "posttask",
    "questions": [ "posttask1", "posttask2", "posttask3" ]
  },
  {
    "formId": "pretask-ex",
    "questions": [ "pretask1", "pretask2", "pretask3", "pretask4", "pretask5", "pretask6", "pretask7" ]
  },
  {
    "formId": "posttask-ex",
    "questions": [ "posttask1", "posttask2", "posttask3", "posttask4", "posttask5", "posttask6", "posttask7" ]
  },
  {
    "formId": "query",
    "questions": [ "query" ]
  },
  {
    "formId": "exit",
    "questions": [ "exit1", "exit2", "exit3", "exit4", "exit5", "exit6", "exit7", "exit8", "exit9", "exit10", "exitComment" ]
  },
  {
    "formId": "exit-final",
    "questions": [ "exitComment" ]
  },
  {
    "formId": "nasatlx",
    "questions": [ "nasatlx01", "nasatlx02", "nasatlx03", "nasatlx04", "nasatlx05", "nasatlx06" ]
  }
]);

db.questions.insertMany([
  {
    "questionId": "pretask1",
    "type": "likert",
    "title": "I know a lot about the topic of the task that I'm going to perform",
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
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
  },
  {
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
  },
  {
    "questionId": "pretask4",
    "type": "likert",
    "title": "Understanding the search results for this task will be difficult",
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "pretask5",
    "type": "likert",
    "title": "Determining how useful the search results can be for this task will be difficult",
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "pretask6",
    "type": "likert",
    "title": "It will be difficult to determine when to finish searching for information to complete this task",
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "pretask7",
    "type": "likert",
    "title": "The task that I am going to do is difficult",
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    "questionId": "posttask4",
    "type": "likert",
    "title": "Understanding the search results for this task was difficult",
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "posttask5",
    "type": "likert",
    "title": "Determining how useful search results can be for this task was difficult",
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "posttask6",
    "type": "likert",
    "title": "It was difficult to determine when to stop searching for information to complete this task",
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "posttask7",
    "type": "likert",
    "title": "The task performed was difficult",
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "query",
    "type": "multiquery",
    "title": "Enter at least 3 queries that can obtain useful information to solve the task",
    "queries": 3,
    "answer": []
  },
  {
    "questionId": "exit1",
    "type": "likert",
    "title": "I think that I would like to use this system frequently",
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "exit2",
    "type": "likert",
    "title": "I found the system unnecessarily complex",
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "exit3",
    "type": "likert",
    "title": "I thought the system was easy to use",
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "exit4",
    "type": "likert",
    "title": "I think that I would need the support of a technical person to be able to use this system",
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "exit5",
    "type": "likert",
    "title": "I found the various functions in this system were well integrated",
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "exit6",
    "type": "likert",
    "title": "I thought there was too much inconsistency in this system",
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "exit7",
    "type": "likert",
    "title": "I would imagine that most people would learn to use this system very quickly",
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "exit8",
    "type": "likert",
    "title": "I found the system very cumbersome to use",
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "exit9",
    "type": "likert",
    "title": "I felt very confident using the system",
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "exit10",
    "type": "likert",
    "title": "I needed to learn a lot of things before I could get going with this system",
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": "Strongly disagree",
    "maxLabel": "Strongly agree",
    "required": true,
    "answer": null
  },
  {
    "questionId": "exitComment",
    "type": "paragraph",
    "title": "Write in the following space any comment about the study you just completed",
    "required": false,
    "answer": null
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    "questionId": "nasatlx05",
    "type": "anonlikert",
    "title": "Effort",
    "hint": "How hard did you have to work to accomplish your level of performance?",
    "start": 1,
    "stop": 21,
    "step": 1,
    "minLabel": "Muy bajo",
    "maxLabel": "Muy alto",
    "required": true,
    "answer": null
  },
  {
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
  }
]);

db.tasks.insertMany([
  {
    "searchTaskId": "task01",
    "title": "Special flag",
    "description": "Every national flag in the world shares a common geometric characteristic, except for one country. Which country is it?"
  },
  {
    "searchTaskId": "task02",
    "title": "Radioactive element",
    "description": "After coining the term “radioactive,” she discovered two radioactive elements, one of which you can find easily in cigarette smoke. What is that element?"
  }
]);

db.sessionflows.insertMany([
  {
    "sessionFlowId": "short",
    "instructions": "In this challenge you will be presented with 3 search tasks, you must create at least 3 search queries for each one (in English), like you were entering them in a web search engine. You have 15 minutes to complete the challenge.",
    "minQueries": 3,
    "stages": [
      { "path": "/consent", "timeLimit": -1 },
      { "path": "/demographic", "timeLimit": -1 },
      { "path": "/typing-instructions", "timeLimit": -1 },
      { "path": "/typing", "timeLimit": -1 },
      { "path": "/instructions", "params": "short", "timeLimit": -1 },
      { "path": "/short-challenge", "timeLimit": 15 },
      { "path": "/exit-survey", "timeLimit": -1 },
      { "path": "/end", "timeLimit": -1 }
    ]
  },
  {
    "sessionFlowId": "extended",
    "instructions": "In this challenge you will be presented with 3 search tasks, you must create search queries (in English and using the LETICIA's search engine) to find relevant documents that can solve these tasks. Once you've been introduced to the task, you must fill the questionnaires to access the search engine. You have 25 minutes to solve the challenge.",
    "minDocs": 3,
    "stages": [
      { "path": "/consent", "timeLimit": -1 },
      { "path": "/demographic", "timeLimit": -1 },
      { "path": "/typing-instructions", "timeLimit": -1 },
      { "path": "/typing", "timeLimit": -1 },
      { "path": "/instructions", "params": "extended", "timeLimit": -1 },
      { "path": "/extended-challenge", "timeLimit": 25 },
      { "path": "/exit-survey", "timeLimit": -1 },
      { "path": "/end", "timeLimit": -1 }
    ]
  },
  {
    "sessionFlowId": "challenge",
    "instructions": "In this challenge you will be presented with 3 search tasks, you must create search queries (in English and using the LETICIA's search engine) to find relevant documents that can solve these tasks. Once you've been introduced to the task, you must fill the questionnaires to access the search engine. You have 25 minutes to complete all search tasks.",
    "minDocs": 3,
    "stages": [
      { "path": "/consent", "timeLimit": -1 },
      { "path": "/demographic", "timeLimit": -1 },
      { "path": "/typing-instructions", "timeLimit": -1 },
      { "path": "/typing", "timeLimit": -1 },
      { "path": "/instructions", "params": "short", "timeLimit": -1 },
      {
        "path": "/challenge",
        "timeLimit": 25,
        "stages": [
          { "path": "/ready" },
          { "path": "/description" },
          { "path": "/taskform-ex", "query": { "form": "pretask" } },
          { "path": "/search-instructions" },
          { "path": "/search" },
          { "path": "/nasa-tlx", "query": { "form": "nasatlx" } },
          { "path": "/taskform-ex", "query": { "form": "posttask" } }
        ]
      },
      { "path": "/exit-survey", "timeLimit": -1 },
      { "path": "/end", "timeLimit": -1 }
    ]
  }
]);

db.serverconfigs.insertMany([
  {
    "configName": "TaskRequestCount",
    "numberValue": 0
  }
]);