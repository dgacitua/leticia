<template>
  <b-container id="typing-test">
    <b-row>
      <div><h1>Test de Escritura</h1><div>
      <div>
        <p>Copia cada extracto de texto en el campo de entrada.<br>
        Presiona Enter o Siguiente para continuar con el siguiente texto.<br>
        Presiona Finalizar para terminar la actividad.</p>
      </div>
    </b-row>
    <br>
    <b-form @submit="nextSample">
      <b-form-group
        :id="`label-${currentSample.id}`"
        :label="currentSample.text"
        :label-for="`input-${currentSample.id}`"
      >
        <b-form-input
          :id="`input-${currentSample.id}`"
          :name="`input-${currentSample.id}`"
          @focus="focus"
          @blur="blur"
          @keydown="keydown"
          @keyup="keyup"
          @keydown.enter="nextSample"
          v-model="response[sampleIndex]"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-row>
        <b-col>
          <b-button v-if="!isLastSlide" variant="primary" :disabled="!isValidInput" @click="nextSample">Siguiente</b-button>
        </b-col>
        <b-col class="text-right">
          <b-button v-if="isLastSlide" variant="success" :disabled="!isValidInput" type="submit">Finalizar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <!--
    <hr>
    <b-row>
      <pre>{{ response }}</pre>
    </b-row>
    -->
  </b-container>
</template>

<script>
import TypingTestSamples from '../../assets-client/typingTestSamples-es.json';

import ActionSender from '../../services/ActionSender';
import ActionHandler from '../../trackers/ActionHandler';
import KeystrokeHandler from '../../trackers/KeystrokeHandler';

import EventBus from '../../modules/eventBus';
import { deepCopy } from '../../services/Utils';

export default {
  name: 'demographic',

  data() {
    return {
      samples: TypingTestSamples,
      sampleIndex: 0,
      ksHandler: new KeystrokeHandler('TypingTest'),
      actionHandler: new ActionHandler('TypingTest'),
      sender: new ActionSender('TypingTest'),
      response: [],
      keystrokeBuffer: []
    }
  },

  computed: {
    currentSample() {
      return this.samples[this.sampleIndex];
    },
    isValidInput() {
      return (!!this.response[this.sampleIndex]) && (this.response[this.sampleIndex].length > 0);
    },
    isLastSlide() {
      return this.sampleIndex >= (this.samples.length - 1);
    }
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      let response = deepCopy(this.response);

      this.sender.sendTypingTestResponses(response)
        .then(res => {
          console.log(res.data);
          EventBus.$emit('leticia-next-stage');
        })
        .catch(err => {
          console.error(err);
          alert('Ha ocurrido un error al guardar las respuestas');
        });
    },
    focus(evt) {
      let act = this.actionHandler.focus(evt);

      this.sender.sendGenericAction(act)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    },
    blur(evt) {
      let act = this.actionHandler.blur(evt);

      this.sender.sendGenericAction(act)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    },
    keydown(evt) {
      let ks = this.ksHandler.keydown(evt);
      this.keystrokeBuffer.push(ks);
    },
    keyup(evt) {
      let ks = this.ksHandler.keyup(evt);
      this.keystrokeBuffer.push(ks);
    },
    nextSample(evt) {
      if (this.isValidInput) {
        let buffer = deepCopy(this.keystrokeBuffer);

        this.sender.sendKeystrokeBuffer(buffer)
          .then(res => console.log(res.data))
          .catch(err => console.error(err));
        
        this.keystrokeBuffer.length = 0;

        if (!this.isLastSlide) {
          this.sampleIndex++;
        }
        else {
          this.onSubmit(evt);
        }
      }
    }
  }
}
</script>

<style scoped>
#typing-test {
  display: flex;
  flex-direction: row;
}
</style>