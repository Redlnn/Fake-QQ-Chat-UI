<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <router-link to="/chat?title=Graia Framework Community&count=294">Chat</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: { type: String, default: 'Hello World' },
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #42b983;
}
</style>
