<script setup lang="ts">
import './assets/reset.css'
import './assets/index.scss'

import QHeader from './components/QHeader.vue'
import QMain from './components/QMain.vue'
import QReply from './components/QReply.vue'
import QText from './components/QText.vue'
import QImage from './components/QImage.vue'
import QFile from './components/QFile.vue'
import QTip from './components/QTip.vue'
import QVoice from './components/QVoice.vue'
</script>

<template>
  <section class="qq">
    <q-header>FakeQQ</q-header>
    <q-main>
      <q-tip is-time>20:12</q-tip>
      <q-reply
        self
        user-name="[AntiFurry] 么叽"
        avatar-url="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        reply-target-name="方糖"
        reply-target-content="怎么这个支持笔但不支持触屏"
      >
        @方糖 yes
      </q-reply>
      <q-reply
        user-name="[AntiFurry] 么叽"
        avatar-url="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag-content="LV96 ln"
        tag-color="sage_green"
        reply-target-name="方糖"
        reply-target-content="怎么这个支持笔但不支持触屏"
      >
        <a at>@方糖</a> yes
      </q-reply>
      <q-text
        user-name="[AntiFurry] 么叽"
        avatar-url="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag-content="LV96 ln"
        tag-color="red"
      >
        123<br />asddasd
      </q-text>
      <q-tip>你撤回了一条消息</q-tip>
      <q-image
        user-name="[AntiFurry] 么叽"
        avatar-url="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag-content="LV96 ln"
        tag-color="orange"
        image-url="/85467403_p0.jpg"
      >
      </q-image>
      <q-tip><a>A60</a>撤回了一条消息</q-tip>
      <q-text
        user-name="[AntiFurry] 么叽"
        avatar-url="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag-content="LV96 ln"
        tag-color="purple"
      >
        <a at>@A60</a> 123
        <img src="/85467403_p0.jpg" />
        546<br />
        <a>我是一个链接</a>
      </q-text>
      <q-image
        user-name="[AntiFurry] 么叽"
        avatar-url="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag-content="LV96 ln"
        tag-color="blue"
        image-url="/85467403_p0.jpg"
        is-file
        file-name="85467403_p0.jpg"
        file-size="1.2MB"
        max-width="150px"
      >
      </q-image>
      <q-file
        user-name="[AntiFurry] 么叽"
        avatar-url="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag-content="LV96 ln"
        file-name="example.json"
        file-size="1.2MB"
        file-icon-url="/code.png"
        file-url="/code.png"
      ></q-file>
      <q-voice
        user-name="[AntiFurry] 么叽"
        avatar-url="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag-content="LV96 ln"
        tag-color="purple"
        audio-src="/太好听了8.m4a"
        text="太好听了8（震声）！！！"
      ></q-voice>
      <q-voice
        user-name="[AntiFurry] 么叽"
        avatar-url="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag-content="LV96 ln"
        tag-color="purple"
        audio-src="/欧尼酱快起床.m4a"
      ></q-voice>
    </q-main>
  </section>
</template>

<style lang="scss" scoped>
.qq {
  width: 100%;
  background-color: var(--background-03);
  border-radius: 10px;
}
</style>
