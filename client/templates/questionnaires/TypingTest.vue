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
    <b-form @submit="onSubmit">
      <b-form-group
        :id="`label-${currentSample.id}`"
        :label="currentSample.text"
        :label-for="`input-${currentSample.id}`"
      >
        <b-form-input
          :id="`input-${currentSample.id}`"
          @keydown="keydown"
          @keyup="keyup"
          @keydown.enter="nextSample"
          v-model="response[sampleIndex]"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-button v-if="!isLastSlide" variant="primary" :disabled="!isValidInput" @click="nextSample">Siguiente</b-button>
      <b-button v-if="isLastSlide" type="submit" variant="success">Finalizar</b-button>
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

import KeystrokeHandler from '../../trackers/KeystrokeHandler';

export default {
  name: 'demographic',

  data() {
    return {
      samples: TypingTestSamples,
      sampleIndex: 0,
      handler: new KeystrokeHandler('TypingTest'),
      response: [],
      keystrokeBuffer: [],
      carouselInterval: 0,
      lastSlide: false
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
    getIndex(item, array) {
      return array.indexOf(item);
    },
    getIndexById(id, array) {
      return array.findIndex(e => id === e.id);
    },
    getLastElement(array) {
      return array.slice(-1);
    },
    onSubmit(evt) {
      evt.preventDefault();
      console.log('Response!', this.response);
    },
    keydown(evt) {
      let ks = this.handler.keydown(evt);
      this.keystrokeBuffer.push(ks);
      //console.log(this.keystrokeBuffer);
    },
    keyup(evt) {
      let ks = this.handler.keyup(evt);
      this.keystrokeBuffer.push(ks);
      //console.log(this.keystrokeBuffer);
    },
    nextSample(evt) {
      if (this.isValidInput) {
        if (!this.isLastSlide) {
          this.sampleIndex++;
          console.log('KSBuffer!', this.keystrokeBuffer);
          // TODO send buffer to backend
          this.keystrokeBuffer.length = 0;
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

.text-carousel {
  color: #000000;
}
</style>