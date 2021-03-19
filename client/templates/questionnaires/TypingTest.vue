<template>
  <b-container id="typing-test">
    <b-row>
      <b-col>
        <div>
          <h1>Test de Escritura</h1>
        </div>
        <div>
          <p>
            Tipea cada extracto de texto que veas en el campo de texto tal cual como está escrito.<br>
            Usa tu velocidad de tipeo natural, no te aceleres.<br>
            Presiona Enter o Siguiente para continuar con el siguiente texto.
          </p>
        </div>
      </b-col>
    </b-row>
    <br>
    <b-card>
      <b-form @submit.stop.prevent>
        <div id="sample-text">
          <i>{{ currentSample.text }}</i>
        </div>
        <br>
        <b-form-group :id="`label-${currentSample.id}`">
          <b-form-input
            :id="`input-${currentSample.id}`"
            :name="`input-${currentSample.id}`"
            @focus="focus"
            @blur="blur"
            @keydown="keydown"
            @keyup="keyup"
            @keydown.enter="nextSample"
            @paste.prevent
            v-model="response[sampleIndex]"
            type="text"
            autocomplete="off"
            required
          ></b-form-input>
        </b-form-group>
        <b-row>
          <b-col cols="9">
            <b-progress :max="100" height="2rem">
              <b-progress-bar :value="completedPerc">
                <span><strong>{{ completedPerc }}%</strong> completado</span>
              </b-progress-bar>
            </b-progress>
          </b-col>
          <b-col v-if="!isLastSlide" cols="3" class="text-right">
            <b-button variant="primary" :disabled="!isValidInput" @click="nextSample">Siguiente</b-button>
          </b-col>
          <b-col v-if="isLastSlide" cols="3" class="text-right">
            <b-button variant="success" :disabled="!isValidInput" @click="nextSample">Finalizar</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <!--
    <hr>
    <b-row>
      <pre>{{ response }}</pre>
    </b-row>
    -->
  </b-container>
</template>

<script>
import Mark from 'mark.js';
import StringSimilarity from 'string-similarity';   // Based on Sørensen–Dice coefficient
// import { distance } from 'fastest-levenshtein';  // Based on Levenshtein distance

import TypingTestSamples from '../../assets/typingTestSamples-es.json';

import ActionSender from '../../services/ActionSender';
import ActionHandler from '../../trackers/ActionHandler';
import KeystrokeHandler from '../../trackers/KeystrokeHandler';

import EventBus from '../../modules/eventBus';
import { deepCopy, findNextWordPosition, getWordBoundsAtPosition } from '../../services/Utils';

export default {
  name: 'typing-test',

  data() {
    return {
      samples: TypingTestSamples.slice(0, 7),
      sampleIndex: 0,
      ksHandler: new KeystrokeHandler('TypingTest'),
      actionHandler: new ActionHandler('TypingTest'),
      sender: new ActionSender('TypingTest'),
      response: [],
      keystrokeBuffer: [],
      highlightedText: ''
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentSample() {
      return this.samples[this.sampleIndex];
    },
    currentResponse() {
      return this.response[this.sampleIndex] || '';
    },
    isValidInput() {
      let cond1 = !!this.currentResponse;
      let cond2 = this.currentResponse.length > 0;
      let cond3 = StringSimilarity.compareTwoStrings(this.currentSample.text, this.currentResponse) >= 0.9;
      // let cond3 = distance(this.currentSample.text, this.currentResponse) <= (this.currentSample.text.length * 0.9);
      return cond1 && cond2 && cond3;
    },
    isLastSlide() {
      return this.sampleIndex >= (this.samples.length - 1);
    },
    completedPerc() {
      return Math.round((this.sampleIndex / this.samples.length) * 100);
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
          alert('Ha ocurrido un error al guardar las respuestas [Código 471]');
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
      //this.callHighlight(evt);
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
    },
    callHighlight(evt) {
      // DEPRECATED
      // TODO fix highlight
      let value = evt.target.value;
      let cursorIdx = evt.target.selectionStart;
      let bounds = getWordBoundsAtPosition(value, cursorIdx);
      let text = this.currentSample.text;
      let nextWord = text.substring(bounds[1], text.length).split(' ')[1];

      let hlStart = bounds[0];
      let hlLength = bounds[1] - bounds[0];

      console.log('hlExp', value, findNextWordPosition(text, value));

      let hl1 = findNextWordPosition(text, value)[0];
      let hl2 = findNextWordPosition(text, value)[1];

      //console.log('hlCall', nextWord, hlStart, hlLength);
      
      this.highlightSampleText('', hl1, hl2);
    },
    highlightSampleText(snip, start = 0, length = 0) {
      // DEPRECATED
      let snippet = snip || '';
      let searchables = document.querySelector('#sample-text');
      
      //console.log('hlFn', snippet, start, length);

      const markInstance = new Mark(searchables);

      let markText = () => {
        markInstance.mark(snippet, {
          accurracy: 'exactly',
          iframes: true,
          acrossElements: true,
          separateWordSearch: true,
          className: 'highlight'
        })
      };

      let markRegExp = () => {
        markInstance.markRegExp(snippet, {
          iframes: true,
          acrossElements: true,
          className: 'highlight'
        })
      };

      let markRanges = () => {
        markInstance.markRanges([{ start: start, length: length }], {
          iframes: true,
          acrossElements: true,
          className: 'highlight'
        })
      };

      markInstance.unmark({
        iframes: true,
        done: markRanges
      });
    }
  }
}
</script>

<style>
.highlight {
  font-weight: bold;
  color: #000000;
  background-color: #E0FBFF;
  text-decoration: none;
}

#typing-test {
  display: flex;
  flex-direction: row;
}
</style>