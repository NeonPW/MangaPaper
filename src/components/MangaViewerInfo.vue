<script setup lang="ts">
  import { computed } from 'vue';
  import { Chapter } from '../util/constants';

  const props = defineProps<{
    chapter?: Chapter;
    currentPage: number;
    mangaTitle: string;
    pageCount: number;
  }>();

  const chapterTitle = computed(() => props.chapter?.attributes.title)
  const chapterNumber = computed(() => props.chapter?.attributes.chapter);
  const showDash = computed(() => chapterNumber.value && chapterTitle.value)
</script>

<template>
  <div class="mangaViewer__info">
    <h1 class="manga-title">{{mangaTitle}}</h1>
    <div class="mangaViewer__info-chapter">
      {{chapterNumber ? 'Chapter ' + chapterNumber : ''}} {{showDash ? ' - ' : '' }} {{chapterTitle ? `${chapterTitle}` : ''}}
    </div>
    <div class="mangaViewer__info-pager">
      {{ currentPage + 1 }} / {{ pageCount }}
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
  .mangaViewer__info-pager{
    position:absolute;
    bottom:0;
    right:10px;
  }

  .mangaViewer__info-chapter{
    text-align:center;
    font-size: 1.25em;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    max-width:90%;
    margin:0 auto;
    height:1.4em;
  }

  .manga-title{
    color:white;
    font-weight:700;
    font-size:2.2em;
    margin:0;
    max-width:90%;
    margin:0 auto;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
</style>