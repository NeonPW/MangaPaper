<script setup lang="ts">
  import { Ref, ref, onBeforeUnmount, watch } from 'vue';
  import { useMangas } from '../composables/useMangas'
  import { Manga, MangaView } from '../util/constants';
  import ScrollPanel from './ScrollPanel.vue';
  import MangaViewer from './MangaViewer.vue';

  const scrollingMangas = ref([] as Manga[])
  const paused = ref(false);
  const mangaViewData = ref({} as MangaView);
  const showView = ref(false);

  const { totalManga, getMangaRandom } = useMangas();


  const props = defineProps<{
    spawnRate: number;
    pause?: boolean;
  }>()

  const createPanel = async () => {
    if (paused.value || document.hidden || props.pause) return;
    const selectedManga = await getMangaRandom()
    if (!selectedManga) return;
    scrollingMangas.value.push(selectedManga);
  }

  const removePanel = (id: string) => {
    scrollingMangas.value = scrollingMangas.value.filter(manga =>{
      return manga.id !== id
    });
  }

  const imageError = (e: Event, mangaId: string) => {
    const el = e.target as Element;
    setTimeout(() => {
      if (el.getAttribute('src') === "")(
        removePanel(mangaId)
      )
    },1000);
  }

  const viewManga = (attrs: MangaView) => {
    paused.value = true;
    mangaViewData.value = attrs;
    showView.value = true;
  }

  const closeManga = () => {
    showView.value = false;
    paused.value = false;
  }

  const spawnTimer = setInterval(createPanel, props.spawnRate);

  onBeforeUnmount(() => {
    clearInterval(spawnTimer);
  })

</script>

<template>
  <div class="manga-scroller">
    <ScrollPanel 
      v-for="manga in scrollingMangas"
      :key="manga.id"
      :manga="manga"
      :paused="paused || pause || false"
      @scroll-complete="removePanel(manga.id)"
      @image-error="imageError($event, manga.id)"
      @view-manga="viewManga"
    />

    <MangaViewer
      :manga="mangaViewData.manga"
      @close-viewer="closeManga"
      v-bind="$attrs"
      v-if="showView"
    />
  </div>
</template>

<style scoped>
  .manga-scroller{
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    position:relative;
    overflow:hidden;
  }
</style>