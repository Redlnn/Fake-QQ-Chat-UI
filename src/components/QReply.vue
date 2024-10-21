<script setup lang="ts">
import QMessageItem from './subComponents/QMessageItem.vue'
import QReplyMessageElement from './subComponents/QReplyMessageElement.vue'
import type qTagColor from '@/lib/q-tag-colors'

withDefaults(
  defineProps<{
    self?: boolean
    userName: string
    avatarUrl?: string
    tagContent?: string
    tagColor?: qTagColor | keyof typeof qTagColor
    replyTargetName: string
    replyTargetContent: string
  }>(),
  {
    self: false,
    avatarUrl: '',
    tagContent: undefined,
    tagColor: undefined
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
    <div
      class="msg-content-container reply-message__container"
      :class="self ? 'container--self' : 'container--others'"
    >
      <div class="message-content reply-message__inner">
        <q-reply-message-element
          :self="self"
          :reply-target-name="replyTargetName"
          :reply-target-content="replyTargetContent"
        />
        <span><slot></slot></span>
      </div>
    </div>
  </q-message-item>
</template>

<style lang="scss" scoped>
.reply-message__container {
  padding: 10px;

  .reply-message__inner {
    font-size: 13px;
    line-height: 21px;
    min-height: 20px;
    overflow: hidden;
  }
}
</style>
