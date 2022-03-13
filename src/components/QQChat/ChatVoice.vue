<template>
  <div class="chat-item" :class="[onRight ? 'right-chat' : 'left-chat']">
    <div :style="{ 'background-image': `url(${avatar})` }" class="chat-avatar"></div>
    <div class="chat-content">
      <div class="chat-name">{{ name }}</div>
      <div class="bubble" :onclick="playVoice" style="cursor: pointer">
        <div class="bubble-arrow"></div>
        <div class="chat-audio">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="26" />
            <path
              d="M35.5,25.324,20.512,14.575a1,1,0,0,0-1.589.815v21.5a1,1,0,0,0,1.589.816L35.5,26.955a1,1,0,0,0,.237-1.394A.988.988,0,0,0,35.5,25.324Z"
            />
          </svg>
          <audio ref="audio" :src="audio" @ended="reset" @loadedmetadata="onLoadedmetadata"></audio>
          <span class="voice-bar">
            <span v-for="item in getLineCount(duration)" :key="item" ref="voice-line" class="line"></span>
          </span>
          {{ formatedDuration }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ChatVoice',
  props: {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    audio: { type: String, required: true },
    onRight: Boolean,
  },
  data() {
    return {
      playFlag: false,
      duration: 10,
      formatedDuration: '',
    }
  },
  methods: {
    getLineCount: function (num: number) {
      var array = []
      num = num / 2
      if (num < 5) return [0, 1, 2, 3, 4]
      for (let i = 0; i <= num; i++) {
        if (i >= 25) {
          break
        }
        array.push(1)
      }
      return array
    },
    reset: function () {
      this.playFlag = false
    },
    onLoadedmetadata: function () {
      var audioElem = this.$refs.audio as HTMLAudioElement
      this.duration = Math.round(audioElem.duration)
      var m = Math.floor(audioElem.duration / 60)
      var s = Math.round(audioElem.duration % 60)
      this.formatedDuration = m > 0 ? `${m}'${s}"` : `${s}"`
    },
    sleep: (ms: number) => {
      return new Promise(func => setTimeout(func, ms))
    },
    async playVoice() {
      var audioElem = this.$refs.audio as HTMLAudioElement
      var lines = this.$refs['voice-line'] as NodeListOf<HTMLElement>
      if (this.playFlag) {
        audioElem.pause()
        audioElem.currentTime = 0
        lines.forEach(line => {
          line.style.backgroundColor = '#000'
        })
        this.playFlag = false
        return
      } else {
        audioElem.play()
        this.playFlag = true
        lines.forEach(line => {
          line.style.backgroundColor = '#dddddd'
        })
        for (let index = 0; index < lines.length; index++) {
          if (audioElem.paused) return
          await this.sleep((this.duration * 1000) / lines.length).then(() => {
            lines[index].style.backgroundColor = '#000'
          })
        }
      }
    },
  },
})
</script>

<style scoped lang="scss">
.chat-audio {
  display: flex;
  align-items: center;
}

.chat-audio svg {
  height: 1em;
  width: 1em;
}

.chat-audio svg circle {
  fill: #000;
}

.chat-audio svg path {
  fill: #fff;
}

.voice-bar {
  display: inline-flex;
  height: 1em;
  margin-left: 5px;
  margin-right: 5px;
  align-items: center;
}

.voice-bar .line {
  width: 3px;
  height: 100%;
  margin: 0 1px;
  border-radius: 2px;
  background-color: #000;
}

.voice-bar .line:nth-child(1n) {
  height: 73%;
}

.voice-bar .line:nth-child(2n) {
  height: 78%;
}

.voice-bar .line:nth-child(3n) {
  height: 84%;
}

.voice-bar .line:nth-child(4n) {
  height: 66%;
}

.voice-bar .line:nth-child(5n) {
  height: 58%;
}

.voice-bar .line:nth-child(6n) {
  height: 75%;
}

.voice-bar .line:nth-child(7n) {
  height: 95%;
}

.voice-bar .line:nth-child(8n) {
  height: 100%;
}
</style>
