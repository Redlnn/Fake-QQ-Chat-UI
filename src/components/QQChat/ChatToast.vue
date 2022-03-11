<template>
  <div class="chat-item chat-toast">{{ toast }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatToast',
  props: {
    toast: { type: String, required: true },
  },
})
</script>

<style scoped lang="scss">
.chat-toast {
  color: #8b8b8b;
  font-size: 12px;
  text-align: center;
}
</style>
