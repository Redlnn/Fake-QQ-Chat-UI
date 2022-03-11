<template>
  <div class="home" style="text-align: center">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Vue.js" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
})
</script>
