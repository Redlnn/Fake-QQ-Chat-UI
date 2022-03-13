<script setup lang="ts">
import ChatWindow from '@/components/QQChat/ChatWindow.vue'
import ChatToast from '@/components/QQChat/ChatToast.vue'
import ChatMsg from '@/components/QQChat/ChatMsg.vue'
import ChatImg from '@/components/QQChat/ChatImg.vue'
import ChatQuote from '@/components/QQChat/ChatQuote.vue'
import ChatVoice from '@/components/QQChat/ChatVoice.vue'
import ForwardChat from '@/components/QQChat/ForwardChat.vue'
</script>

<template>
  <ChatWindow :title="title" :count="count">
    <ChatToast>上午10:00</ChatToast>
    <ChatMsg name="易姐是只咕鸽" avatar="http://q.qlogo.cn/headimg_dl?dst_uin=1440239038&spec=640">
      连x86都不支持
      <img src="../assets/imgs/andy-holmes-rCbdp8VCYhQ-unsplash.jpg" />
    </ChatMsg>
    <ChatMsg name="群菜鸡" avatar="http://q.qlogo.cn/headimg_dl?dst_uin=1450069615&spec=640">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fermentum, velit ut dapibus aliquet, felis elit
      laoreet augue, sit amet tristique nulla turpis ut nunc. Phasellus mattis fermentum lectus ultricies efficitur.
      Nullam lacinia mi dui, quis pulvinar erat cursus quis. Nunc rutrum mauris sed faucibus maximus. Pellentesque
      congue lorem vel mattis semper.
    </ChatMsg>
    <ChatToast>群菜狗撤回了一条消息</ChatToast>
    <ChatMsg name="霖念" avatar="http://q.qlogo.cn/headimg_dl?dst_uin=2544704967&spec=640" on-right>淦我</ChatMsg>
    <ChatMsg name="易姐是只咕鸽" avatar="http://q.qlogo.cn/headimg_dl?dst_uin=1440239038&spec=640">
      <ChatQuote name="易姐是只咕鸽" time="下午9:54">连x86都不支持</ChatQuote>
      高中考试这么多年的大样本重复试验
    </ChatMsg>
    <ChatMsg name="霖念" avatar="http://q.qlogo.cn/headimg_dl?dst_uin=2544704967&spec=640" on-right>
      <ChatQuote name="易姐是只咕鸽">
        连x86都不支持
        <img src="../assets/imgs/andy-holmes-rCbdp8VCYhQ-unsplash.jpg" />
      </ChatQuote>
      高中考试这么多年的大样本重复试验
    </ChatMsg>
    <ChatImg
      name="群菜鸮"
      avatar="http://q.qlogo.cn/headimg_dl?dst_uin=2948531755&spec=640"
      :image="require('@/assets/imgs/andy-holmes-rCbdp8VCYhQ-unsplash.jpg')"
    />
    <ChatVoice
      name="群菜鸡"
      avatar="http://q.qlogo.cn/headimg_dl?dst_uin=1450069615&spec=640"
      :audio="require('@/assets/11_欧尼酱快起床.mp3')"
    />
    <ForwardChat
      name="群菜鸡"
      avatar="http://q.qlogo.cn/headimg_dl?dst_uin=1450069615&spec=640"
      title="群聊"
      :contents="[
        '群菜狗: [图片]喵喵喵喵喵？？？？？',
        '群菜喵: 高中考试这么多年的大样本重复试验，已经总结出了套路，能够保证区分度的同时，还能控制好试题难度。',
        '群菜鸡: 喵？',
      ]"
    />
  </ChatWindow>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {},
  data() {
    return {
      title: this.$route.query.title,
      count: this.$route.query.count,
    }
  },
})
</script>
