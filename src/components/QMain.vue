<template>
  <main class="qq_container">
    <slot></slot>
  </main>
</template>

<style lang="scss" scoped>
.qq_container {
  padding: 8px 20px;

  &:deep() > *:first-child {
    padding-top: 0;
    margin-top: 0;
  }
}
</style>
