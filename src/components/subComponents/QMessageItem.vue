<script setup lang="ts">
import qTagColor from '@/lib/q-tag-colors'

withDefaults(
  defineProps<{
    self?: boolean
    userName: string
    avatarUrl?: string
    tagContent?: string
    tagColor?: qTagColor | keyof typeof qTagColor
  }>(),
  {
    self: false,
    avatarUrl: '',
    tagContent: undefined,
    tagColor: qTagColor.grey
  }
)
</script>

<template>
  <section
    class="message-container"
    :class="self ? ['message-container--self', 'message-container--align-right'] : ''"
  >
    <div class="qq-message__avatar-span">
      <div
        v-if="avatarUrl"
        :style="{ backgroundImage: `url(${avatarUrl})` }"
        class="qq-message__avatar"
      ></div>
    </div>
    <div class="qq-message__user-name nocopy text-ellipsis">
      <span class="text-ellipsis">{{ userName }}</span>
      <div v-if="tagContent" class="q-tag qq-message__user-label" :class="[`q-tag--${tagColor}`]">
        {{ tagContent }}
      </div>
    </div>
    <div class="message-content__wrapper">
      <slot></slot>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.message-container {
  display: grid;
  grid-auto-rows: min-content;
  grid-template-areas:
    'avatar . nickname'
    'avatar . content';
  grid-template-columns: var(--avatar_size_2) 8px auto;
  justify-content: start;
  padding-top: 15px;

  &.message-container--align-right {
    grid-template-areas:
      'nickname . avatar'
      'content . avatar';
    grid-template-columns: auto 8px var(--avatar_size_2);
    justify-content: end;
    justify-items: end;
  }

  .qq-message__avatar-span {
    align-self: start;
    display: inline-block;
    grid-area: avatar;
    min-width: var(--avatar_size_2);

    .qq-message__avatar {
      width: var(--avatar_size_2);
      height: var(--avatar_size_2);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 50%;
    }
  }

  .qq-message__user-name {
    align-items: center;
    color: var(--on_bg_text);
    display: flex;
    grid-area: nickname;
    min-height: 18px;
    position: relative;
    top: -2px;
    user-select: none;
    font-size: var(--font_size_2);
    line-height: var(--line_height_2);
    padding: 0 calc(var(--avatar_size_2) + 8px) 0 0;
  }

  &.message-container--align-right .qq-message__user-name {
    padding: 0 0 0 calc(var(--avatar_size_2) + 8px);
    flex-direction: row-reverse;

    .group-member-label {
      margin-right: 4px;
    }
  }

  .qq-message__user-label {
    margin-left: 4px;
    font-size: min(var(--font_size_1), 14px);
    line-height: min(var(--line_height_1), 20px);
  }

  &.message-container--align-right .qq-message__user-label {
    margin-right: 4px;
  }
}

.message-content__wrapper {
  color: var(--bubble_guest_text);
  display: flex;
  grid-area: content;
  max-width: -webkit-fill-available;
  min-height: 38px;
  overflow: hidden;

  &:deep() p {
    margin: 0;
  }

  &:deep() .mix-message__container {
    padding: 8px 10px;
  }

  &:deep() .msg-content-container {
    position: relative;
    border-radius: 8px;
    // box-sizing: content-box;
    // display: flex;
    // justify-content: center;
    min-width: 20px;
    overflow: hidden;
    word-break: break-word;

    &.container--others {
      background-color: var(--bubble_guest);
    }
    &.container--self {
      background: var(--host_bubble_bg_css_value);
      background-size: 100vw 100vh;
      color: var(--on_bubble_host_text);
    }

    &.container--others .message-content ::-moz-selection {
      background-color: rgba(0, 153, 255, 0.5);
    }
    &.container--others .message-content ::selection {
      background-color: rgba(0, 153, 255, 0.5);
    }

    &.container--self .message-content ::-moz-selection {
      background-color: hsla(0, 0%, 100%, 0.3);
    }
    &.container--self .message-content ::selection {
      background-color: hsla(0, 0%, 100%, 0.3);
    }
  }
}
</style>
