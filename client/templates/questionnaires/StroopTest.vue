<template>
  <b-container>
    <div id="stroop-instructions" v-if="state==='instructions'">
      <!-- TODO Stroop Instructions -->
    </div>  
    <div id="stroop-test" v-else-if="state==='test'">
      <b-card>
        <b-form>
          <div>
            ¿El texto coincide con el color?
          </div>
          <div :class="`text-center ${currentColor}`">
            <h1>{{ currentText }}</h1>
          </div>
          <b-row>
            <b-col cols="6" offset="3" class="text-center">
              <b-progress :max="100">
                <b-progress-bar :value="completedPerc"></b-progress-bar>
              </b-progress>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col cols="6" offset="3" class="text-center">
              <b-button variant="primary" @click="selectAnswer($event, true)">Si</b-button>
              <b-button variant="primary" @click="selectAnswer($event, false)">No</b-button>
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
const RESPONSE_TIME_MS = 750;
const TRIALS_AMOUNT = 20;

export default {
  data() {
    return {
      state: 'loading',
      answers: [],
      currentText: '',
      currentColor: '',
      lastTextIdx: null,
      lastColorIdx: null,
      textColors: [ 'AMARILLO', 'AZUL', 'ROSA', 'NARANJA', 'ROJO', 'VERDE' ],
      styleColors: [ 'text-yellow', 'text-blue', 'text-pink', 'text-orange', 'text-red', 'text-green' ],
    }
  },

  computed: {
    completedPerc() {
      return 100;
    }
  },
  
  mounted() {
    this.state = 'test';
    this.displayNextElement();
  },

  methods: {
    selectAnswer(evt, match) {
      let isCorrectAnswer = (match && this.lastTextIdx === this.lastColorIdx) || (!match && this.lastTextIdx !== this.lastColorIdx);
      console.log('StroopResponse', match, isCorrectAnswer);
      this.displayNextElement();
    },
    createTimer() {
      // TODO crear timer stroop
    },
    displayNextElement() {
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
    },
    randomInt(min, max) {
      // Random integer between min and max (inclusive)
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomBool() {
      // Random boolean
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