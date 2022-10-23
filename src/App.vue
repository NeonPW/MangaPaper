<script setup lang="ts">
  import { ref } from 'vue';
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import MangaScroller from './components/MangaScroller.vue';
  import SettingsTags from './components/SettingsTags.vue';
  import SettingsPanel from './components/SettingsPanel.vue';
  import SettingsRatings from './components/SettingsRatings.vue';

  const showTags = ref(false);
  const showRatings = ref(true);
</script>

<template>
  <MangaScroller :spawn-rate="10000" />
  
  <SettingsTags @close="showTags = false" :show="showTags" />
  <SettingsRatings @close="showRatings = false" :show="showRatings" />
  
</template>

<style scoped>
  .settingsToggle{
    z-index: 9999;
    position:absolute;
    top:20px;
    left:0;
  }
</style>

