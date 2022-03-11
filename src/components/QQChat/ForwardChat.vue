<template>
  <div class="chat-item" :class="[onRight ? 'right-chat' : 'left-chat']">
    <div :style="{ 'background-image': `url(${avatar})` }" class="chat-avatar"></div>
    <div class="chat-content">
      <div class="chat-name">{{ name }}</div>
      <div class="bubble">
        <div class="bubble-arrow"></div>
        <div class="forward-title">{{ title }}的聊天记录</div>
        <div class="forward-content">
          <div v-for="content in contents" :key="content">{{ content }}</div>
        </div>
        <div class="forward-count">查看{{ contents.length }}条转发消息</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ForwardChat',
  props: {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    title: { type: String, required: true },
    contents: { type: Array, required: true },
    onRight: Boolean,
  },
})
</script>

<style scoped lang="scss">
.bubble {
  padding-bottom: 5px;
  word-wrap: break-word;
  border-bottom: 1.8em solid #f7f7f7;
}

.forward-title {
  margin-bottom: 5px;
}

.forward-content,
.forward-count {
  color: #8b8b8b;
  font-size: 0.8em;
  word-break: break-all;
}

.forward-count {
  position: absolute;
  bottom: -1.8em;
}
</style>
