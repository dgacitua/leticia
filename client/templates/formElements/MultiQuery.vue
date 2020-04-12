<template>
  <div>
    <div>
      <b>{{ props.title }}</b>
      <span v-if="props.required" class="form-asterisk">*</span>
    </div>
    <div v-if="props.hint" class="help-block">
      {{ props.hint }}
    </div>
    <div v-for="q in scale" :key="q.queryNum">
      <b-form-input
        v-model="props.answer[q.queryNum]"
        :name="`query-${props.questionId}-${q.queryNum}`"
        @focus="focusTrack"
        @blur="blurTrack"
        class="query-box">
      </b-form-input>
    </div>
    <div>
      <b-button @click="addQuery">
        Ingresar otra consulta
      </b-button>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: 'multiquery',

  props: [
    'props'
  ],

  computed: {
    scale() {
      return this.createArray(this.props.queries);
    }
  },

  methods: {
    addQuery() {
      this.props.queries++;
    },
    createArray(num) {
      let result = [];
      for (let i=1; i<=num; i++) result.push({ queryNum: i });
      return result;
    },
    focusTrack(evt) {
      let message = {
        type  : 'QueryFocus',
        source: 'Window',
        url   : window.document.URL,
        clientTimestamp: Date.now(),
        textboxName: evt.target.name
      };

      console.log('QueryFocus', message);
    },
    blurTrack(evt) {
      let message = {
        type  : 'QueryBlur',
        source: 'Window',
        url   : window.document.URL,
        clientTimestamp: Date.now(),
        textboxName: evt.target.name
      };

      console.log('QueryBlur', message);
    }
  }
}
</script>

<style scoped>
.form-asterisk {
  font-weight: bold;
  color: #FF0000;
}

.query-box {
  max-width: 75%;
  margin-bottom: 5px;
}
</style>