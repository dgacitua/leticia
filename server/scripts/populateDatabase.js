// $ mongo leticia-pilot populateDatabase.js

db.roles.insertMany([
  {
    "_id" : ObjectId("5efcf1932cc0301bfcf92050"),
    "name" : "user",
    "__v" : 0
  },
  {
    "_id" : ObjectId("5efcf1932cc0301bfcf92051"),
    "name" : "admin",
    "__v" : 0
  }
]);

db.credentials.insertOne({
  "_id" : ObjectId("5f5fdd3dfc5f3248ee340e45"),
  "email" : "admin@admin.com",
  "password" : "$2a$08$niMSPaP4VeZAXitLIxhZIeo11I.W.XjU7rJ.zP/Wn5efhqqUsW49i",
  "user" : ObjectId("5f5fdd3dfc5f3248ee340e44"),
  "__v" : 0
});

db.users.insertOne({
  "_id" : ObjectId("5f5fdd3dfc5f3248ee340e44"),
  "roles" : [ 
    ObjectId("5efcf1932cc0301bfcf92051")
  ],
  "username" : "okuyucoxup",
  "__v" : 1
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

db.tasks.insertMany([
  {
    "searchTaskId": 'task01',
    "title": 'Rutina de ejercicios',
    "description": 'El doctor de tu abuela le dijo que hacer más ejercicio incrementa su estado físico y le ayuda a evitar lesiones. Tu abuela no usa Internet y te ha solicitado crear una rutina de ejercicios para ella. Ella tiene 90 años. Crea dos rutinas de bajo impacto de 30 minutos para que ella pueda alternar durante la semana.'
  },
  {
    "searchTaskId": 'task02',
    "title": 'Comunicación en redes sociales',
    "description": 'Has notado que servicios en línea como Facebook han reemplazado las comunicaciones cara a cara. Puedes ver las ventajas de este estilo de comunicación, pero tu hermano argumenta que la gente está perdiendo su habilidad de comunicarse cara a cara. En general, ¿el uso de computadores para comunicación tiene un impacto positivo o negativo en las habilidades sociales cara a cara de la gente?'
  },
  {
    "searchTaskId": 'test01',
    "title": 'Título TEST1',
    "description": 'Descipción TEST1'
  },
  {
    "searchTaskId": 'test02',
    "title": 'Título TEST2',
    "description": 'Descripción TEST2'
  }
]);