<template>
  <div class="chat-quote">
    <div class="quote-name">{{ name }}{{ time ? '&nbsp;' + time : '' }}</div>
    <div class="quote-content"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatQuote',
  props: {
    name: { type: String, required: true },
    time: {
      type: String,
      default: '',
    },
  },
})
</script>

<style scoped lang="scss">
.chat-quote {
  background-color: #eee;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  font-size: 0.85em;
}

.quote-name {
  margin-bottom: 3px;
}

.quote-content:deep() > img {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 15vw;
  min-width: 180px;
  border-radius: 10px;
}
</style>
