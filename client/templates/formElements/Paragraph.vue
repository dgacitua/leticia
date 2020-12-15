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
import ActionSender from '../../services/ActionSender';
import ActionHandler from '../../trackers/ActionHandler';
import KeystrokeHandler from '../../trackers/KeystrokeHandler';

export default {
  name: 'paragraph',

  props: [
    'props'
  ],

  data() {
    return {
      ksHandler: new KeystrokeHandler('FormElement'),
      actionHandler: new ActionHandler('FormElement'),
      sender: new ActionSender('FormElement')
    }
  },

  methods: {
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