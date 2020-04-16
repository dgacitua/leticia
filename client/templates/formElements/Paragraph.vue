<template>
  <div class="zero-margin">
    <div>
      <b>{{ props.title }}</b>
      <span v-if="props.required" class="form-asterisk">*</span>
    </div>
    <div v-if="props.hint" class="help-block">
      {{ props.hint }}
    </div>
    <div>
      <b-form-textarea
        v-model="props.answer"
        :required="props.required"
        :name="`paragraph-${props.questionId}`"
        @focus="focusTrack"
        @blur="blurTrack"
        class="paragraph-box"
        rows="5">
      </b-form-textarea>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: 'paragraph',

  props: [
    'props'
  ],

  methods: {
    focusTrack(evt) {
      let message = {
        type  : 'QueryFocus',
        source: 'Window',
        url   : window.document.URL,
        clientTimestamp: Date.now(),
        textboxName: evt.target.name
      };

      console.log('QueryFocus', message);
    },
    blurTrack(evt) {
      let message = {
        type  : 'QueryBlur',
        source: 'Window',
        url   : window.document.URL,
        clientTimestamp: Date.now(),
        textboxName: evt.target.name
      };

      console.log('QueryBlur', message);
    }
  }
}
</script>

<style scoped>
.form-asterisk {
  font-weight: bold;
  color: #FF0000;
}

.paragraph-box {
  max-width: 90%;
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

.zero-margin {
  margin: 0px 0px 0px 0px;
}
</style>