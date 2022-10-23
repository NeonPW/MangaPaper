<script setup lang="ts">

  const props = defineProps<{
    title?: string;
    subtitle?: string;
  }>()
</script>

<template>
  <div class="settings__background">
    <div class="settings__content">
      <div class="settings__title">{{title ?? ''}}</div>
      <div class="settings__subtitle">{{subtitle ?? ''}}</div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
  .settings__background{
    background-color:rgba(0,0,0,0.5);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:9998;
  }

  .settings__content{
    background-color:#fff;
    min-width:500px;
    min-height:250px;
    padding:15px;
    border-radius:20px;
    max-width:80vw;
  }

  .settings__title{
    font-size:2em;
    font-weight:bold;
  }
</style>