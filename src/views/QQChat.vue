<script setup lang="ts">
import QQWindow from '@/components/QQChat/QQWindow.vue'
import ToastMessage from '@/components/QQChat/Message/ToastMessage.vue'
import NormalMessage from '@/components/QQChat/Message/NormalMessage.vue'
import ImageMessage from '@/components/QQChat/Message/ImageMessage.vue'
import QuoteMessage from '@/components/QQChat/Message/QuoteMessage.vue'
import ForwardMessage from '@/components/QQChat/Message/ForwardMessage.vue'
import VoiceMessage from '@/components/QQChat/Message/VoiceMessage.vue'
import FileMessage from '@/components/QQChat/Message/FileMessage.vue'

const click = () => {
  window.open('https://www.bilibili.com/video/BV1GJ411x7h7', '_blank')
}
</script>

<template>
  <QQWindow :title="title" :count="count">
    <ToastMessage>2022/5/17 星期二 上午 10:58:39</ToastMessage>
    <ForwardMessage
      name="Evyde HF"
      avatar="http://q.qlogo.cn/headimg_dl?dst_uin=907247545&spec=100"
      title="转发"
      :contents="['LIAN-小明: [图片]', 'LIAN-小明: 隔壁群的机器人已经可以识别本子了', 'LIAN-小明: [图片]']"
      counts="10"
    />
    <ToastMessage>2022/5/17 星期二 上午 11:28:06</ToastMessage>
    <NormalMessage name="某痕" avatar="http://q.qlogo.cn/headimg_dl?dst_uin=1365197927&spec=100">
      <QuoteMessage name="Evyde HF" time="2022/5/17 星期二 上午 10:58:39">[聊天记录]</QuoteMessage>
      这个是<br />
      我的真寻<br />
      本来是用的sagiri
    </NormalMessage>
    <ImageMessage
      name="某痕"
      avatar="http://q.qlogo.cn/headimg_dl?dst_uin=1365197927&spec=100"
      :src="require('@/assets/imgs/biaoqing1.jpg')"
      max-width="150px"
    />
    <ToastMessage>某痕 撤回了一条消息</ToastMessage>
    <NormalMessage name="某痕" avatar="http://q.qlogo.cn/headimg_dl?dst_uin=907247545&spec=100">
      <QuoteMessage name="某痕" time="2022/5/17 星期二 上午 11:28:14">
        <img :src="require('@/assets/imgs/biaoqing1.jpg')" />
      </QuoteMessage>
      对不起了sagiri，我真的很需要本子机器人
      <img
        :src="require('@/assets/imgs/biaoqing2.png')"
        style="height: 1.3em; width: 1.3em; vertical-align: text-bottom"
      />
      <img
        :src="require('@/assets/imgs/biaoqing2.png')"
        style="height: 1.3em; width: 1.3em; vertical-align: text-bottom"
      />
      <img
        :src="require('@/assets/imgs/biaoqing2.png')"
        style="height: 1.3em; width: 1.3em; vertical-align: text-bottom"
      />
    </NormalMessage>
    <NormalMessage name="Test" onright>
      来一打本子
      <img
        :src="require('@/assets/imgs/biaoqing2.png')"
        style="height: 1.3em; width: 1.3em; vertical-align: text-bottom"
      />
    </NormalMessage>
    <VoiceMessage
      name="Sagiri"
      avatar="http://q.qlogo.cn/headimg_dl?dst_uin=762802224&spec=100"
      :src="require('@/assets/11_欧尼酱快起床.mp3')"
    />
    <FileMessage
      name="Sagiri"
      avatar="http://q.qlogo.cn/headimg_dl?dst_uin=762802224&spec=100"
      filename="secret.zip"
      filesize="6.33MB"
      :fileicon="require('@/assets/logo.png')"
      :click="click"
    />
  </QQWindow>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {},
  data() {
    return {
      title: this.$route.query.title?.toString() || 'Unknown',
      count: this.$route.query.count?.toString(),
    }
  },
})
</script>
