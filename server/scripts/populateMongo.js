// $ mongo leticia-pilot populateMongo.js

db.users.insertOne({
  "name" : "Test",
  "email" : "test@example.org",
  "password" : "$2a$08$e5VVnjX7k/DxWDiuuc3Lt.3crlyGYTmYoUGEp7.iUr565k9Qznq1e",  // password
  "tokens" : []
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
    "formId": "query",
    "questions": [ "query" ]
  }
]);

db.questions.insertMany([
  {
    "questionId": 'pretask1',
    "type": 'likert',
    "title": '¿Qué tan tanto conoces acerca del tópico de la tarea que vas a resolver?',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Conozco muy poco',
    "maxLabel": 'Conozco demasiado',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'pretask2',
    "type": 'likert',
    "title": '¿Qué tan difícil crees que será la tarea que vas a resolver?',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy fácil',
    "maxLabel": 'Muy difícil',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'pretask3',
    "type": 'likert',
    "title": '¿Qué tan complicado crees que será encontrar información para resolver esta tarea?',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Poco complicado',
    "maxLabel": 'Muy complicado',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'posttask1',
    "type": 'likert',
    "title": '¿Qué tan bueno crees que fue tu desempeño en la tarea que acabas de resolver?',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy malo',
    "maxLabel": 'Muy bueno',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'posttask2',
    "type": 'likert',
    "title": '¿Qué tan difícil crees que fue la tarea que acabas de resolver?',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy fácil',
    "maxLabel": 'Muy difícil',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'posttask3',
    "type": 'likert',
    "title": '¿Qué tan complicado crees que fue encontrar información para resolver esta tarea?',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Poco complicado',
    "maxLabel": 'Muy complicado',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'query',
    "type": 'multiquery',
    "title": 'Ingresa al menos 3 consultas que puedan obtener información útil para resolver la tarea',
    "queries": 3,
    "answer": []
  }
]);