<template>
  <div class="chat-item" :class="[onright ? 'right-chat' : 'left-chat']">
    <div v-if="avatar" :style="{ 'background-image': `url(${avatar})` }" class="chat-avatar"></div>
    <div v-else class="chat-avatar chat-avatar-text">{{ name[0] }}</div>
    <div class="chat-content">
      <div class="chat-name">{{ name }}</div>
      <img :src="src" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatImg',
  props: {
    name: { type: String, required: true },
    avatar: String,
    src: { type: String, required: true },
    onright: Boolean,
  },
})
</script>

<style scoped lang="scss">
.chat-content:deep() > img {
  width: 30vw;
  min-width: 250px;
  max-height: 400px;
  border-radius: 15px;
}
</style>
