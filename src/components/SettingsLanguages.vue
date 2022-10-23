<script setup lang="ts">
import { ref } from 'vue';
import { STORAGE, LANGUAGES, LANGUAGE_NAMES } from '../util/constants';
import { getStorageArray, setStorageArray } from '../util/helpers';
import SettingsPanel from './SettingsPanel.vue';


  const curRatings = getStorageArray(STORAGE.LANGUAGES);

  const form = ref({
    safe: curRatings.length === 0 ? true : curRatings.includes('safe'),
    suggestive: curRatings.includes('suggestive'),
    erotica: curRatings.includes('erotica'),
  })
  
  const saveRatings = () => {
    let ratings = [];
    for (const [key, val] of Object.entries(form.value)){
      if (val) ratings.push(key);
    }
    setStorageArray(STORAGE.CONTENT_RATING, ratings);
  }

</script>

<template>
  <SettingsPanel title="Pick Some Languages" subtitle="These will be the only langauges returned in the results." v-bind="$attrs">
    <template #content>

    </template>

    <template #actions>
      <div class="button normal" @click="$emit('close')">Cancel</div>
      <div class="button" @click="saveRatings">Save Languages</div>
    </template>
    
  </SettingsPanel>
  
</template>

<style scoped>

</style>