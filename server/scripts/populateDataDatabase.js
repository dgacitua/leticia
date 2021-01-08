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
    "formId": "query",
    "questions": [ "query" ]
  },
  {
    "formId": "exit",
    "questions": [ "exit1", "exit2", "exit3", "exit4", "exit5", "exit6", "exit7", "exit8", "exit9", "exit10", "exitComment" ]
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
    "searchTaskId": 'task03',
    "title": 'Punto Triple',
    "description": '¿Cuál es el punto triple del elemento que forma la mayoría de lo que estás inhalando ahora (en grados C)?'
  },
  {
    "searchTaskId": 'task04',
    "title": 'Tratamiento con MMS',
    "description": 'A una amiga que tiene un diagnóstico de diabetes le sugirieron que probara un tratamiento alternativo basado en la MMS, pero no está segura de su efectividad, por lo que decides ayudarla para tomar la decisión correcta. Al respecto, ¿qué es el MMS y cómo está compuesto? ¿Puede tratar los síntomas de la diabetes? ¿Está científicamente probada su efectividad?'
  },
  {
    "searchTaskId": 'task05',
    "title": 'Redes 5G',
    "description": 'Los vecinos de tu barrio están comentando que se está evaluando la opción de instalar una antena 5G en el sector, como parte de un programa piloto para mejorar el servicio de telefonía móvil. Para tener una opinión informada del tema, decides buscar al respecto: ¿Qué es una red 5G? ¿Cuáles son sus ventajas y desventajas? ¿Es seguro instalar una antena 5G en un barrio residencial?'
  }
]);

db.sessionflows.insertMany([
  {
    "sessionFlowId": 'short',
    "instructions": 'En este desafío se te presentarán una serie de tareas de búsqueda, para las cuales deberás crear al menos 3 consultas de búsqueda para cada una, como si fueras a plantearlas en un motor de búsqueda web. Tienes 15 minutos para realizar este desafío.',
    "stages": [
      { path: '/consent', timeLimit: -1 },
      { path: '/demographic', timeLimit: -1 },
      { path: '/typing', timeLimit: -1 },
      { path: '/instructions', params: 'short', timeLimit: -1 },
      { path: '/short-challenge', timeLimit: 15 },
      { path: '/exit-survey', timeLimit: -1 },
      { path: '/end', timeLimit: -1 }
    ]
  },
  {
    "sessionFlowId": 'extended',
    "instructions": 'En este desafío se te presentarán una serie de tareas de búsqueda, para lo cual deberás hacer consultas de búsqueda para encontrar documentos que puedan resolver dichas tareas. Una vez introducida la tarea, deberás llenar los cuestionarios para poder acceder al motor de búsqueda de LeTiCiA. Tienes 25 minutos para completar el desafío.',
    "stages": [
      { path: '/consent', timeLimit: -1 },
      { path: '/demographic', timeLimit: -1 },
      { path: '/typing', timeLimit: -1 },
      { path: '/instructions', params: 'extended', timeLimit: -1 },
      { path: '/extended-challenge', timeLimit: 25 },
      { path: '/exit-survey', timeLimit: -1 },
      { path: '/end', timeLimit: -1 }
    ]
  },
]);