<script setup lang="ts">
import { onBeforeUnmount, onBeforeUpdate, onMounted, ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'

import QMessageItem from './subComponents/QMessageItem.vue'
import type qTagColor from '@/lib/q-tag-colors'

const props = withDefaults(
  defineProps<{
    self?: boolean
    userName: string
    avatarUrl?: string
    tagContent?: string
    tagColor?: qTagColor | keyof typeof qTagColor
    audioSrc: string
    text?: string
  }>(),
  {
    self: false,
    avatarUrl: '',
    tagContent: undefined,
    tagColor: undefined,
    text: '[呃，什么都没有听到]'
  }
)

const progressItemsRefs = ref<HTMLDivElement>()
const processLinePos = ref(0)
const showText = ref(false)
const duration = ref(0)
const formatedDuration = ref('')
const processHeightRefs = ref<number[]>([])
const audioBuffer = ref<AudioBuffer>()
const playEnded = ref(true)
const playPaused = ref(true)
let audioCtx: AudioContext | undefined
let controller: processController | undefined

// TODO: 进度条动画
function getLineCount(num: number) {
  num = num / 1.2
  if (num < 4) return 4
  if (num > 30) return 30
  return num
}

function convertDbToPercentage(db: number) {
  const min = -80
  const max = 0

  if (db >= max) return 1 // 0 dB 为 100%
  if (db <= min) return 0.2 // -90 dB 为 5%

  // 线性插值计算
  return ((db - min) / (max - min)) * (1 - 0.2) + 0.2
}

function formatDuration(duration: number) {
  const m = Math.floor(duration / 60)
  const s = Math.round(duration % 60)
  return m > 0 ? `${m}'${s}"` : `${s}"`
}

async function loadAudio(audioSrc: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  audioCtx = new (window.AudioContext || window.webkitAudioContext)()

  try {
    const res = await fetch(audioSrc)
    const data = await res.arrayBuffer()
    audioBuffer.value = await audioCtx.decodeAudioData(data)
    duration.value = audioBuffer.value.duration

    const channelData = audioBuffer.value.getChannelData(0)
    const numSamples = getLineCount(audioBuffer.value.duration)
    const segmentLength = Math.floor(channelData.length / numSamples)

    const loudnessArray = Array.from({ length: numSamples }, (_, i) => {
      const segment = channelData.slice(i * segmentLength, (i + 1) * segmentLength)
      const rms = Math.sqrt(segment.reduce((sum, value) => sum + value ** 2, 0) / segment.length)
      const safeRms = Math.max(rms, 1e-10)
      return 20 * Math.log10(safeRms)
    })

    formatedDuration.value = formatDuration(audioBuffer.value.duration)
    processHeightRefs.value = loudnessArray.map(convertDbToPercentage)
  } catch (error) {
    console.error('Error loading audio file:', error)
    formatedDuration.value = 'Error'
    processHeightRefs.value = Array(10).fill(0.05)
  }
}

function play() {
  if (
    audioCtx === undefined ||
    audioBuffer.value === undefined ||
    progressItemsRefs.value === undefined
  )
    return

  if (playEnded.value) {
    const source = audioCtx.createBufferSource()
    source.buffer = audioBuffer.value
    source.connect(audioCtx.destination)
    source.onended = () => {
      playEnded.value = true
      playPaused.value = true
    }
    source.start()
    playEnded.value = false
    playPaused.value = false

    progressItemsRefs.value.style.setProperty('--process-item-color', 'var(--text-secondary-01)')
    controller = new processController(
      [...progressItemsRefs.value.children] as HTMLDivElement[],
      audioBuffer.value.duration
    )
    controller.start()
  } else {
    if (audioCtx.state === 'running') {
      audioCtx.suspend()
      controller?.pause()
      playPaused.value = true
    } else if (audioCtx.state === 'suspended') {
      audioCtx.resume()
      controller?.resume()
      playPaused.value = false
    }
  }
}

class processController {
  private progressItems: HTMLDivElement[]
  private duration: number
  private pauseFn: (() => void) | undefined = undefined
  private resumeFn: (() => void) | undefined = undefined

  constructor(progressItems: HTMLDivElement[], duration: number) {
    this.progressItems = progressItems
    this.duration = duration
  }

  start() {
    let i = 0
    const { pause: pauseBar, resume: resumeBar } = useIntervalFn(
      () => {
        if (playEnded.value) {
          pauseBar()
          i = 0
          this.progressItems.forEach(item => item.style.removeProperty('--process-item-color'))
          progressItemsRefs.value?.style.setProperty('--process-item-color', 'var(--text_primary)')
        }
        this.progressItems[i].style.setProperty('--process-item-color', 'var(--text_primary)')
        i++
      },
      (Math.floor(this.duration) / this.progressItems.length) * 1000,
      { immediate: true }
    )

    const { pause: pauseLine, resume: resumeLine } = useIntervalFn(
      () => {
        if (playEnded.value) {
          pauseLine()
          processLinePos.value = 0
        }
        processLinePos.value++
      },
      (Math.floor(this.duration) / 100) * 1000,
      { immediate: true }
    )

    this.pauseFn = () => {
      pauseBar()
      pauseLine()
    }
    this.resumeFn = () => {
      resumeBar()
      resumeLine()
    }
  }

  pause() {
    if (this.pauseFn) {
      this.pauseFn()
    }
  }

  resume() {
    if (this.resumeFn) {
      this.resumeFn()
    }
  }
}

onMounted(async () => {
  await loadAudio(props.audioSrc)
})

onBeforeUpdate(() => {
  if (audioCtx === undefined) return
  audioCtx.close()
})

onBeforeUnmount(() => {
  if (audioCtx === undefined) return
  audioCtx.close()
})
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
        <div class="ptt-element" @click="play">
          <div class="ptt-element__top-area">
            <div class="ptt-element__button">
              <i class="q-svg-icon q-icon" style="width: 10px; height: 10px; --340fd034: inherit">
                <svg
                  v-if="playPaused"
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
                <svg
                  v-else
                  id="pause_24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17 4C17.5523 4 18 4.44771 18 5L18 19C18 19.5523 17.5523 20 17 20L15 20C14.4477 20 14 19.5523 14 19L14 5C14 4.44771 14.4477 4 15 4L17 4Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9 4C9.55229 4 10 4.44771 10 5L10 19C10 19.5523 9.55228 20 9 20L7 20C6.44772 20 6 19.5523 6 19L6 5C6 4.44771 6.44772 4 7 4L9 4Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </i>
            </div>
            <div
              ref="progressItemsRefs"
              class="ptt-element__progress"
              style="--process-item-color: var(--text_primary)"
            >
              <div
                v-if="!playEnded"
                class="ptt-element__progress-tag"
                :style="{ left: `calc(${processLinePos}% - 1px)` }"
              ></div>
              <div
                v-for="(height, index) in processHeightRefs"
                :key="index"
                class="ptt-element__progress-item"
                :style="{ height: `${height * 100}%` }"
              ></div>
            </div>
            <div class="ptt-element__duration">
              <span>{{ formatedDuration }}</span>
            </div>
          </div>
        </div>
        <div v-show="showText" class="ptt-element__bottom-area">
          <div class="ptt-element__bottom-area-text">
            {{ text }}
            <div class="ptt-element__bottom-area-icon" @click="showText = false">
              <i class="q-svg-icon q-icon" style="width: 1em; height: 1em">
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
.ptt-message {
  display: flex;
  align-items: center;
}

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
    background-color: var(--process-item-color);
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
