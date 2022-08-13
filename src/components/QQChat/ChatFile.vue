<template>
  <div class="chat-item" :class="[onright ? 'right-chat' : 'left-chat']">
    <div v-if="avatar" :style="{ 'background-image': `url(${avatar})` }" class="chat-avatar"></div>
    <div v-else class="chat-avatar"><span class="chat-avatar-text">{{ name[0] }}</span></div>
    <div class="chat-content" :onclick="click">
      <div class="chat-name">{{ name }}</div>
      <a ref="file" target="_blank" style="text-decoration: none; color: #000">
        <div class="bubble" style="cursor: pointer">
          <div class="bubble-arrow"></div>
          <div class="file-content">
            <div class="fileinfo">
              <div class="filename">{{ filename }}</div>
              <div class="filesize">{{ filesize }}</div>
            </div>
            <div class="fileicon">
              <img :src="fileicon" />
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatFile',
  props: {
    name: { type: String, required: true },
    avatar: String,
    filename: { type: String, required: true },
    filesize: { type: String, required: true },
    fileicon: { type: String, required: true },
    href: { type: String, default: '' },
    onright: Boolean,
    click: { type: Function, default: function () {} }, // eslint-disable-line
  },
  mounted() {
    if (this.href) {
      const file = this.$refs.file as HTMLAnchorElement
      file.href = this.href
    }
  },
})
</script>

<style scoped lang="scss">
.file-content {
  display: flex;
  justify-content: space-between;
  height: 60px;
  width: 180px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.fileinfo {
  width: 120px;
}

.filename {
  overflow: hidden;
  display: -webkit-box; // 虽然是 webkit 但火狐也可以用
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}

.filesize {
  margin-top: 3px;
  color: #8b8b8b;
  font-size: 13px;
}

.fileicon {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.fileicon img {
  max-height: 100%;
  border-radius: 3px;
}
</style>
