<script setup lang="ts">
import QMessageItem from './subComponents/QMessageItem.vue'
import type qTagColor from '@/lib/q-tag-colors'

withDefaults(
  defineProps<{
    self?: boolean
    userName: string
    avatarUrl?: string
    tagContent?: string
    tagColor?: qTagColor | keyof typeof qTagColor
    fileName: string
    fileSize?: string
    fileUrl?: string
    fileIconUrl?: string
  }>(),
  {
    self: false,
    avatarUrl: '',
    tagContent: undefined,
    tagColor: undefined,
    fileSize: undefined,
    fileUrl: undefined,
    fileIconUrl: undefined
  }
)
</script>

<template>
  <q-message-item
    :self="self"
    :user-name="userName"
    :avatar-url="avatarUrl"
    :tag-content="tagContent"
    :tag-color="tagColor"
  >
    <div class="file-message--content nocopy">
      <a v-if="fileUrl" class="file-link" :href="fileUrl" :download="fileName"></a>
      <div class="normal-file file-element">
        <div class="file-header">
          <p class="file-name">
            <span class="text-ellipsis">{{ fileName }}</span>
          </p>
          <div
            v-if="fileIconUrl"
            class="file-icon"
            :style="{ backgroundImage: `url(${fileIconUrl})` }"
          ></div>
        </div>
        <div v-if="fileSize" class="file-info">
          <span>{{ fileSize }}</span>
        </div>
      </div>
    </div>
  </q-message-item>
</template>

<style lang="scss" scoped>
.file-message--content {
  overflow: hidden;
  position: relative;
}

.file-link {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  z-index: 1;
}

.normal-file {
  background-color: var(--fill_light_primary);
  border-radius: 8px;
  max-width: 100%;
  overflow: hidden;
  padding: 10px;
  position: relative;
  width: 226px;
  z-index: 0;

  .file-header {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  .file-header .file-name {
    align-self: flex-start;
    color: var(--bubble_guest_text);
    flex: 1;
    font-size: var(--font_size_main_2);
    line-height: 16px;
    line-height: var(--line_height_main_2);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .file-header .file-icon {
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 4px;
    flex-shrink: 0;
    height: 40px;
    margin-left: 12px;
    overflow: hidden;
    position: relative;
    width: 40px;
  }
  .file-info {
    color: var(--text-secondary-01);
    display: flex;
    font-size: var(--font_size_2) !important;
    justify-content: space-between;
    line-height: 16px;
    line-height: var(--line_height_2) !important;
    white-space: pre-wrap;
  }
}
</style>
