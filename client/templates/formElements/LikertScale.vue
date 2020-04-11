<template>
  <div>
    <div>
      <b>{{ props.title }}</b>
      <span v-if="props.required" class="form-asterisk">*</span>
    </div>
    <div v-if="props.hint" class="help-block">
      {{ props.hint }}
    </div>
    <div>
      <table class="table table-borderless table-condensed table-nonfluid">
        <tbody>
          <tr>
            <td class="table-nopadding"></td>
            <td class="table-nopadding" v-for="op in scale" :key="op.value">{{ op.value }}</td>
            <td class="table-nopadding"></td>
          </tr>
          <tr>
            <td class="table-nopadding text-right">{{ props.minLabel }}</td>
            <td class="table-nopadding text-center scale-choice" v-for="op in scale" :key="op.value">
              <b-form-radio
                v-model="props.answer"
                :value="op.value"
                :required="props.required"
                :name="props.questionId">
              </b-form-radio>
            </td>
            <td class="table-nopadding text-left">{{ props.maxLabel }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: 'likertscale',

  props: [
    'props'
  ],

  computed: {
    scale() {
      return this.generateScale(this.props.start, this.props.stop, this.props.step);
    }
  },

  methods: {
    generateScale(start, stop, step) {
      if (isNaN(stop) || !stop) stop = start, start = 0;
      if (isNaN(step) || !step) step = 1;
      if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) return [];

      let result = [];
      for (let i = start; step > 0 ? i <= stop : i >= stop; i += step) { result.push({ text: '', value: i }) }
      return result;
    }
  }
}
</script>

<style scoped>
.form-asterisk {
  font-weight: bold;
  color: #FF0000;
}

.table-nopadding {
  padding-top: 0px;
  padding-bottom: 0px;
}

.table-nonfluid {
  width: auto !important;
}

.help-block {
  margin-top: 0px;
  margin-bottom: 0px;
}

.scale-choice {
  padding-left: 10px !important;
  padding-right: 10px !important;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}
</style>