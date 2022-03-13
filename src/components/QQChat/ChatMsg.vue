<template>
  <div class="chat-item" :class="[onright ? 'right-chat' : 'left-chat']">
    <div class="chat-content">
      <div class="chat-name">{{ name }}</div>
      <div class="bubble">
        <div class="bubble-arrow"></div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatMsg',
  props: {
    name: { type: String, required: true },
    onright: Boolean,
  },
})
</script>
