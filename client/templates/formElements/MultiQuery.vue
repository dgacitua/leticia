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
        :required="setRequiredQuery(q.queryNum)"
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
import { cloneVariable } from '../../services/Utils';

export default {
  name: 'multiquery',

  props: [
    'props'
  ],

  data() {
    return {
      minQueries: 0
    }
  },

  computed: {
    scale() {
      return this.createArray(this.props.queries);
    }
  },

  mounted() {
    this.minQueries = cloneVariable(this.props.queries);
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
    setRequiredQuery(queryNum) {
      return (queryNum <= this.minQueries);
    },
    focusTrack(evt) {
      let message = {
        type  : 'QueryFocus',
        source: 'Window',
        url   : window.document.URL,
        clientTimestamp: Date.now(),
        details: {
          textboxName: evt.target.name
        }
      };

      window.dispatchEvent(new CustomEvent('leticia-action', { detail: message }));
      //console.log('QueryFocus', message);
    },
    blurTrack(evt) {
      let message = {
        type  : 'QueryBlur',
        source: 'Window',
        url   : window.document.URL,
        clientTimestamp: Date.now(),
        details: {
          textboxName: evt.target.name
        }
      };

      window.dispatchEvent(new CustomEvent('leticia-action', { detail: message }));
      //console.log('QueryBlur', message);
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
  max-width: 100%;
  margin-bottom: 10px;
}
</style>