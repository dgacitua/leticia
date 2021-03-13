<template>
  <b-container>
    <div id="stroop-instructions" v-if="state==='instructions'">
      <b-card>
        <p>
          En esta prueba, verás nombres de colores (amarillo, azul, rosa, naranja, rojo, verde) impresos en diferentes colores.
        </p>
        <p>
          El objetivo de esta prueba es detectar si el nombre del color coincide con el color en el cual está impreso.
        </p>
        <p>
          Por ejemplo, si ves:
        </p>
        <h1 class="text-center text-red">
          VERDE
        </h1>
        <p>
          Debes presionar el botón "No", ya que el nombre del color no coincide con el color impreso.
        </p>
        <p>
          Por otro lado, si ves:
        </p>
        <h1 class="text-center text-blue">
          AZUL
        </h1>
        <p>
          Debes presionar el botón "Si", ya que el nombre del color y el color impreso coinciden.
        </p>
        <p>
          Intenta responder lo más rápidamente posible esta prueba. Una vez que estés listo(a) para empezar, presiona el botón "Ir a la prueba".
        </p>
      </b-card>
      <br>
      <b-row class="text-right">
        <b-col>
          <b-button @click="skipInstructions" variant="success">Ir a la prueba</b-button>
        </b-col>
      </b-row>
    </div>
    <div id="stroop-countdown" v-else-if="state==='countdown'">
      <b-row class="text-center">
        <b-col>
          <h1>{{ countdownLabel }}</h1>
        </b-col>
      </b-row>
    </div>
    <div id="stroop-test" v-else-if="state==='test'">
      <b-card>
        <b-form>
          <div>
            ¿El texto coincide con el color?
          </div>
          <div :class="`text-center ${currentColor}`">
            <h1 v-if="stroopLock"><br></h1>
            <h1 v-else>{{ currentText }}</h1>
          </div>
          <b-row>
            <b-col cols="6" offset="3" class="text-center">
              <progress-bar :val="completedPerc" max="100" bar-transition="all 0.1s linear"></progress-bar>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col cols="6" offset="3" class="text-center">
              <b-button variant="primary" :disabled="stroopLock" @click="selectAnswer($event, 'Match')">Si</b-button>
              <b-button variant="primary" :disabled="stroopLock" @click="selectAnswer($event, 'Mismatch')">No</b-button>
            </b-col>
          </b-row> 
        </b-form>
      </b-card>
    </div>
    <div id="stroop-loading" v-else>
      <b-row class="text-center">
        <b-col>
          <font-awesome-icon :icon="['fas', 'spinner']" size="3x" spin></font-awesome-icon>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import Axios from 'axios';
import ProgressBar from 'vue-simple-progress';

import * as Constants from '../../services/Constants';
import { getVueArray, deepCopy } from '../../services/Utils';
import EventBus from '../../modules/eventBus';

const RESPONSE_TIME_MS = 1500;
const REFRESH_TIME_MS = 100;
const RESPONSE_LOCK_MS = 250;
const TRIALS_AMOUNT = 20;

export default {
  components: {
    ProgressBar
  },

  data() {
    return {
      state: 'loading',
      formId: '',
      answers: [],
      trialCounter: 0,
      stroopTimer: null,
      stroopTimerCounter: 0,
      stroopLock: false,
      countdownTimer: null,
      countdownTimerCounter: 0,
      countdownLabel: 0,
      initTime: 0,
      currentText: '',
      currentColor: '',
      lastTextIdx: null,
      lastColorIdx: null,
      textColors: [ 'AMARILLO', 'AZUL', 'ROSA', 'NARANJA', 'ROJO', 'VERDE' ],
      styleColors: [ 'text-yellow', 'text-blue', 'text-pink', 'text-orange', 'text-red', 'text-green' ],
      colorRef: [ 'Yellow', 'Blue', 'Pink', 'Orange', 'Red', 'Green' ],
    }
  },

  computed: {
    completedPerc() {
      return Math.round((this.stroopTimerCounter / RESPONSE_TIME_MS) * 100);
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  
  mounted() {
    this.state = 'instructions';
    this.formId = this.$route.query.form;
  },

  methods: {
    skipInstructions() {
      this.state = 'countdown';
      this.setCountdown();
    },
    setCountdown() {
      let timerGoal = 3;
      this.countdownLabel = 3;

      this.countdownTimer = setInterval(() => {
        //console.log('Countdown!', this.countdownLabel, this.countdownTimerCounter);
        this.countdownTimerCounter += 1;
        this.countdownLabel -= 1;

        if (this.countdownTimerCounter >= timerGoal) {
          clearInterval(this.countdownTimer);
          this.state = 'test';
          this.displayNextElement();
        }
      }, 1000);
    },
    selectAnswer(evt, response) {
      clearInterval(this.stroopTimer);

      let isCorrectAnswer = (response === 'Match' && this.lastTextIdx === this.lastColorIdx) || (response === 'Mismatch' && this.lastTextIdx !== this.lastColorIdx);
      let answerTime = Date.now() - this.initTime;

      let stroopRes = {
        trialNumber: this.trialCounter,
        currentText: this.colorRef[this.lastTextIdx],
        currentColor: this.colorRef[this.lastColorIdx],
        userAnswer: response,
        answerTime: answerTime,
        isCorrectAnswer: isCorrectAnswer,
        clientTimestamp: this.initTime
      };

      console.log('StroopResponse', response, answerTime, isCorrectAnswer, stroopRes);

      this.answers.push(stroopRes);
      this.displayNextElement();
    },
    createTimer() {
      this.stroopTimerCounter = 0;
      this.stroopTimer = setInterval(this.timerCallback, REFRESH_TIME_MS);
    },
    timerCallback() {
      this.stroopTimerCounter += REFRESH_TIME_MS;
      //console.log('StroopTimer!', this.stroopTimerCounter);

      if (this.stroopTimerCounter >= RESPONSE_TIME_MS) {
        this.selectAnswer(null, 'Timeout');
        //console.log('StroopTimerEnd!');
      }
    },
    displayNextElement() {
      this.stroopLock = true;

      let stroopLockTimer = setTimeout(() => {
        this.stroopLock = false;
        this.trialCounter++;

        if (this.trialCounter <= TRIALS_AMOUNT) {
          // Generate random colors
          let textIdx = this.randomInt(0, this.textColors.length - 1);
          let colorIdx = this.randomInt(0, this.styleColors.length - 1);
          let equal = this.randomBool();

          // Verify that last color doesn't repeat
          while ((textIdx === this.lastTextIdx) || (colorIdx === this.lastColorIdx)) {
            textIdx = this.randomInt(0, this.textColors.length - 1);

            if (equal) colorIdx = textIdx;
            else colorIdx = this.randomInt(0, this.styleColors.length - 1);
          }

          // Assign text and color
          this.currentText = this.textColors[textIdx];
          this.currentColor = this.styleColors[colorIdx];

          // Backup last used text and color
          this.lastTextIdx = textIdx;
          this.lastColorIdx = colorIdx;

          // Set timers
          this.initTime = Date.now();
          this.createTimer();
        }
        else {
          this.state = 'loading';
          this.submitAnswers();
        }
      }, RESPONSE_LOCK_MS);
    },
    submitAnswers() {
      if (this.loggedIn) {
        let response = {
          username: this.currentUser.username,
          taskId: deepCopy(this.$route.query.task || 'NoTask'),
          formId: deepCopy(this.$route.query.form || 'StroopTest'),
          clientTimestamp: Date.now(),
          answers: deepCopy(getVueArray(this.answers))
        }

        console.log('StroopResponses', response);

        Axios.post(`${Constants.backendApiUrl}/answers`, response)
          .then((res) => {
            EventBus.$emit('leticia-next-challenge');
          })
          .catch((err) => {
            console.error(err);
            alert('Ha ocurrido un error al enviar las respuestas [Código 477]');
          });
      }
    },
    randomInt(min, max) {
      // Random integer between min and max (inclusive)
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomBool() {
      // Random boolean (with equal probability)
      return !!(Math.random < 0.5);
    }
  }
}
</script>

<style scoped>
.text-yellow {
  color: gold;
}

.text-red {
  color: red;
}

.text-blue {
  color: blue;
}

.text-orange {
  color: darkorange;
}

.text-pink {
  color: hotpink;
}

.text-green {
  color: green;
}
</style>