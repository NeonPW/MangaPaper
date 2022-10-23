<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { Manga } from '../util/constants';
  import { Chapter, MangaView } from '../util/constants';

  import ChapterPanel from './ChapterPanel.vue';
  import MangaViewer from './MangaViewer.vue';

  const props = defineProps<{
    manga: Manga;
  }>()

  const previewImage = computed(() => props.manga?.pages?.[props.manga.startPage ?? 0]);

  const emits = defineEmits(['imageLoaded', 'imageError', 'viewManga'])

  const popupViewer = () => {
    emits('viewManga', {
      manga: props.manga,
    } as MangaView);
  };
</script>

<template>
  <img :src="previewImage" @load="$emit('imageLoaded')" @error="(e) => $emit('imageError', e)" @click="popupViewer"
    v-bind="$attrs" v-if="previewImage" />
</template>

<style scoped>
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>