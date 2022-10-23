<script setup lang="ts">
  import { ref, computed } from 'vue';
import {TagSelection} from './SettingsTags.vue';

  const props = defineProps<{
    name: string;
    id: string;
    value: string;
  }>()

  const emits = defineEmits(['changeValue'])

  const toggleValue = () => {
    emits('changeValue', props.id, props.value);
  }

  const icon = computed(() => {
    return props.value === 'none' ? 'check_box_outline_blank' : props.value === 'included' ? 'check_box' : 'indeterminate_check_box';
  })

  const color = computed(() => {
    return props.value === 'none' ? '' : props.value === 'included' ? 'green' : 'red';
  })

</script>

<template>
  <div class="settings__toggler"  @click="toggleValue" :class="[color]">
      <span>{{name}}</span>
  </div>
</template>

<style scoped>
  

  .material-icons{
    margin-left:10px;
  }

</style>