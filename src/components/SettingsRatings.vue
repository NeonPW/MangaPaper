<script setup lang="ts">
  import { ref } from 'vue';
  import { STORAGE } from '../util/constants';
  import { getStorageArray, setStorageArray } from '../util/helpers';
  import SettingsPanel from './SettingsPanel.vue';

  const emits = defineEmits(['close'])


  const curRatings = getStorageArray(STORAGE.CONTENT_RATING);

  const initialRatings = {
    safe: curRatings.length === 0 ? true : curRatings.includes('safe'),
    suggestive: curRatings.includes('suggestive'),
    erotica: curRatings.includes('erotica'),
  }

  const form = ref({...initialRatings})

  const closePanel = () => {
    form.value = {...initialRatings};
    emits('close');
  }
  
  const saveRatings = () => {
    let ratings = [];
    for (const [key, val] of Object.entries(form.value)){
      if (val) ratings.push(key);
    }
    setStorageArray(STORAGE.CONTENT_RATING, ratings);
    emits('close');
  }

</script>

<template>
  <SettingsPanel title="Filter Manga By Ratings" subtitle="Choose wisely." v-bind="$attrs">
    <template #content>
      <div style="display:flex;" id="ratings">
        <div :class="['settings__toggler',form.safe ? 'green' : 'red']"
          @click="form.safe = !form.safe"
        >
          Safe
        </div>

        <div
          :class="['settings__toggler',form.suggestive ? 'green' : 'red']"
          @click="form.suggestive = !form.suggestive"
        >
          Suggestive
        </div>

        <div
          :class="['settings__toggler','smut',form.erotica ? 'green' : 'red']"
          @click="form.erotica = !form.erotica"
        >
          Smut
        </div>
      </div>
    </template>

    <template #actions>
      <div class="button" @click="closePanel">Cancel</div>
      <div class="button primary" @click="saveRatings">Save Ratings</div>
    </template>
    
  </SettingsPanel>
  
</template>
