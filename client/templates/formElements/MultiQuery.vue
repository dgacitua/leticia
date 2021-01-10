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
          <b-row v-for="q in scale" :key="q.queryNum">
            <b-form-input
              v-model="props.answer[q.queryNum]"
              :id="`query-${props.questionId}-${q.queryNum}`"
              :name="`query-${props.questionId}-${q.queryNum}`"
              :required="setRequiredQuery(q.queryNum)"
              @focus="focus"
              @blur="blur"
              @keydown="keydown"
              @keyup="keyup"
              autocomplete="off"
              class="query-box">
            </b-form-input>
          </b-row>
          <b-row>
            <b-button @click="addQuery">
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
  name: 'multiquery',

  props: [
    'props'
  ],

  data() {
    return {
      ksHandler: new KeystrokeHandler('QueryPlanning'),
      actionHandler: new ActionHandler('QueryPlanning'),
      sender: new ActionSender('QueryPlanning'),
      minQueries: 0
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