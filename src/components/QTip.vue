<script setup lang="ts">
withDefaults(
  defineProps<{
    isTime?: boolean
  }>(),
  { isTime: false }
)
</script>

<template>
  <div v-if="isTime" class="message__timestamp no-copy">
    <span class="babble">20:05</span>
  </div>
  <div v-else class="gray-tip-message no-copy">
    <div class="gray-tip-content babble"><slot></slot></div>
  </div>
</template>

<style lang="scss" scoped>
.babble {
  background-color: var(--nt_blur_bottom_superlight_2_30_2_alpha);
  border-radius: 12px;
  padding: 3px 8px;
}

.message__timestamp {
  color: var(--on_bg_text);
  font-size: var(--font_size_2) !important;
  line-height: var(--line_height_2) !important;
  margin: 16px 0 8px;
  text-align: center;
}

.gray-tip-message {
  color: var(--on_bg_text);
  display: flex;
  font-size: var(--font_size_2) !important;
  justify-content: center;
  line-height: var(--line_height_2) !important;
  padding: 8px 60px;
  text-align: center;
  transition-duration: 0.3s;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;

  .gray-tip-content {
    white-space: pre-wrap;
  }

  .gray-tip-content:deep() a {
    color: var(--text_link);
    text-decoration: none;
  }

  .gray-tip-content:deep() img {
    height: 16px;
    margin: 0 2px;
    min-width: 16px;
    -o-object-fit: cover;
    object-fit: cover;
    pointer-events: none;
    text-indent: 100%;
    vertical-align: middle;
  }
}
</style>
