<template>
  <b-row class="zero-margin">
    <b-col>
      <b-row>
        <b>{{ props.title }} <span v-if="props.required" class="form-asterisk">*</span></b>
      </b-row>
      <br>
      <b-row>
        <b-col>
          <b-row v-if="props.hint" id="hint" class="help-block">
            {{ props.hint }}
          </b-row>
          <b-row>
            rutina de ejercicios<br>
            ejercicios adulto mayor<br>
            rutina bajo impacto
          </b-row>
          <b-row>
            <b-form-input
              v-model="currentQuery"
              :id="`query-${props.questionId}`"
              :name="`query-${props.questionId}`"
              @focus="focus"
              @blur="blur"
              @keydown="keydown"
              @keyup="keyup"
              @keydown.enter="newQuery"
              autocomplete="off"
              class="query-box">
            </b-form-input>
          </b-row>
          <b-row>
            <b-button @click="newQuery">
              Ingresar otra consulta
            </b-button>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import ActionSender from '../../services/ActionSender';
import ActionHandler from '../../trackers/ActionHandler';
import KeystrokeHandler from '../../trackers/KeystrokeHandler';

import { deepCopy } from '../../services/Utils';

export default {
  name: 'multiquery2',

  props: [
    'props'
  ],

  data() {
    return {
      ksHandler: new KeystrokeHandler('QueryPlanning'),
      actionHandler: new ActionHandler('QueryPlanning'),
      sender: new ActionSender('QueryPlanning'),
      minQueries: 0,
      currentQuery: ''
    }
  },

  computed: {
    scale() {
      return this.createArray(this.props.queries);
    }
  },

  mounted() {
    this.minQueries = deepCopy(this.props.queries);
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
    focus(evt) {
      let act = this.actionHandler.focus(evt);

      this.sender.sendGenericAction(act)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
      
      //window.dispatchEvent(new CustomEvent('leticia-action', { detail: message }));
      //console.log('QueryFocus', message);
    },
    blur(evt) {
      let act = this.actionHandler.blur(evt);

      this.sender.sendGenericAction(act)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));

      //window.dispatchEvent(new CustomEvent('leticia-action', { detail: message }));
      //console.log('QueryBlur', message);
    },
    keydown(evt) {
      let ks = this.ksHandler.keydown(evt);
      this.props.keystrokeBuffer.push(ks);
    },
    keyup(evt) {
      let ks = this.ksHandler.keyup(evt);
      this.props.keystrokeBuffer.push(ks);
    },
    newQuery(evt) {

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

.zero-margin {
  margin: 0px 0px 0px 0px;
}
</style>