<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    name: string;
    id: string;
    value: string;
  }>()

  const emits = defineEmits(['changeValue'])

  const toggleValue = () => {
    emits('changeValue', props.id, props.value);
  }

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