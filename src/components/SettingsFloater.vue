<script setup lang="ts">
import { ref } from 'vue';

  const showPanel = ref(false);

  defineEmits(['openRatings','openTags','openIntro'])
</script>

<template>
  <div class="topbar__container">
    <div class="topbar__item">
      <div :class="['topbar__item-panel', showPanel ? 'show' : '']">
        <div>
          <div class="secondary button" @click="$emit('openTags')">
            Change Tags
          </div>
          <div class="secondary button" @click="$emit('openRatings')">
            Change Ratings
          </div>
        </div>
      </div>
      <div class="topbar__item-label" @click="showPanel = !showPanel">
        <span>Filters</span>
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
    cursor:pointer;
  }

  .topbar__item-label span{
    background-color:#fff;
    margin-top:0;
    padding:2px 15px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .topbar__item-panel{
    background-color:#fff;
    max-height:0;
    transition:max-height 0.3s;
    overflow:hidden;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .topbar__item-panel.show{
    max-height:200px;
  }

  .topbar__item-panel div{
    padding:20px;
  }
</style>