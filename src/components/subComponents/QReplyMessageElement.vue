<script setup lang="ts">
withDefaults(
  defineProps<{
    self?: boolean
    replyTargetName: string
    replyTargetContent: string
  }>(),
  { self: false }
)
</script>

<template>
  <div class="reply-element nocopy" :class="self ? ['reply-element--self'] : ''">
    <div class="reply-title">
      <div class="reply-info">
        <span class="text-ellipsis">{{ replyTargetName }}</span>
      </div>
    </div>
    <div class="reply-content">
      <span class="mixed-container text-ellipsis">{{ replyTargetContent }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reply-element {
  border-left: 2px solid var(--icon_tertiary);
  border-radius: 2px;
  color: var(--text_primary_light);
  margin-bottom: 10px;
  padding: 4px 10px;

  &:hover {
    background-color: var(--overlay_hover);
  }

  & .reply-title {
    align-items: center;
    display: flex;
    font-size: var(--font_size_main_1);
    justify-content: space-between;
    line-height: var(--line_height_main_1);
    margin-bottom: 4px;
    overflow: hidden;

    & .reply-info {
      display: flex;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  & .reply-content {
    font-size: var(--font_size_main_1);
    line-height: var(--line_height_main_1);
  }
  & .mixed-container {
    display: block;
    min-height: 24px;
  }
  // & .pic {
  //   border-radius: 4px;
  //   max-height: 80px;
  //   overflow: hidden;
  //   position: relative;
  // }
  // & .pic .pic__count {
  //   align-items: center;
  //   background: rgba(0, 0, 0, 0.5);
  //   border-radius: 2px;
  //   bottom: 2px;
  //   display: flex;
  //   font-size: var(--font_size_main_1);
  //   height: 16px;
  //   justify-content: center;
  //   line-height: var(--line_height_main_1);
  //   position: absolute;
  //   right: 2px;
  //   width: 20px;
  // }
  // & .qqface {
  //   height: 24px;
  //   vertical-align: bottom;
  //   width: 24px;
  // }
  // & .file {
  //   align-items: center;
  //   display: flex;
  //   overflow: hidden;
  // }
  // & .file .file-icon {
  //   background-position: 50%;
  //   background-repeat: no-repeat;
  //   background-size: contain;
  //   border-radius: 4px;
  //   display: block;
  //   flex-shrink: 0;
  //   height: 16px;
  //   margin-right: 5px;
  //   width: 16px;
  // }
}
.reply-element--self {
  border-left: 2px solid var(--overlay_hover_brand);
  color: var(--on_brand_primary);
}
</style>
