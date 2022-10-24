<script setup lang="ts">
  import { ref } from 'vue';
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import MangaScroller from './components/MangaScroller.vue';
  import SettingsTags from './components/SettingsTags.vue';
  import SettingsRatings from './components/SettingsRatings.vue';
  import SettingsIntro from './components/SettingsIntro.vue';
  import SettingsFloater from './components/SettingsFloater.vue';
  import { STORAGE } from './util/constants';


  const firstRun = ref(localStorage.getItem(STORAGE.FIRST_RUN) !== "1");

  const showIntro = ref(firstRun.value);
  const showTags = ref(false);
  const showRatings = ref(false);
  
  const pauseIt = ref(false);
  
  const closeTags = () => {
    showTags.value = false;
    if (firstRun.value){
      showIntro.value = true;
    }
  }

  const closeRatings = () => {
    showRatings.value = false;
    if (firstRun.value){
      showIntro.value = true;
    }
  }

  const closeIntro = () => {
    firstRun.value = false;
    showIntro.value = false;
    localStorage.setItem(STORAGE.FIRST_RUN, '1');
  }

  const openTags = () => {
    showIntro.value = false;
    showTags.value = true;
  }

  const openRatings = () => {
    showIntro.value = false;
    showRatings.value = true;
  }

</script>

<template>
  <SettingsFloater :paused="pauseIt" @open-ratings="openRatings" @open-tags="openTags" @pause-toggle="pauseIt = !pauseIt" />

  <MangaScroller :spawn-rate="2000" :pause="firstRun || pauseIt"/>
  
  <SettingsIntro @close="closeIntro" :show="showIntro" @open-ratings="openRatings" @open-tags="openTags"/>
  <SettingsTags @close="closeTags" :show="showTags" />
  <SettingsRatings @close="closeRatings" :show="showRatings" />
  
</template>

<style scoped>
  .settingsToggle{
    z-index: 9999;
    position:absolute;
    top:20px;
    left:0;
  }
</style>

