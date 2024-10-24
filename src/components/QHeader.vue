<template>
  <header class="qq-header">
    <div class="qq-header__btn-bar">
      <span class="qq-header__btn red"></span>
      <span class="qq-header__btn yellow"></span>
      <span class="qq-header__btn green"></span>
    </div>
    <div class="qq-header__title">
      <slot></slot>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.qq-header {
  --qq-header-height: 40px;
  height: var(--qq-header-height);

  .qq-header__title {
    text-align: center;
    font-weight: bold;
    line-height: var(--qq-header-height);
  }

  .qq-header__btn-bar {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--qq-header-height);
    position: absolute;

    .qq-header__btn {
      display: block;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      margin-left: 10px;

      &:first-child {
        margin-left: 25px;
      }

      &.red {
        background-color: #ff5f56;
      }

      &.yellow {
        background-color: #ffbd2e;
      }

      &.green {
        background-color: #4cae4c;
      }
    }
  }
}
</style>
