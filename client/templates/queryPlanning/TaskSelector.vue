<template>
  <b-container>
    <b-row>
      <h2>Selecciona una tarea a realizar:</h2>
    </b-row>
    <b-row>
      <b-card-group deck>
        <div v-for="task in searchTasks" :key="task.searchTaskId">
          <b-card :title="task.title" class="mb-2 task-card">
            <b-card-text>
              {{ task.description }}
            </b-card-text>
            <span v-if="task.completed">COMPLETADA</span>
            <b-link href="#" class="card-link" v-if="!task.completed">Seleccionar tarea</b-link>
          </b-card>
        </div>
      </b-card-group>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'task-selector',
  
  data() {
    return {
      searchTasks: [
        {
          searchTaskId: 'task01',
          title: 'Rutina de ejercicios',
          description: 'El doctor de tu abuela le dijo que hacer más ejercicio incrementa su estado físico y le ayuda a evitar lesiones. Tu abuela no usa Internet y te ha solicitado crear una rutina de ejercicios para ella. Ella tiene 90 años. Crea dos rutinas de bajo impacto de 30 minutos para que ella pueda alternar durante la semana.'
        },
        {
          searchTaskId: 'task02',
          title: 'Comunicación en redes sociales',
          description: 'Has notado que servicios en línea como Facebook han reemplazado las comunicaciones cara a cara. Puedes ver las ventajas de este estilo de comunicación, pero tu hermano argumenta que la gente está perdiendo su habilidad de comunicarse cara a cara. En general, ¿el uso de computadores para comunicación tiene un impacto positivo o negativo en las habilidades sociales cara a cara de la gente?'
        },
        {
          searchTaskId: 'task03',
          title: 'TEST',
          description: 'TEST',
          completed: true
        },
      ]
    }
  },

  methods: {
    
  }
}
</script>

<style scoped>
.task-card {
  width: 20rem;
}
</style>