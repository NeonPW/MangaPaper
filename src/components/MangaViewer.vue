<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { Manga } from '../util/constants';
  import { fetchPages } from '../util/pages';
  import MangaViewerInfo from './MangaViewerInfo.vue';
import MangaViewerSidebar from './MangaViewerSidebar.vue';

  const props = defineProps<{
    manga: Manga;
  }>()

  const emits = defineEmits(['closeViewer', 'imageLoaded', 'imageError'])

  const blurrerer = ref('');

  const pages = ref(props.manga?.pages ?? [])
  const loading = ref(true);
  const lastPage = ref(false);
  const firstPage = ref(false);


  const currentPage = ref(props.manga?.startPage ?? 0);
  const currentChapterIndex = ref(props.manga?.startChapter ?? 0);
  const currentChapter = ref(props.manga?.chapters?.[currentChapterIndex.value]);
  const chapterTitle = ref('');
  const pageCount = computed(() => pages.value.length);
  const pageImage = computed(() => pages.value?.[currentPage.value]);

  const mangaTitle = computed(() => props.manga?.attributes.title.en);

  const nextPage = () => {
    if (currentPage.value + 1 < pageCount.value){
      currentPage.value = Math.min(currentPage.value + 1, pageCount.value ? pageCount.value - 1 : 0);
      loading.value = true;
    }
  };

  const previousPage = () => {
    if (currentPage.value > 0){
      currentPage.value = Math.max(currentPage.value - 1, 0);
      loading.value = true;
    }
  };

  const closeViewer = () => {
    emits('closeViewer');
  };

  const nextChapter = () => {
    currentChapterIndex.value = currentChapterIndex.value + 1;
    loading.value = true;
  }

  const previousChapter = () => {
    currentChapterIndex.value = currentChapterIndex.value - 1;
    loading.value = true;
  }

  const changeChapter = (index: number) => {
    currentChapterIndex.value = index;
  }

  const checkPageable = () =>{
    lastPage.value = currentPage.value == pageCount.value -1;
    firstPage.value = currentPage.value == 0;
  }

  const imageLoaded = () => {
    loading.value = false;
    emits('imageLoaded');
  }

  watch(currentChapterIndex, async () => {
    const chapter = props.manga?.chapters?.[currentChapterIndex.value];
    if (!chapter) return;
    currentChapter.value = chapter;
    chapterTitle.value = chapter.attributes?.title ?? '';
    loading.value = true;
    pages.value = await fetchPages(chapter.id)
    currentPage.value = 0;
  })

  watch(currentPage, () => {
   checkPageable();
  })

  checkPageable();

  setTimeout(() => blurrerer.value = 'blur', 10);

</script>

<template>
<div :class="`manga-viewer__background overlay ${blurrerer}`" @click="closeViewer">
  <div class="MangaViewer__content" @click="(e) => e.stopPropagation()">

    <MangaViewerInfo 
      :chapter="currentChapter"
      :current-page="currentPage"
      :manga-title="mangaTitle"
      :page-count="pageCount"
    />

    <div style="display:flex;justify-content:center;">
      <div style="position:relative;pointer-events:all;">
        <div class="MangaViewer__image">
          <img :src="pageImage" @load="imageLoaded" @error="(e) => $emit('imageError', e)" v-bind="$attrs"
            v-if="pageImage" />
        </div>

        <div class="loader-line" v-if="loading"></div>

        <div class="mangaViewer__pager">
          <div :class="`mangaViewer__pager-left ${firstPage ? 'first' : ''}`" @click="previousPage"></div>
          <div :class="`mangaViewer__pager-right ${lastPage ? 'last' : ''}`" @click="nextPage"></div>
        </div>
      </div>
    </div>

    <MangaViewerSidebar :chapters="manga.chapters" :current-chapter="currentChapterIndex" @change-chapter="changeChapter" />

    <div class="MangaViewer__actions">
      <button @click="previousChapter">Prev</button>
      <div>{{currentPage + 1}} / {{pageCount}}</div>
      <button @click="nextChapter">NextCH</button>
    </div>
  </div>
  
</div>
</template>
  
<style scoped>

  .mangaViewer__info{
    text-align:center;
    margin-bottom:15px;
    color:white;
    text-shadow: 3px 3px 5px rgba(0,0,0,0.6);
    position:relative;
  }

  .manga-viewer__background{
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:rgba(0,0,0,0.7);
    z-index:9998;
  }

  .mangaViewer__pager{
    display:flex;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(255,0,0,0.1);
  }

  .mangaViewer__pager div{
    width:50%;
    height:100%;
    transition:background-color 0.3s;
    position:relative;
  }

  .mangaViewer__pager div:after{
    width:0;
    position:absolute;
    bottom:0;
    box-shadow:2px -5px 10px -3px rgba(225,225,255,0.75);
    height:15px;
    transition: width 0.6s, color 0.6s;
    background-color: rgb(181, 194, 255);
    overflow:hidden;
    line-height:15px;
    font-size:12px;
    color:transparent;
  }

  .mangaViewer__pager-left:after{
    right:0;
    content:'PREVIOUS PAGE \00a0 \00a0 \00a0 \00a0 \00a0 \00a0';
    text-align:right;
  }

  .mangaViewer__pager-left.first:after{
    content:'START OF CHAPTER \00a0 \00a0 \00a0 \00a0 \00a0 \00a0';
  }

  .mangaViewer__pager-right:after{
    left:0;
    content:'\00a0 \00a0 \00a0 \00a0 \00a0 \00a0 NEXT PAGE';
  }

  .mangaViewer__pager-right.last:after{
    content:'\00a0 \00a0 \00a0 \00a0 \00a0 \00a0 END OF CHAPTER';
  }

  .mangaViewer__pager-left:hover:after{
    color:black;
  }

  .mangaViewer__pager-right:hover:after{
    color:black;
  }

  .mangaViewer__pager div:hover:after{
    width:100%;
  }

  .MangaViewer__content {
    max-width: 80vw;
    max-height: 100vh;
    position:relative;
    pointer-events:none;
  }

  .MangaViewer__image {
    height: 100%;
    margin: 0 0 15px;
  }

  .MangaViewer__actions {
    display: flex;
    justify-content: space-between;
    display:none;
  }

  img {
    height: 100%;
    max-height:80vh;
    max-width:100%;
    object-fit: contain;
    min-width:500px;
    min-height:500px;
    border-radius:4px;
    box-shadow: 0px 0px 20px rgba(0,0,0,1);
  }

  .loader-line {
    width: 100%;
    height: 5px;
    position: absolute;
    bottom:15px;
    overflow: hidden;
  }

  .loader-line:before {
    content: "";
    position: absolute;
    left: -50%;
    height: 5px;
    width: 40%;
    background-color: rgb(255, 175, 146);
    -webkit-animation: lineAnim 1s linear infinite;
    -moz-animation: lineAnim 1s linear infinite;
    animation: lineAnim 1s linear infinite;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }

  @keyframes lineAnim {
    0% {
        left: -40%;
    }
    50% {
        left: 20%;
        width: 80%;
    }
    100% {
        left: 100%;
        width: 100%;
    }
  }
</style>