<template>
  <b-container>
    <div id="stroop-instructions" v-if="state==='instructions'">
      <!-- TODO Stroop Instructions -->
      <b-card>
        TODO
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
import ProgressBar from 'vue-simple-progress';

const RESPONSE_TIME_MS = 1000;
const REFRESH_TIME_MS = 100;
const RESPONSE_LOCK_MS = 150;
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
      // TODO save answers on backend
      // TODO go to next stage
      console.log('StroopResponses', this.answers);
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