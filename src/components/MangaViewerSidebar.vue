<script setup lang="ts">
  import { computed } from 'vue';
import { Chapter } from '../util/constants';

  const props = defineProps<{
    chapters?: Chapter[];
    currentChapter: number;
  }>()

  const emits = defineEmits(['changeChapter'])

  const currentChapterId = computed(() => props.chapters?.[props.currentChapter].id)
  

</script>

<template>
  <div class="mangaViewer__sidebar">
    <div class="mangaViewer__chapter-list">
      <div
        v-for="(chapter, index) in chapters"
        :key="chapter.id"
        class="mangaViewer__chapter-list-item"
        :class="[chapter.id == currentChapterId ? 'cur' : '']"
        @click="$emit('changeChapter', index)"
      >
        Chapter {{chapter.attributes.chapter}}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .mangaViewer__sidebar{
    background-color:white;
    margin-left:10px;
    border-radius:5px;
    max-height:80vh;
    max-width:200px;
    overflow-y:auto;
    position:fixed;
    right: 0;
    top:10vh;
    pointer-events:all;
  }

  .mangaViewer__chapter-list-item{
    padding:10px 15px;
    border-bottom: #ccc 1px solid;
    transition: background-color 0.3s;
    cursor:pointer;
    text-align:center;
    font-weight:300;
  }

  .mangaViewer__chapter-list-item:hover{
    background-color:rgba(150,150,200,0.4);
  }

  .cur{
    background-color:rgba(0,0,0,0.15);
  }
</style>