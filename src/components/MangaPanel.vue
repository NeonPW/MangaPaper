<script setup lang="ts">
  import { computed } from 'vue';
  import { Manga } from '../util/constants';
  import { MangaView } from '../util/constants';

  const props = defineProps<{
    manga: Manga;
  }>()

  const previewImage = computed(() => props.manga?.pages?.[props.manga.startPage ?? 0]);

  const emits = defineEmits(['imageLoaded', 'imageError', 'viewManga'])

  const popupViewer = () => {
    // Caught by MangaScroller
    emits('viewManga', {
      manga: props.manga,
    } as MangaView);
  };
</script>

<template>
  <img 
    :src="previewImage"
    @load="$emit('imageLoaded')"
    @error="(e) => $emit('imageError', e)"
    @click="popupViewer"
    v-bind="$attrs"
    v-if="previewImage"
  />
</template>

<style scoped>
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>