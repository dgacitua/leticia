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
    "questionId": 'pretask1',
    "type": 'likert',
    "title": 'Conozco mucho acerca del tópico de la tarea que voy a realizar',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'pretask2',
    "type": 'likert',
    "title": 'Estoy motivado con la tarea que voy a resolver',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'pretask3',
    "type": 'likert',
    "title": 'Me resultará difícil plantear consultas de búsqueda para esta tarea',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'pretask4',
    "type": 'likert',
    "title": 'Entender los resultados de búsqueda para esta tarea será difícil',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'pretask5',
    "type": 'likert',
    "title": 'Determinar lo útil que pueden ser los resultados de búsqueda de esta tarea será difícil',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'pretask6',
    "type": 'likert',
    "title": 'Resultará difícil determinar cuando terminar de buscar información para completar esta tarea',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'pretask7',
    "type": 'likert',
    "title": 'La tarea que voy a realizar es difícil',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'posttask1',
    "type": 'likert',
    "title": 'Mi desempeño en la tarea realizada fue bueno',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'posttask2',
    "type": 'likert',
    "title": 'La tarea que acabo de realizar fue motivante',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'posttask3',
    "type": 'likert',
    "title": 'Construir consultas de búsqueda para esta tarea fue difícil',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'posttask4',
    "type": 'likert',
    "title": 'Entender los resultados de búsqueda para esta tarea fue difícil',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'posttask5',
    "type": 'likert',
    "title": 'Determinar lo útil que pueden ser los resultados de búsqueda para esta tarea fue difícil',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'posttask6',
    "type": 'likert',
    "title": 'Resultó difícil determinar cuando terminar de buscar información para completar esta tarea',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'posttask7',
    "type": 'likert',
    "title": 'La tarea realizada fue difícil',
    "start": 1,
    "stop": 6,
    "step": 1,
    "minLabel": 'Muy en desacuerdo',
    "maxLabel": 'Muy de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'query',
    "type": 'multiquery',
    "title": 'Ingresa al menos 3 consultas que puedan obtener información útil para resolver la tarea',
    "queries": 3,
    "answer": []
  },
  {
    "questionId": 'exit1',
    "type": 'likert',
    "title": 'Creo que usaría esta plataforma frecuentemente',
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": 'Totalmente en desacuerdo',
    "maxLabel": 'Totalmente de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'exit2',
    "type": 'likert',
    "title": 'Encuentro esta plataforma innecesariamente complejo',
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": 'Totalmente en desacuerdo',
    "maxLabel": 'Totalmente de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'exit3',
    "type": 'likert',
    "title": 'Creo que la plataforma fue fácil de usar',
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": 'Totalmente en desacuerdo',
    "maxLabel": 'Totalmente de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'exit4',
    "type": 'likert',
    "title": 'Creo que necesitaría ayuda de una persona con conocimientos técnicos para usar esta plataforma',
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": 'Totalmente en desacuerdo',
    "maxLabel": 'Totalmente de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'exit5',
    "type": 'likert',
    "title": 'Las funciones de esta plataforma están bien integradas',
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": 'Totalmente en desacuerdo',
    "maxLabel": 'Totalmente de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'exit6',
    "type": 'likert',
    "title": 'Creo que la plataforma es muy inconsistente',
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": 'Totalmente en desacuerdo',
    "maxLabel": 'Totalmente de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'exit7',
    "type": 'likert',
    "title": 'Imagino que la mayoría de la gente aprendería a usar esta plataforma de forma muy rápida',
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": 'Totalmente en desacuerdo',
    "maxLabel": 'Totalmente de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'exit8',
    "type": 'likert',
    "title": 'Encuentro que la plataforma es muy difícil de usar',
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": 'Totalmente en desacuerdo',
    "maxLabel": 'Totalmente de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'exit9',
    "type": 'likert',
    "title": 'Me siento confiado(a) al usar esta plataforma',
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": 'Totalmente en desacuerdo',
    "maxLabel": 'Totalmente de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'exit10',
    "type": 'likert',
    "title": 'Necesité aprender muchas cosas antes de ser capaz de usar esta plataforma',
    "start": 1,
    "stop": 5,
    "step": 1,
    "minLabel": 'Totalmente en desacuerdo',
    "maxLabel": 'Totalmente de acuerdo',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'exitComment',
    "type": 'paragraph',
    "title": 'Escribe en el siguiente espacio cualquier comentario que quisieras realizar sobre el estudio en el que acabas de participar',
    "required": false,
    "answer": null
  },
  {
    "questionId": 'nasatlx01',
    "type": 'anonlikert',
    "title": 'Exigencia Mental',
    "hint": '¿Que tan demandante mentalmente es la tarea?',
    "start": 1,
    "stop": 21,
    "step": 1,
    "minLabel": 'Muy baja',
    "maxLabel": 'Muy alta',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'nasatlx02',
    "type": 'anonlikert',
    "title": 'Exigencia Física',
    "hint": '¿Que tan demandante fisicamente es la tarea?',
    "start": 1,
    "stop": 21,
    "step": 1,
    "minLabel": 'Muy baja',
    "maxLabel": 'Muy alta',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'nasatlx03',
    "type": 'anonlikert',
    "title": 'Exigencia Temporal',
    "hint": '¿Que tan fuerte o rápido es el ritmo impuesto para hacer la tarea?',
    "start": 1,
    "stop": 21,
    "step": 1,
    "minLabel": 'Muy baja',
    "maxLabel": 'Muy alta',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'nasatlx04',
    "type": 'anonlikert',
    "title": 'Rendimiento',
    "hint": '¿Que tan exitoso ha sido para lograr lo que ha requerido?',
    "start": 1,
    "stop": 21,
    "step": 1,
    "minLabel": 'Perfecto',
    "maxLabel": 'Fracaso',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'nasatlx05',
    "type": 'anonlikert',
    "title": 'Esfuerzo',
    "hint": '¿Que tan duro tiene que trabajar para lograr un adecuado nivel de rendimiento?',
    "start": 1,
    "stop": 21,
    "step": 1,
    "minLabel": 'Muy bajo',
    "maxLabel": 'Muy alto',
    "required": true,
    "answer": null
  },
  {
    "questionId": 'nasatlx06',
    "type": 'anonlikert',
    "title": 'Frustración',
    "hint": '¿Que tan inseguro, irritado o estresado y molesto está por la tarea?',
    "start": 1,
    "stop": 21,
    "step": 1,
    "minLabel": 'Muy baja',
    "maxLabel": 'Muy alta',
    "required": true,
    "answer": null
  }
]);

db.tasks.insertMany([
  {
    "searchTaskId": 'task01',
    "title": 'Bandera especial',
    "description": 'Toda bandera nacional en el mundo comparte una característica geométrica común, excepto por un país. ¿Cuál es ese país?'
  },
  {
    "searchTaskId": 'task02',
    "title": 'Elemento radioactivo',
    "description": 'Después de haber acuñado el término "radioactivo", ella descubrió dos elementos radioactivos, uno de ellos puede ser fácilmente encontrado en el humo del cigarrillo. ¿Cuál es ese elemento?'
  }
]);

db.sessionflows.insertMany([
  {
    "sessionFlowId": 'short',
    "instructions": 'En este desafío se te presentarán 3 tareas de búsqueda, para las cuales deberás crear al menos 3 consultas de búsqueda para cada una (en idioma español), como si fueras a plantearlas en un motor de búsqueda web. Tienes 15 minutos para realizar este desafío.',
    "minQueries": 3,
    "stages": [
      { path: '/consent', timeLimit: -1 },
      { path: '/demographic', timeLimit: -1 },
      { path: '/typing-instructions', timeLimit: -1 },
      { path: '/typing', timeLimit: -1 },
      { path: '/instructions', params: 'short', timeLimit: -1 },
      { path: '/short-challenge', timeLimit: 15 },
      { path: '/exit-survey', timeLimit: -1 },
      { path: '/end', timeLimit: -1 }
    ]
  },
  {
    "sessionFlowId": 'extended',
    "instructions": 'En este desafío se te presentarán 3 tareas de búsqueda, para lo cual deberás hacer consultas de búsqueda (en idioma español y utilizando del motor de búsqueda de LeTiCiA) para encontrar documentos que puedan resolver dichas tareas. Una vez introducida la tarea, deberás llenar los cuestionarios para poder acceder al motor de búsqueda. Tienes 25 minutos para completar el desafío.',
    "minDocs": 3,
    "stages": [
      { path: '/consent', timeLimit: -1 },
      { path: '/demographic', timeLimit: -1 },
      { path: '/typing-instructions', timeLimit: -1 },
      { path: '/typing', timeLimit: -1 },
      { path: '/instructions', params: 'extended', timeLimit: -1 },
      { path: '/extended-challenge', timeLimit: 25 },
      { path: '/exit-survey', timeLimit: -1 },
      { path: '/end', timeLimit: -1 }
    ]
  },
]);

db.serverconfigs.insertMany([
  {
    "configName": "TaskRequestCount",
    "numberValue": 0
  }
]);