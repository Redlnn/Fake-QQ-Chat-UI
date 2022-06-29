<script setup lang="ts">
import ChatFile from '@/components/QQChat/ChatFile.vue'
import ChatImg from '@/components/QQChat/ChatImg.vue'
import ChatMsg from '@/components/QQChat/ChatMsg.vue'
import ChatQuote from '@/components/QQChat/ChatQuote.vue'
import ChatToast from '@/components/QQChat/ChatToast.vue'
import ChatVoice from '@/components/QQChat/ChatVoice.vue'
import ChatWindow from '@/components/QQChat/ChatWindow.vue'
import ForwardChat from '@/components/QQChat/ForwardChat.vue'

const click = () => {
  window.open('https://www.bilibili.com/video/BV1GJ411x7h7', '_blank')
}
</script>

<template>
  <ChatWindow :title="title" :count="count">
    <ChatToast>2022/5/17 星期二 上午 10:58:39</ChatToast>
    <ForwardChat
      name="Evyde HF"
      avatar="http://q.qlogo.cn/headimg_dl?dst_uin=907247545&spec=100"
      title="转发"
      :contents="['LIAN-小明: [图片]', 'LIAN-小明: 隔壁群的机器人已经可以识别本子了', 'LIAN-小明: [图片]']"
      counts="10"
    />
    <ChatToast>2022/5/17 星期二 上午 11:28:06</ChatToast>
    <ChatMsg name="某痕" avatar="http://q.qlogo.cn/headimg_dl?dst_uin=1365197927&spec=100">
      <ChatQuote name="Evyde HF" time="2022/5/17 星期二 上午 10:58:39">[聊天记录]</ChatQuote>
      这个是<br />
      我的真寻<br />
      本来是用的sagiri
    </ChatMsg>
    <ChatImg
      name="某痕"
      avatar="http://q.qlogo.cn/headimg_dl?dst_uin=1365197927&spec=100"
      :src="require('@/assets/imgs/biaoqing1.jpg')"
      max-width="150px"
    />
    <ChatToast>某痕 撤回了一条消息</ChatToast>
    <ChatMsg name="某痕" avatar="http://q.qlogo.cn/headimg_dl?dst_uin=907247545&spec=100">
      <ChatQuote name="某痕" time="2022/5/17 星期二 上午 11:28:14">
        <img :src="require('@/assets/imgs/biaoqing1.jpg')" />
      </ChatQuote>
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
    </ChatMsg>
    <ChatMsg name="Test" onright>
      来一打本子
      <img
        :src="require('@/assets/imgs/biaoqing2.png')"
        style="height: 1.3em; width: 1.3em; vertical-align: text-bottom"
      />
    </ChatMsg>
    <ChatVoice
      name="Sagiri"
      avatar="http://q.qlogo.cn/headimg_dl?dst_uin=762802224&spec=100"
      :src="require('@/assets/11_欧尼酱快起床.mp3')"
    />
    <ChatFile
      name="Sagiri"
      avatar="http://q.qlogo.cn/headimg_dl?dst_uin=762802224&spec=100"
      filename="secret.zip"
      filesize="6.33MB"
      :fileicon="require('@/assets/logo.png')"
      :click="click"
    />
  </ChatWindow>
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
