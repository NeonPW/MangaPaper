<script setup lang="ts">
  import { ref } from 'vue';

  const emits = defineEmits(['openRatings','openTags','openIntro'])

  const showPanel = ref(false);

  const openTags = () => {
    showPanel.value = false;
    emits('openTags');
  }

  const openRatings = () => {
    showPanel.value = false;
    emits('openRatings');
  }

  
</script>

<template>
  <div class="topbar__container">
    <div class="topbar__item">
      <div :class="['topbar__item-panel', showPanel ? 'show' : '']">
        <div>
          <div class="secondary button" @click="openTags">
            Change Tags
          </div>
          <div class="secondary button" @click="openRatings">
            Change Ratings
          </div>
        </div>
      </div>
      <div class="topbar__item-label" @click="showPanel = !showPanel">
        <span>Settings</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .topbar__container{
    position:fixed;
    z-index:9999;
    top:0;
    left:0;
    right:0;
    display:flex;
    justify-content:center;
  }

  .topbar__item{
    position:relative;
    text-align:center;
  }

  .topbar__item-label{
    font-size:0.7rem;
    font-weight:600;
    cursor:default;
  }

  .topbar__item-label span{
    position:relative;
    z-index:-1;
    background-color:#fff;
    margin-top:0;
    padding:2px 15px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow:0px 0px 12px rgba(0,0,0,0.4);
    transition:box-shadow 0.3s;
  }

  .topbar__item-label:hover span{
    box-shadow:0px 0px 20px black;
  }

  .topbar__item-panel{
    background-color:#fff;
    max-height:0;
    transition:max-height 0.3s;
    overflow:hidden;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow:0px 0px 12px rgba(0,0,0,0.4);
  }

  .topbar__item-panel.show{
    max-height:200px;
  }

  .topbar__item-panel div{
    padding:20px;
  }
</style>