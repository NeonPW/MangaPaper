<script setup lang="ts">
  import { Ref, ref, watch } from 'vue'
  import { useTags } from '../composables/useTags';
  import { getStorageArray, setStorageArray } from '../util/helpers';
  import { STORAGE } from '../util/constants';
  import TagSwitch from './TagSwitch.vue';
  import SettingsPanel from './SettingsPanel.vue';


  export type TagSelection = {
    id: string;
    name: string;
    value: string;
  }

  const emits = defineEmits(['close']);

  const tagValues = ref([] as TagSelection[]);

  const { tags } = useTags();
  const includedTags = getStorageArray(STORAGE.INCLUDED_TAGS);
  const excludedTags = getStorageArray(STORAGE.EXCLUDED_TAGS);

  const toggleTag = (tagId: string, tagValue: string) => {
    tagValues.value = tagValues.value.map(tag => {
      if (tag.id !== tagId) return tag;
      return {
        id: tag.id, 
        name: tag.name,
        value: tagValue === 'none' ? 'included' : tagValue === 'excluded' ? 'none' : 'excluded',
      }
    })
  }

  const saveTags = () => {
    let included = [] as string[];
    let excluded = [] as string[];
    tagValues.value.forEach(tag => {
      if (tag.value === 'included') included.push(tag.id);
      if (tag.value === 'excluded') excluded.push(tag.id);
    })

    setStorageArray(STORAGE.INCLUDED_TAGS, included);
    setStorageArray(STORAGE.EXCLUDED_TAGS, excluded);
    emits('close');
  }

  watch (tags, () => {
    tagValues.value = tags.value.map((tag) => {
      return {
        name: tag.attributes.name.en ?? 'No tag name?',
        id: tag.id, 
        value: includedTags.includes(tag.id) ? 'included' : excludedTags.includes(tag.id) ? 'excluded' : 'none',
      }
    })
  })
</script>

<template>
  <SettingsPanel
    title="Set Tag Filters"
    subtitle="Limit by specific tags (green), or exclude them (red) by clicking. Leaving everything blank includes all tags"
    v-bind="$attrs"
  >
    <template #content>
      <div style="display:flex;flex-wrap:wrap;">
        <TagSwitch
          v-for="tag in tagValues"
          :key="tag.id"
          :id="tag.id"
          :name="tag.name"
          :value="tag.value"
          @change-value="toggleTag"
        />
      </div>
    </template>
    
    
    <template #actions>
      <div class="button" @click="$emit('close')">Cancel</div>
      <div class="button primary" @click="saveTags">Save Tags</div>
    </template>
  </SettingsPanel>
</template>

<style scoped>

</style>