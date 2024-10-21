<script setup lang="ts">
import { onMounted, ref } from 'vue'
import QMessageItem from './subComponents/QMessageItem.vue'
import type qTagColor from '@/lib/q-tag-colors'
import { useEventListener, useIntervalFn } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    self?: boolean
    userName: string
    avatarUrl?: string
    tagContent?: string
    tagColor?: qTagColor | keyof typeof qTagColor
    audioSrc: string
  }>(),
  {
    self: false,
    avatarUrl: '',
    tagContent: undefined,
    tagColor: undefined
  }
)

const showText = ref(false)
const playFlag = ref(false)
const duration = ref(10)
const formatedDuration = ref('')
const audioRef = ref<HTMLAudioElement>()

// TODO: 读取音频时长
// TODO: 显示条形进度条

function convertDbToPercentage(db: number) {
  const min = -90
  const max = -10

  if (db >= max) return 1 // 0 dB 为 100%
  if (db <= min) return 0.05 // -90 dB 为 5%

  // 线性插值计算
  return ((db - min) / (max - min)) * (1 - 0.05) + 0.05
}

async function loadAudio(audioSrc: string, numSamples: number) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

  try {
    const res = await fetch(audioSrc)
    const data = await res.arrayBuffer()
    const audioBuffer = await audioCtx.decodeAudioData(data)

    const channelData = audioBuffer.getChannelData(0)
    const segmentLength = Math.floor(channelData.length / numSamples)

    const loudnessArray = Array.from({ length: numSamples }, (_, i) => {
      const segment = channelData.slice(i * segmentLength, (i + 1) * segmentLength)
      const rms = Math.sqrt(segment.reduce((sum, value) => sum + value ** 2, 0) / segment.length)
      return 20 * Math.log10(rms)
    })

    return loudnessArray.map(convertDbToPercentage)
  } catch (error) {
    console.error('Error loading audio file:', error)
    return Array(10).fill(0.05)
  }
}

onMounted(() => {
  console.log(loadAudio(props.audioSrc, 10))
})

// function reset() {
//   playFlag.value = false
// }
// function onLoadedmetadata() {
//   if (!audioRef.value) return
//   duration.value = Math.round(audioRef.value.duration)
//   const m = Math.floor(audioRef.value.duration / 60)
//   const s = Math.round(audioRef.value.duration % 60)
//   formatedDuration.value = m > 0 ? `${m}'${s}"` : `${s}"`
// }
// async function playVoice() {
//   if (!audioRef.value) return
//   if (playFlag.value) {
//     audioRef.value.pause()
//     audioRef.value.currentTime = 0
//     lineRefs.forEach((line: { style: { backgroundColor: string } }) => {
//       line.style.backgroundColor = 'var(--vp-c-text-1)'
//     })
//     playFlag.value = false
//   } else {
//     audioRef.value.play()
//     playFlag.value = true
//     lineRefs.forEach((line: { style: { backgroundColor: string } }) => {
//       line.style.backgroundColor = '#999999'
//     })
//     for (let index = 0; index < lineRefs.length; index++) {
//       if (audio.value.paused) return
//       await sleep((duration.value * 1000) / lineRefs.length).then(() => {
//         lineRefs[index].style.backgroundColor = 'var(--vp-c-text-1)'
//       })
//     }
//   }
// }
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
      class="msg-content-container mix-message__container ptt-message nocopy"
      :class="self ? 'container--self' : 'container--others'"
      @contextmenu.prevent.stop="showText = !showText"
    >
      <div class="ptt-message__inner">
        <div class="ptt-element">
          <div class="ptt-element__top-area">
            <div class="ptt-element__button">
              <i class="q-svg-icon q-icon" style="width: 10px; height: 10px; --340fd034: inherit">
                <svg
                  id="play_fill_24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 20.2428V3.75722C6 2.56846 7.31683 1.85207 8.31488 2.49786L21.0537 10.7406C21.9672 11.3317 21.9672 12.6683 21.0537 13.2594L8.31488 21.5021C7.31683 22.1479 6 21.4315 6 20.2428Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </i>
            </div>
            <audio
              ref="audioRef"
              :src="audioSrc"
              @ended="reset"
              @loadedmetadata="onLoadedmetadata"
            ></audio>
            <div class="ptt-element__progress">
              <div class="ptt-element__progress-item" style="height: 93.4118%"></div>
              <div class="ptt-element__progress-item" style="height: 92.1569%"></div>
              <div class="ptt-element__progress-item" style="height: 94.0392%"></div>
              <div class="ptt-element__progress-item" style="height: 94.3529%"></div>
              <div class="ptt-element__progress-item" style="height: 94.6667%"></div>
              <div class="ptt-element__progress-item" style="height: 93.4118%"></div>
            </div>
            <div class="ptt-element__duration">
              <span>4″</span>
            </div>
          </div>
        </div>
        <div v-show="showText" class="ptt-element__bottom-area">
          <div class="ptt-element__bottom-area-text">
            [呃，什么都没有听到]
            <div class="ptt-element__bottom-area-icon" @click="showText = false">
              <i class="q-svg-icon q-icon" style="width: 1em; height: 1em; --340fd034: inherit">
                <svg
                  id="arrow_up_24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 16L12 7L21 16"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-message-item>
</template>

<style lang="scss" scoped>
.ptt-element__bottom-area {
  font-size: var(--font_size_3);
}

.ptt-element__bottom-area-icon {
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 12px;
  justify-content: center;
}

.ptt-element__bottom-area:before {
  background: var(--border_standard);
  content: '';
  display: block;
  height: 1px;
  margin: 11px 0 8px;
  width: 100%;
}

.ptt-element {
  cursor: pointer;
  height: 18px;
  padding-left: 26px;

  .ptt-message__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  .ptt-element__top-area {
    display: flex;
    position: relative;
  }

  .ptt-element__button {
    border-radius: 8px;
    height: 16px;
    left: -26px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;

    .q-icon {
      left: 3px;
      position: absolute;
      top: 3px;

      svg {
        height: 100%;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
      }
    }
  }

  .ptt-element__progress {
    align-items: center;
    display: flex;
    height: 18px;
    line-height: 18px;
    position: relative;

    &.cursorMoveing {
      cursor: ew-resize;
    }

    .ptt-element__progress-item {
      border-radius: 1px;
      display: inline-block;
      margin-right: 2px;
      pointer-events: none;
      width: 2px;
    }

    .ptt-element__progress-item:last-child {
      margin-right: 0;
    }

    .ptt-element__progress-item.notplayed {
      opacity: 0.5;
    }

    .ptt-element__progress-tag {
      background: linear-gradient(
        180deg,
        hsla(0, 0%, 100%, 0) 0,
        var(--on_brand_primary) 54.06%,
        hsla(0, 0%, 100%, 0) 100%
      );
      height: 38px;
      pointer-events: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
    }
  }

  .ptt-element__duration {
    color: var(--text-white);
    display: flex;
    justify-items: center;
    line-height: 18px;
    margin-left: 8px;
  }

  .ptt-element__duration span {
    font-size: var(--font_size_1);
  }
}
.container--self {
  .ptt-element__button {
    background-color: var(--on_brand_primary);
  }
  .ptt-element__button .q-icon {
    color: var(--bubble_host);
  }
  .ptt-element__progress-item {
    background-color: var(--on_brand_primary);
  }
  .ptt-element__duration {
    color: var(--on_brand_primary);
  }
}

.container--others {
  .ptt-element__button {
    background-color: var(--icon_primary);
  }
  .ptt-element__button .q-icon {
    color: var(--bubble_guest);
  }
  .ptt-element__progress-item {
    background-color: var(--text_primary);
  }
  .ptt-element__duration {
    color: var(--text_primary);
  }
  .ptt-element__progress-tag {
    background: linear-gradient(
      180deg,
      rgba(51, 51, 51, 0) 0,
      var(--text_primary) 54.06%,
      rgba(51, 51, 51, 0) 100%
    ) !important;
  }
}
</style>
