<template>
  <div class="qq-chat">
    <div class="qq-header">
      <img :src="require('@/assets/svgs/back.svg')" class="header-bth" @click="exitWindowFullScreen" />
      <span class="chat-title">
        <img :src="require('@/assets/svgs/ear.svg')" class="header-bth" />
        {{ title }}{{ count ? '(' + count + ')' : '' }}
      </span>
      <img :src="require('@/assets/svgs/menu.svg')" class="header-bth" @click="setWindowFullScreen" />
    </div>
    <div class="chat-area">
      <slot></slot>
    </div>
    <div class="qq-footer">
      <form class="qq-input-box">
        <textarea class="qq-textarea" contenteditable="true"></textarea>
        <button class="qq-send-btn" type="reset">发送</button>
      </form>
      <div class="func-bth">
        <img :src="require('@/assets/svgs/voice.svg')" />
        <img :src="require('@/assets/svgs/pic.svg')" />
        <img :src="require('@/assets/svgs/camera.svg')" />
        <img :src="require('@/assets/svgs/redpack.svg')" />
        <img :src="require('@/assets/svgs/emoji.svg')" />
        <img :src="require('@/assets/svgs/more.svg')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatWindow',
  props: {
    title: { type: String, required: true },
    count: { type: [String, Number], default: '' },
  },
  methods: {
    //启动全屏
    setWindowFullScreen() {
      document.documentElement.requestFullscreen()
      screen.orientation.lock('portrait')
    },
    //退出全屏
    exitWindowFullScreen() {
      document.exitFullscreen()
    },
  },
})
</script>

<style lang="scss">
.chat-item {
  margin-top: 15px;
  margin-bottom: 15px;
}

.left-chat {
  display: flex;
  align-items: flex-start;
}

.right-chat {
  display: flex;
  align-items: flex-start;
  flex-direction: row-reverse;
}

.chat-content {
  display: flex;
  flex-direction: column;
  max-width: 65%;
}

.chat-name {
  margin-bottom: 5px;
  font-size: 12px;
  color: #8b8b8b;
}

.right-chat .chat-name {
  text-align: right;
}

.chat-avatar {
  display: inline-block;
  width: 42px;
  height: 42px;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 50%;
  background-color: #fff;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.chat-avatar-text {
  text-align: center;
  line-height: 42px;
  font-size: 24px;
  font-weight: bold;
  background: #fff;
}

.bubble-arrow {
  position: absolute;
  top: 11px;
  border-top: 10px solid white;
  z-index: 100;
}

.left-chat .bubble-arrow {
  left: -8px;
  border-left: 10px solid transparent;
}

.right-chat .bubble-arrow {
  right: -8px;
  border-right: 10px solid transparent;
}

.bubble {
  position: relative;
  padding: 12px;
  min-height: 1em;
  min-width: 1em;
  border-radius: 15px;
  overflow-wrap: break-word;
  background-color: white;
}

.bubble > img {
  display: block;
  width: 30vw;
  min-width: 200px;
  max-width: 300px;
  max-height: 350px;
  margin: 5px 0;
  border-radius: 10px;
}
</style>

<style scoped lang="scss">
.qq-chat {
  display: flex;
  min-width: 400px;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  background-color: #e9ecf4;
}

.qq-header {
  display: flex;
  padding: 12px 0;
  color: white;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(to right, #00dafe, #00ceff 12%, #01c5ff 25%, #01b9ff 50%, #01a7ff 85%);
}

.header-bth {
  height: 15px;
  margin-left: 20px;
  margin-right: 20px;
}

.chat-title .header-bth {
  height: 13px;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 3px;
  vertical-align: middle;
  opacity: 0.7;
}

.chat-area {
  width: 100%;
  overflow: overlay;
}

.qq-input-box {
  display: flex;
  margin-top: 10px;
}

.qq-textarea {
  width: 100%;
  height: 19px;
  min-height: 19px;
  max-height: 130px;
  padding: 0 8px;
  margin-left: 20px;
  font-size: 15px;
  font-family: sans-serif;
  border-radius: 15px;
  border: 5px solid white;
  background-color: white;
  outline: none;
  resize: none;
  overflow: overlay;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.qq-textarea::-webkit-scrollbar {
  display: none;
}

.qq-send-btn {
  width: 70px;
  height: 29px;
  margin-left: 5px;
  margin-right: 20px;
  color: white;
  font-size: 15px;
  line-height: 29px;
  border: none;
  border-radius: 15px;
  background-color: #b1effe;
}

.qq-send-btn:hover {
  background-color: #01cafc;
}

.func-bth {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: space-around;
}

.func-bth img,
.func-bth svg {
  height: 20px;
}
</style>
