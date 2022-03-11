<template>
  <div class="chat-item" :class="[onRight ? 'right-chat' : 'left-chat']">
    <div :style="{ 'background-image': `url(${avatar})` }" class="chat-avatar"></div>
    <div class="chat-content">
      <div class="chat-name">{{ name }}</div>
      <img :src="image" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatMsg',
  props: {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    image: { type: String, required: true },
    onRight: Boolean,
  },
})
</script>

<style scoped lang="scss">
.chat-content:deep() > img {
  width: 30vw;
  min-width: 250px;
  border-radius: 15px;
}
</style>
