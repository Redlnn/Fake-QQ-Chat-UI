<template>
  <div class="chat-item" :class="[onright ? 'right-chat' : 'left-chat']">
    <div v-if="avatar" :style="{ 'background-image': `url(${avatar})` }" class="chat-avatar"></div>
    <div v-else class="chat-avatar"><span class="chat-avatar-text">{{ name[0] }}</span></div>
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
    avatar: String,
    onright: Boolean,
  },
})
</script>
