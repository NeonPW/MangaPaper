<script setup lang="ts">
import { ref } from 'vue';
import { STORAGE } from '../util/constants';
import { getStorageArray, setStorageArray } from '../util/helpers';


  const curRatings = getStorageArray(STORAGE.CONTENT_RATING);

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
  <div style="display:flex;">
    <div
      class="settings__toggler"
      :class="form.safe ? 'green' : 'red' "
      @click="form.safe = !form.safe"
    >
      Safe
    </div>

    <div
      class="settings__toggler"
      :class="form.suggestive ? 'green' : 'red' "
      @click="form.suggestive = !form.suggestive"
    >
      Suggestive
    </div>

    <div
      class="settings__toggler"
      :class="form.erotica ? 'green' : 'red' "
      @click="form.erotica = !form.erotica"
    >
      Smut
    </div>

    <button @click="saveRatings">Save Ratings</button>
  </div>

  
</template>

<style scoped>

</style>